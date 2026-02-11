// IMPORTANT: Replace these placeholder values with your actual Firebase project settings
// Get these from: Firebase Console > Project Settings > General > Your apps > Web app
// If you haven't created a Web app yet, click "Add app" and select the Web platform
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "hidon1.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Anonymous auth to satisfy read rules like auth != null
firebase.auth().signInAnonymously().catch(console.error);

// Make getUser available globally for app.js
window.getUser = async function(uid) {
  const snap = await firebase.database().ref(`users/${uid}`).get();
  return snap.exists() ? snap.val() : null;
};
