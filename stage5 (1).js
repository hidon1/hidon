// שלב 5 - אנימציית דמויות תנ"כיות טובות
function showStage5Animation() {
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
  message.innerText = 'כל הכבוד. עברת בהצלחה את שלב 5!';
  message.style.position = 'absolute';
  message.style.top = '10%';
  message.style.fontSize = '2.5rem';
  message.style.fontWeight = 'bold';
  message.style.textShadow = '1px 1px 3px white';
  container.appendChild(message);

  const characters = [
    "אברהם", "יצחק", "יעקב", "יוסף", "משה", "אהרן", "יהושע בן נון", "כלב בן יפונה",
    "פנחס", "שמואל הנביא", "דוד המלך", "נתן הנביא", "שלמה המלך", "צדוק הכהן",
    "חזקיהו המלך", "ישעיהו הנביא", "ירמיהו הנביא", "יחזקאל הנביא", "דניאל",
    "חנניה", "מישאל", "עזריה", "עזרא הסופר", "נחמיה", "מרדכי היהודי", "אסתר המלכה",
    "רות המואביה", "בועז", "אליהו הנביא", "אלישע הנביא", "גד הנביא", "עמשא בן יתר",
    "ברכיהו בן נריה", "יואש המלך", "יאשיהו המלך", "עוזיהו", "אביגיל", "דבורה הנביאה",
    "חנה", "שלומית בת דביר"
  ];

  for (let i = 0; i < characters.length; i++) {
    const span = document.createElement('span');
    span.innerText = characters[i];
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

// אנימציית עלייה
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
  0% { transform: translateY(100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}
`;
document.head.appendChild(style);
