
function getCoins() {
  return parseInt(localStorage.getItem("quizCoins")) || 0;
}

function setCoins(val) {
  localStorage.setItem("quizCoins", val);
  updateCoinsDisplay();
}

function startCoinTimer() {
  coinStartTime = Date.now();
}

function handleCorrectAnswer() {
  if (!coinStartTime) return;
  const timeTaken = Math.floor((Date.now() - coinStartTime) / 1000);
  const coinReward = Math.max(0, 20 - timeTaken);
  const newTotal = getCoins() + coinReward;
  setCoins(newTotal);
}

function updateCoinsDisplay() {
  const el = document.getElementById("coinsCount");
  if (el) el.textContent = getCoins();
}

window.addEventListener("load", updateCoinsDisplay);
