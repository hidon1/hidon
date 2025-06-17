
let coinStartTime = null;
let coins = parseInt(localStorage.getItem("quizCoins")) || 0;

function startCoinTimer() {
    coinStartTime = Date.now();
}

function handleCorrectAnswer() {
    if (!coinStartTime) return;
    const timeTaken = Math.floor((Date.now() - coinStartTime) / 1000);
    const coinReward = Math.max(0, 20 - timeTaken);
    coins += coinReward;
    localStorage.setItem("quizCoins", coins);
    updateCoinsDisplay();
}

function updateCoinsDisplay() {
    const coinsElement = document.getElementById("coinsCount");
    if (coinsElement) {
        coinsElement.textContent = coins;
    }
}

// בקרת אתחול בעת טעינה (לרענון)
document.addEventListener("DOMContentLoaded", () => {
    updateCoinsDisplay();
});
