// אתחול המטבעות מתוך localStorage או מאפס
let coins = parseInt(localStorage.getItem("quizCoins")) || 0;

// עדכון התצוגה במסך
function updateCoinDisplay() {
  const coinEl = document.getElementById("coinsCount");
  if (coinEl) {
    coinEl.textContent = coins;
  }
}

// קריאה בעת טעינת העמוד לעדכון מיידי
window.addEventListener('load', updateCoinDisplay);

// הענקת 100 מטבעות על מעבר שלב
function awardStageCoins() {
  coins += 100;
  localStorage.setItem("quizCoins", coins);
  updateCoinDisplay();
  console.log("נוספו 100 מטבעות על מעבר שלב");
}
