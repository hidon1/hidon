// שלב 4 - אנימציית אירועים תנ"כיים
function showStage4Animation() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.backgroundColor = 'rgba(64, 224, 208, 0.9)'; // טורקיז רך
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.zIndex = 9999;
  container.style.fontSize = '2rem';
  container.style.color = '#000';
  container.style.overflow = 'hidden';

  const message = document.createElement('div');
  message.innerText = 'כל הכבוד. עברת בהצלחה את שלב 4!';
  message.style.position = 'absolute';
  message.style.top = '10%';
  message.style.fontSize = '2.5rem';
  message.style.fontWeight = 'bold';
  message.style.textShadow = '1px 1px 3px white';
  container.appendChild(message);

  const events = [
    "עקידת יצחק", "חטא עץ הדעת", "המבול ובניית התיבה", "מגדל בבל", "ברית בין הבתרים",
    "סדום ועמורה", "מכירת יוסף", "חלום פרעה ופתרונו", "יציאת מצרים", "קריעת ים סוף",
    "מתן תורה בהר סיני", "חטא העגל", "שליחת המרגלים", "מרד קורח ועדתו", "הכאת הסלע",
    "מות אהרון בהר ההר", "בלעם והמלאך", "מלחמת מדיין", "כיבוש יריחו", "חטא עכן",
    "השמש בגבעון דום", "מלחמת סיסרא וברק", "שמשון ודלילה", "מלחמת פילגש בגבעה",
    "שאול מושח למלך", "מלחמת שאול בעמלק", "דוד מול גוליית", "מרד אבשלום", "חורבן שילה",
    "גלות בית שומרון"
  ];

  for (let i = 0; i < events.length; i++) {
    const span = document.createElement('span');
    span.innerText = events[i];
    span.style.margin = '10px';
    span.style.animation = 'float 7s linear infinite';
    span.style.opacity = 0.8;
    span.style.fontWeight = 'bold';
    span.style.transform = `translateY(${Math.random() * 100 - 50}vh)`;
    container.appendChild(span);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 7000);
}

// הוספת אנימציה ל-CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
  0% { transform: translateY(100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}
`;
document.head.appendChild(style);
