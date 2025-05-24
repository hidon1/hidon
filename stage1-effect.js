function runStage1SuccessEffect() {
  const numbers = [
    1, 3, 5, 7, 8, 10, 12, 15, 18, 20,
    23, 26, 30, 33, 36, 40, 44, 47, 50, 55,
    58, 60, 63, 66, 70, 75, 80, 85, 90, 95,
    100, 150, 200, 300, 400, 500, 600, 700, 800,
    900, 1000, 1100, 1200, 1300, 1500, 1700, 2000
  ];

  const style = document.createElement('style');
  style.textContent = `
    .numbers-container {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 9999;
    }
    .floating-number {
      position: absolute;
      bottom: 0;
      color: #45c3d6;
      font-weight: bold;
      animation: floatUp 3s ease-out forwards;
      opacity: 0;
      text-shadow: 0 0 8px #a0f0ff;
    }
    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
    }
    .stage1-congrats {
      position: fixed;
      top: 35%;
      width: 100%;
      text-align: center;
      font-size: 3.5em;
      color: #45c3d6;
      font-weight: bold;
      text-shadow: 0 0 12px #80faff;
      z-index: 10000;
      animation: glowText 1s ease-in-out infinite alternate;
    }
    @keyframes glowText {
      0% { text-shadow: 0 0 8px #a0f0ff; }
      100% { text-shadow: 0 0 20px #d0ffff; }
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.className = 'numbers-container';
  document.body.appendChild(container);

  // נבחר 40 מספרים רנדומליים מתוך הרשימה
  for (let i = 0; i < 40; i++) {
    const num = numbers[Math.floor(Math.random() * numbers.length)];
    const el = document.createElement('div');
    el.className = 'floating-number';
    el.innerText = num;
    el.style.left = Math.random() * 90 + '%';
    el.style.animationDelay = (Math.random() * 1.5) + 's';
    el.style.fontSize = (Math.random() * 1.5 + 1) + 'em';
    container.appendChild(el);
  }

  const congrats = document.createElement('div');
  congrats.className = 'stage1-congrats';
  congrats.innerText = 'כל הכבוד. עברת בהצלחה!';
  document.body.appendChild(congrats);

  // הסתרה אחרי 6 שניות
  setTimeout(() => {
    container.remove();
    congrats.remove();
  }, 6000);
}
