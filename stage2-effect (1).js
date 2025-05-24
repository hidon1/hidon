// stage2-effect.js - אפקט שלב ב'

function showStage2Animation() {
  const items = [
    "המנורה", "הכיור", "מזבח הזהב", "מזבח העולה", "ארון הברית",
    "הכרובים", "שולחן הפנים", "קלעי החצר", "קרשי המשכן", "פרוכת",
    "הטבעת", "הבדים", "כפות הקטורת", "ציץ הזהב", "שמן המשחה",
    "בגדי כהונה", "אורים ותומים", "החושן", "האפוד", "מעיל הכהן"
  ];

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.zIndex = 999;
  container.style.pointerEvents = "none";

  document.body.appendChild(container);

  for (let i = 0; i < 40; i++) {
    const el = document.createElement("div");
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.position = "absolute";
    el.style.left = Math.random() * 90 + "vw";
    el.style.top = "100vh";
    el.style.fontSize = Math.random() * 16 + 20 + "px";
    el.style.color = "#00ced1";
    el.style.fontWeight = "bold";
    el.style.opacity = 0.85;
    el.style.animation = `rise${i} 4.5s ease-out forwards`;
    container.appendChild(el);

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes rise${i} {
        0% { transform: translateY(0); opacity: 0.9; }
        100% { transform: translateY(-110vh); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const centerText = document.createElement("div");
  centerText.textContent = "כל הכבוד! עברת את שלב ב' בהצלחה!";
  centerText.style.position = "fixed";
  centerText.style.top = "42%";
  centerText.style.left = "50%";
  centerText.style.transform = "translate(-50%, -50%)";
  centerText.style.fontSize = "3rem";
  centerText.style.fontFamily = "'Frank Ruhl Libre', serif";
  centerText.style.color = "#ffffff";
  centerText.style.textShadow = "2px 2px 6px #000";
  centerText.style.zIndex = 1000;
  centerText.style.pointerEvents = "none";

  document.body.appendChild(centerText);

  setTimeout(() => {
    container.remove();
    centerText.remove();
  }, 5000);
}

// הפעלת הפונקציה כשהקובץ נטען (אם נדרש)
if (typeof runStage2Animation === 'function') runStage2Animation = showStage2Animation;


function runStage2SuccessEffect() {
  showStage2Animation();
}
