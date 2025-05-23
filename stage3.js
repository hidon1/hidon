
function showStage3Animation() {
  const names = [
    "דוד", "שלמה", "רחבעם", "אסא", "יהושפט", "יהורם", "אחזיהו", "יואש",
    "אמציהו", "עוזיהו", "יותם", "אחז", "חזקיהו", "מנשה", "אמון", "יאשיהו",
    "יהואחז", "יהויקים", "יהויכין", "צדקיהו", "בעשא", "נדב", "זמרי", "עמרי",
    "אחאב", "אחזיה", "יהורם בן אחאב", "יהוא", "יהואחז בן יהוא", "יואש בן יהואחז",
    "ירבעם בן יואש", "זכריה", "שלום", "מנחם", "פקחיה", "פקח", "הושע"
  ];

  const container = document.createElement("div");
  container.id = "stage3AnimationContainer";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.zIndex = "9999";
  container.style.pointerEvents = "none";
  document.body.appendChild(container);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  for (let i = 0; i < 50; i++) {
    const name = document.createElement("div");
    name.textContent = names[Math.floor(Math.random() * names.length)];
    name.style.position = "absolute";
    name.style.color = "#45c3d6";
    name.style.fontWeight = "bold";
    name.style.fontSize = `${Math.random() * 1.5 + 1}em`;
    name.style.top = Math.random() * (screenHeight - 40) + "px";
    name.style.left = Math.random() * (screenWidth - 100) + "px";
    name.style.animation = "floatName 6s ease-in-out infinite";
    container.appendChild(name);
  }

  const congrats = document.createElement("div");
  congrats.className = "stage3-congrats";
  congrats.textContent = "עברת את השלב בהצלחה! כל הכבוד.";
  document.body.appendChild(congrats);

  // Remove after 7 seconds
  setTimeout(() => {
    container.remove();
    congrats.remove();
  }, 7000);

  // Add CSS styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatName {
      0% { transform: translateY(0); opacity: 1; }
      50% { transform: translateY(-30px); opacity: 0.8; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .stage3-congrats {
      position: fixed;
      top: 40%;
      width: 100%;
      text-align: center;
      font-size: 3.2em;
      color: #45c3d6;
      font-weight: bold;
      text-shadow: 0 0 14px #80faff;
      z-index: 10000;
      animation: glowText 1s ease-in-out infinite alternate;
    }
    @keyframes glowText {
      0% { text-shadow: 0 0 8px #a0f0ff; }
      100% { text-shadow: 0 0 22px #d0ffff; }
    }
  `;
  document.head.appendChild(style);
}
