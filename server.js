import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./firebaseAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
// Serve root directory static files (for main game)
app.use(express.static(__dirname));
// Serve public directory static files (for h2h mode)
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
// Note: Using '*' for CORS origin during development/demo.
// For production, update this to specific allowed origins via ALLOWED_ORIGINS env var
// or modify the code to use allowedOrigins array like: { origin: allowedOrigins }
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 10000;

// Track which rooms are currently processing answers to prevent race conditions
const processingAnswers = new Set();

// Error message for when Firebase is not configured
const FIREBASE_NOT_CONFIGURED_ERROR = "Firebase not configured. Please set up Firebase environment variables.";

// Helper function to generate a random 4-digit code
function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function makeCode() {
  if (!db) {
    // If Firebase is not configured, return a random code
    // This shouldn't normally happen as socket handlers check for db first
    return generateRandomCode();
  }
  
  // Generate unique 4-digit code and check for collisions
  let code;
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    code = generateRandomCode();
    const roomRef = db.ref(`rooms/${code}`);
    const snap = await roomRef.get();
    if (!snap.exists()) {
      return code; // Found unique code
    }
    attempts++;
  }
  
  // Fallback: add timestamp suffix if collisions persist
  return generateRandomCode() + Date.now().toString().slice(-2);
}

io.on("connection", (socket) => {
  socket.on("create_room", async ({ hostUid, stake = 0 }) => {
    if (!db) {
      return io.to(socket.id).emit("error", FIREBASE_NOT_CONFIGURED_ERROR);
    }
    const code = await makeCode();
    const roomRef = db.ref(`rooms/${code}`);
    await roomRef.set({
      players: { hostUid, guestUid: null },
      state: "waiting",
      stake,
      scoreBoard: { [hostUid]: 0 },
      createdAt: Date.now()
    });
    socket.join(code);
    io.to(socket.id).emit("room_created", { code });
  });

  socket.on("join_room", async ({ code, guestUid }) => {
    if (!db) {
      return io.to(socket.id).emit("error", FIREBASE_NOT_CONFIGURED_ERROR);
    }
    const roomRef = db.ref(`rooms/${code}`);
    const snap = await roomRef.get();
    if (!snap.exists()) return io.to(socket.id).emit("error", "Room not found");

    const room = snap.val();
    if (room.state !== "waiting" || room.players.guestUid) {
      return io.to(socket.id).emit("error", "Room not available");
    }
    await roomRef.child("players/guestUid").set(guestUid);
    await roomRef.child(`scoreBoard/${guestUid}`).set(0);
    await roomRef.child("state").set("ready");
    socket.join(code);
    io.to(code).emit("room_ready", { code, players: { hostUid: room.players.hostUid, guestUid } });
  });

  socket.on("start_game", async ({ code }) => {
    if (!db) {
      return io.to(socket.id).emit("error", FIREBASE_NOT_CONFIGURED_ERROR);
    }
    const roomRef = db.ref(`rooms/${code}`);
    const snap = await roomRef.get();
    if (!snap.exists()) return;
    const room = snap.val();
    if (room.state !== "ready") return;

    await roomRef.child("state").set("running");
    await roomRef.child("currentQuestion").set(1);
    io.to(code).emit("game_started", { totalQuestions: 20, stake: room.stake || 0 });
  });

  socket.on("answer", async ({ code, uid, correct }) => {
    if (!db) {
      return io.to(socket.id).emit("error", FIREBASE_NOT_CONFIGURED_ERROR);
    }
    const roomRef = db.ref(`rooms/${code}`);
    const snap = await roomRef.get();
    if (!snap.exists()) return;
    const room = snap.val();
    if (room.state !== "running") return;

    // Update score
    const scoreRef = roomRef.child(`scoreBoard/${uid}`);
    await scoreRef.transaction((cur) => (cur || 0) + (correct ? 1 : 0));

    // Use a lock to prevent race conditions when incrementing question
    const lockKey = `${code}-q${room.currentQuestion}`;
    if (processingAnswers.has(lockKey)) {
      // Already processing this question, just update score
      io.to(code).emit("question_progress", { current: room.currentQuestion });
      return;
    }
    
    processingAnswers.add(lockKey);
    
    try {
      // Increment question counter atomically
      const qRef = roomRef.child("currentQuestion");
      const next = await qRef.transaction((cur) => (cur || 1) + 1);
      const current = next?.snapshot?.val();
      io.to(code).emit("question_progress", { current });

      if (current > 20) {
        const finalSnap = await roomRef.get();
        const final = finalSnap.val();
        const entries = Object.entries(final.scoreBoard || {});
        const winnerUid = entries.sort((a, b) => b[1] - a[1])[0]?.[0];

        await roomRef.child("state").set("finished");
        await settleCoins({ winnerUid, code, stake: final.stake, players: final.players });
        io.to(code).emit("game_finished", { winnerUid });
      }
    } finally {
      // Release lock after a short delay
      setTimeout(() => processingAnswers.delete(lockKey), 1000);
    }
  });

  socket.on("disconnect", () => {});
});

async function settleCoins({ winnerUid, code, stake, players }) {
  if (!db) {
    console.warn("Firebase not configured, skipping coin settlement");
    return;
  }
  
  const { hostUid, guestUid } = players;
  const winnerRef = db.ref(`users/${winnerUid}`);
  const loserUid = winnerUid === hostUid ? guestUid : hostUid;
  const loserRef = db.ref(`users/${loserUid}`);

  await winnerRef.child("wins").transaction((w) => (w || 0) + 1);

  if (stake && loserUid) {
    await loserRef.child("coins").transaction((c) => Math.max((c || 0) - stake, 0));
    await winnerRef.child("coins").transaction((c) => (c || 0) + stake);
  }

  const matchId = `${code}-${Date.now()}`;
  await db.ref(`matches/${matchId}`).set({
    roomCode: code,
    players,
    winnerUid,
    coinsTransferred: stake || 0,
    endedAt: Date.now()
  });
}

// TODO: Add rate limiting for production deployment to prevent abuse
// Consider using express-rate-limit middleware for these routes
app.get("/health", (_, res) => res.json({ ok: true }));
app.get("/", (_, res) => res.sendFile(path.join(__dirname, "index.html")));

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

