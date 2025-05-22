
function runStage2SuccessEffect() {
  const container = document.createElement('div');
  container.id = "stage2AnimationContainer";
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.backgroundColor = 'rgba(64, 224, 208, 0.85)';
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.zIndex = 9999;
  container.style.fontSize = '1.8rem';
  container.style.color = '#000';
  container.style.overflow = 'hidden';

  const message = document.createElement('div');
  message.innerText = 'כל הכבוד. עברת בהצלחה את שלב 2!';
  message.style.position = 'absolute';
  message.style.top = '10%';
  message.style.fontSize = '2.5rem';
  message.style.fontWeight = 'bold';
  message.style.textShadow = '1px 1px 3px white';
  container.appendChild(message);

  const items = ["מזבח העולה", "מזבח הקטורת", "מנורה", "שלחן לחם הפנים", "ארון הברית", "כפורת", "שני הכרובים", "כיור", "כנו של כיור", "חצוצרות הכהנים", "בגדי כהונה", "חושן", "אפוד", "ציץ", "כתונת", "אבנט", "מכנסיים", "מגבעת", "פעמונים", "רימונים", "שמן המשחה", "קטורת הסמים", "לחם הפנים", "פרוכת", "דביר", "היכל", "עזרת כהנים", "עזרת ישראל", "עזרת נשים", "לשכת הגזית", "שער ניקנור", "שולחנות לשחיטה", "בית המטבחיים", "מקווה", "ניסוך היין", "קרבן תמיד", "קרבן מוסף", "קרבן פסח", "קרבן חטאת", "קרבן שלמים"];

  for (let i = 0; i < items.length; i++) {
    const span = document.createElement('span');
    span.innerText = items[i];
    span.style.margin = '8px';
    span.style.animation = 'float 7s linear infinite';
    span.style.opacity = 0.85;
    span.style.fontWeight = 'bold';
    span.style.transform = `translateY(${Math.random() * 100 - 50}vh)`;
    container.appendChild(span);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 7000);
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
  0% { transform: translateY(100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}
`;
document.head.appendChild(style);
