let coins = parseInt(localStorage.getItem("quizCoins")) || 0;

function updateCoins(timeTaken) {
  const earned = Math.max(0, 20 - timeTaken);
  coins += earned;
  localStorage.setItem("quizCoins", coins);
}