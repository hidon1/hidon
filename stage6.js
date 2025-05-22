// שלב 6 - אנימציית ערים מקראיות בארץ ישראל
function showStage6Animation() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.backgroundColor = 'rgba(64, 224, 208, 0.9)';
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.zIndex = 9999;
  container.style.fontSize = '2rem';
  container.style.color = '#000';
  container.style.overflow = 'hidden';

  const message = document.createElement('div');
  message.innerText = 'כל הכבוד. עברת בהצלחה את שלב 6!';
  message.style.position = 'absolute';
  message.style.top = '10%';
  message.style.fontSize = '2.5rem';
  message.style.fontWeight = 'bold';
  message.style.textShadow = '1px 1px 3px white';
  container.appendChild(message);

  const cities = [
    "ירושלים", "חברון", "בית לחם", "שכם", "בית אל", "גבעון", "יריחו", "עין גדי",
    "לכיש", "עזה", "אשקלון", "אשדוד", "גת", "עקרון", "גדר", "רמות גלעד", "צפת",
    "מגידו", "תענך", "שונם", "צרתן", "אפק", "דור", "עין דור", "בית שאן", "רמות",
    "עין חצור", "ארד", "דביר", "קרית יערים", "קרית ארבע", "נצרת", "שילה", "בית אלפא",
    "חצור", "עין כרם", "עין חרוד", "כפר נחום", "הר תבור", "עמק יזרעאל", "רמות נפתלי",
    "מרשה", "יבוס", "בית צדדה", "אנחרת", "קרית ספר", "עין גנים", "בית זר", "כפר סבא"
  ];

  for (let i = 0; i < cities.length; i++) {
    const span = document.createElement('span');
    span.innerText = cities[i];
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

// הוספת אנימציית float ל-CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
  0% { transform: translateY(100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}
`;
document.head.appendChild(style);
