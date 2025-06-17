// אתחול המטבעות מקריאה מתוך localStorage או התחלה ב-0

let questionStartTime = Date.now();

// התחלת מדידת זמן חדש לשאלה
function startCoinTimer() {
  questionStartTime = Date.now();
}

// פונקציה שמופעלת כשתשובה נכונה מתקבלת
function handleCorrectAnswer() {
  const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
  const reward = Math.max(0, 20 - timeTaken); // מקסימום 20 מטבעות, פחות הזמן שלקח לענות
  coins += reward;
  localStorage.setItem("quizCoins", coins);
  updateCoinDisplay();
  console.log(`קיבלת ${reward} מטבעות (תוך ${timeTaken} שניות).`);
}

// עדכון המספר שמוצג בדשבורד
function updateCoinDisplay() {
  const coinEl = document.getElementById("coinsCount");
  if (coinEl) coinEl.textContent = coins;
}

// כשהעמוד נטען – נעדכן את תצוגת המטבעות
window.addEventListener('load', updateCoinDisplay);
