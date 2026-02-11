import admin from "firebase-admin";

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY
} = process.env;

let db = null;
let adminAuth = null;

// Check if Firebase credentials are provided
if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.warn("⚠️  Firebase environment variables not configured:");
  if (!FIREBASE_PROJECT_ID) console.warn("  - FIREBASE_PROJECT_ID");
  if (!FIREBASE_CLIENT_EMAIL) console.warn("  - FIREBASE_CLIENT_EMAIL");
  if (!FIREBASE_PRIVATE_KEY) console.warn("  - FIREBASE_PRIVATE_KEY");
  console.warn("⚠️  Server will start but Firebase features will be disabled.");
  console.warn("⚠️  Set these environment variables to enable Head-to-Head gameplay.");
} else {
  // Initialize Firebase only if credentials are present
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
        }),
        databaseURL: `https://${FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`
      });
    }
    db = admin.database();
    adminAuth = admin.auth();
    console.log("✅ Firebase Admin initialized successfully");
  } catch (error) {
    console.error("❌ Firebase Admin initialization failed:", error.message);
    console.warn("⚠️  Server will start but Firebase features will be disabled.");
  }
}

export { db, adminAuth };
