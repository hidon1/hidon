// Use the global socket from socket-client.js, or fall back to creating one if not available
const socket = window.socket || io();

// Demo UID; replace with real Firebase Auth user UID if you have full auth
const uid = localStorage.getItem("uid") || `uid_${Math.floor(Math.random()*1e6)}`;
localStorage.setItem("uid", uid);

let roomCode = null;

const statusEl = document.getElementById("status");
const createBtn = document.getElementById("createRoomBtn");
const joinInput = document.getElementById("joinCode");
const joinBtn = document.getElementById("joinBtn");
const startBtn = document.getElementById("startBtn");
const qnumEl = document.getElementById("qnum");
const correctBtn = document.getElementById("correctBtn");
const wrongBtn = document.getElementById("wrongBtn");

createBtn.onclick = () => {
  socket.emit("create_room", { hostUid: uid, stake: 100 });
};

joinBtn.onclick = () => {
  const code = joinInput.value.trim();
  if (!code) return;
  socket.emit("join_room", { code, guestUid: uid });
};

startBtn.onclick = () => {
  if (roomCode) socket.emit("start_game", { code: roomCode });
};

correctBtn.onclick = () => socket.emit("answer", { code: roomCode, uid, correct: true });
wrongBtn.onclick = () => socket.emit("answer", { code: roomCode, uid, correct: false });

socket.on("room_created", ({ code }) => {
  roomCode = code;
  statusEl.textContent = `נוצר חדר: ${code}. שלח את הקוד לשחקן השני.`;
});

socket.on("room_ready", async ({ code, players }) => {
  roomCode = code;
  startBtn.disabled = false;
  statusEl.textContent = `שני השחקנים בחדר ${code}. אפשר להתחיל.`;
  // Populate player cards
  const p1 = await getUser(players.hostUid);
  const p2 = await getUser(players.guestUid);
  renderCard("p1", p1);
  renderCard("p2", p2);
});

socket.on("game_started", ({ totalQuestions, stake }) => {
  statusEl.textContent = `המשחק התחיל! הימור: ${stake}`;
  correctBtn.disabled = false;
  wrongBtn.disabled = false;
  qnumEl.textContent = "1";
});

socket.on("question_progress", ({ current }) => {
  qnumEl.textContent = String(current);
});

socket.on("game_finished", ({ winnerUid }) => {
  statusEl.textContent = winnerUid === uid ? "ניצחת! המטבעות הועברו אליך." : "הפסדת! המטבעות הועברו למנצח.";
  correctBtn.disabled = true;
  wrongBtn.disabled = true;
});

function renderCard(elId, user) {
  const el = document.getElementById(elId);
  if (!user) { el.textContent = "שחקן לא נמצא"; return; }
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;">
      <img src="${user.avatar || ''}" alt="avatar" style="width:48px;height:48px;border-radius:50%;object-fit:cover;" />
      <div>
        <div><strong>${user.displayName || 'ללא שם'}</strong></div>
        <div>מטבעות: ${user.coins ?? 0}</div>
        <div>ניצחונות: ${user.wins ?? 0}</div>
      </div>
    </div>
  `;
}
