# חידון התנ"ך - Bible Quiz Game

משחק חידון תנ"ך בזמן אמת עם מצב ראש-בראש (Head-to-Head) המשתמש ב-Socket.io.

## תכונות עיקריות

- **מצב ראש-בראש (Head-to-Head)**: התחרו מול חברים או שחקנים אקראיים בזמן אמת
- **תקשורת בזמן אמת עם Socket.io**: סנכרון מיידי בין השחקנים
- **שאלות אקראיות**: שאלות נלקחות מ-10 בנקי שאלות שונים (1.json - 10.json)
- **ניקוד מבוסס זמן**: נקודות מוענקות על פי הזמן שנותר במענה נכון
- **בונוס מהירות**: +4 נקודות לשחקן שעונה נכון ראשון
- **המנצח לוקח הכל**: המנצח מקבל את כל הנקודות משני השחקנים
- **משחקים של 5 דקות**: קרבות חידון מהירים עם 20 שאלות למשחק

## טכנולוגיות

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, Socket.io
- **Hosting**: GitHub Pages (סטטי) + שרת Node.js משלך
- **Database**: Firebase Realtime Database (לנתוני משתמשים)

## מבנה הפרויקט

```
hidon/
├── server.js              # שרת Socket.io לתפקוד ריבוי משתתפים
├── package.json           # תלויות Node.js וסקריפטים
├── .env.example           # דוגמת קובץ משתני סביבה
├── public/                # קבצים סטטיים
│   ├── index.html        # ממשק המשחק ראש-בראש
│   ├── images/           # תמונות (אווטרים, אייקונים)
│   └── backgrounds/      # תמונות רקע
├── 1.json - 10.json      # בנקי שאלות
└── ...
```

## פיתוח מקומי

### דרישות מוקדמות

- Node.js (גרסה 18.x או גבוהה יותר)
- npm (מגיע עם Node.js)

### התקנה

1. שכפול המאגר:
```bash
git clone https://github.com/hidon1/hidon.git
cd hidon
```

2. התקנת תלויות:
```bash
npm install
```

3. (אופציונלי) יצירת קובץ `.env`:
```bash
cp .env.example .env
```

4. הפעלת השרת:
```bash
npm start
```

5. פתיחת הדפדפן וניווט ל:
```
http://localhost:3000
```

### מצב פיתוח

להפעלה עם טעינה מחדש אוטומטית:
```bash
npm run dev
```

## פריסה ל-GitHub Pages

GitHub Pages מאפשר להגיש את הדפים הסטטיים ישירות מהמאגר, ללא שירות צד ג'.

### שלב 1: הפעלת GitHub Pages

1. עבור ל-**Settings → Pages** במאגר.
2. בחר Branch: `main` ותיקייה: `/` (root).
3. שמור והמתן שיופיע קישור הפריסה (לדוגמה: `https://hidon1.github.io/hidon`).

### שלב 2: חיבור דומיין מותאם אישי (hidon1.com)

1. ב-GitHub Pages, הוסף את הדומיין המותאם שלך.
2. אצל ספק הדומיין שלך (Dynadot וכו') הגדר CNAME או רשומות A לפי הוראות GitHub.
3. המתן לאימות ול-HTTPS, ואז הדומיין שלך יכוון ישירות ל-GitHub Pages.

## הוספת Authorized Domains ל-Firebase

כדי שהאימות של Firebase יעבוד עם הדומיין המותאם שלך:

### שלב 1: פתיחת Firebase Console

1. היכנס ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך

### שלב 2: הוספת Authorized Domains

1. לחץ על **"Authentication"** בתפריט הצד
2. לחץ על הלשונית **"Settings"**
3. גלול ל-**"Authorized domains"**
4. לחץ **"Add domain"**
5. הוסף את הדומיינים הבאים (אחד בכל פעם):
   - `hidon1.com`
   - `www.hidon1.com`
   - `hidon1.github.io`
6. לחץ **"Add"** לכל דומיין

### שלב 3: אימות

1. פתח את `https://hidon1.com` בדפדפן
2. נסה להתחבר עם Firebase Authentication
3. ודא שאין שגיאות CORS או unauthorized domain

## תצורה

### טופס יצירת קשר - Google Apps Script

האתר משתמש ב-Google Apps Script Web App לטיפול בשליחת טפסי יצירת קשר.

**קבצי תצורה:**
- `/src/config/gas-config.js` - כתובת ה-Web App ומזהה אימות (placeholder)
- `/src/assets/js/gas-contact.js` - לוגיקת שליחת הטופס

**הגדרה ופריסה:**
ראה מדריך מפורט ב-`DEPLOY_GAS.md` על:
- הגדרת Script Properties ב-Google Apps Script
- פריסת Web App
- הגדרת אימות וטוקן אבטחה
- בדיקת שליחת מיילים

⚠️ **אזהרת אבטחה**: אל תקומיט טוקנים אמיתיים למאגר פומבי. השתמש ב-placeholder או משתני סביבה.

### משתני סביבה

האפליקציה משתמשת במשתני הסביבה הבאים:

- `PORT`: מספר הפורט שהשרת שלך מאזין לו
- `NODE_ENV`: מומלץ להגדיר ל-`production` בסביבת שרת
- `ALLOWED_ORIGINS`: רשימת מקורות מותרים ל-CORS של Socket.io (מופרדים בפסיקים)
  - דוגמה: `https://hidon1.com,https://www.hidon1.com,http://localhost:3000`
  - אם לא מוגדר, ישתמש בברירות מחדל בטוחות

### המלצות אבטחה

לפריסת production, מומלץ:
1. להגדיר את משתנה הסביבה `ALLOWED_ORIGINS` כדי להגביל את גישת CORS
2. להשתמש בדומיינים האמיתיים שלך במקום לאפשר את כל המקורות

## איך לשחק במצב ראש-בראש

### אפשרות 1: שחק עם חבר

1. לחץ **"צור חדר חדש"**
2. שתף את קוד החדר או הקישור עם חברך
3. המתן שחברך יצטרף
4. שני השחקנים לוחצים **"מוכן"**
5. המשחק מתחיל!

### אפשרות 2: התאמה אקראית

1. לחץ **"מצא יריב אקראי"**
2. המתן ששחקן אחר יצטרף
3. המשחק מתחיל אוטומטית!

## חוקי המשחק

- **משך זמן**: 5 דקות או 20 שאלות (מה שיגיע קודם)
- **טיימר**: 20 שניות לכל שאלה
- **ניקוד**:
  - תשובה נכונה: נקודות שוות לשניות שנותרו בטיימר
  - בונוס מהירות: +4 נקודות לתשובה נכונה מהירה יותר
  - תשובה שגויה: 0 נקודות
- **מנצח**: השחקן עם הכי הרבה נקודות בסוף
- **פרס**: המנצח לוקח את כל הנקודות משני השחקנים

## פתרון בעיות

### השרת לא מתחיל מקומית

```bash
# נקה את cache של npm והתקן מחדש
rm -rf node_modules package-lock.json
npm install
npm start
```

### הפורט כבר בשימוש

אם פורט 3000 כבר בשימוש, תוכל לציין פורט אחר:
```bash
PORT=3001 npm start
```

### השרת לא עולה בפריסה

1. בדוק את לוגי ה-build אצל ספק האחסון שלך
2. ודא שכל הקבצים (server.js, package.json) מועלים ל-GitHub
3. בדוק שגרסת Node.js תואמת (18.x או גבוהה יותר)

### שחקנים לא יכולים להתחבר למשחק

1. אמת שכתובת ה-URL של חיבור Socket.io ב-`public/index.html` תואמת ל-URL של השרת שלך
2. בדוק שהשרת פועל
3. ודא ששני השחקנים משתמשים באותו קוד חדר
4. בדוק את ה-console של הדפדפן לכל הודעת שגיאה

## תמיכה ותיעוד

- **תיעוד תכונת H2H**: ראה `H2H_FEATURE.md`
- **מדריך משתמש (עברית)**: ראה `H2H_USER_GUIDE.md`
- **רשימת בדיקות**: ראה `H2H_TEST_CHECKLIST.md`
- **דיאגרמות זרימה**: ראה `H2H_FLOW_DIAGRAM.md`

## תרומה

1. עשה Fork למאגר
2. צור branch לתכונה: `git checkout -b feature-name`
3. בצע commit לשינויים שלך: `git commit -m 'Add feature'`
4. דחוף ל-branch: `git push origin feature-name`
5. פתח Pull Request

## רישיון

ISC

## קרדיטים

נוצר עבור קהילת חידון התנ"ך העברי. תהנו ללמוד ולהתחרות!

---

**בהצלחה בחידון! 🎉**

## הערות חשובות

### תמונות נדרשות

הוסף את התמונות הבאות לתיקיות המתאימות:
- `public/images/default-avatar.png` - תמונת אווטר ברירת מחדל
- `public/images/coin-icon.png` - אייקון מטבע (✅ קיים)
- `public/images/trophy-icon.svg` - אייקון גביע (✅ קיים)
- `public/backgrounds/main.jpg` - תמונת רקע ראשית

### הגדרת Socket.IO עבור אירוח סטטי (GitHub Pages)

אם אתה מארח את הדפים הסטטיים (HTML/CSS/JS) על GitHub Pages, תצטרך להפנות את הלקוח להתחבר לשרת Socket.IO חיצוני (שרת Node.js משלך). כדי לעשות זאת:

1. פרוס את `server.js` על שרת Node.js משלך
2. קבל את ה-URL של השרת שלך (למשל: `https://hidon1.com`)
3. בדפי ה-HTML שלך, הוסף את השורה הבאה **לפני** טעינת `socket-client.js`:

```html
<script>
  // הגדר URL של שרת Socket.IO חיצוני
  window.SOCKET_URL = 'https://hidon1.com';
</script>
<script src="socket-client.js"></script>
```

אם לא תגדיר את `window.SOCKET_URL`, הלקוח ינסה להתחבר לאותו מקור (same origin), מה שיעבוד כאשר הדפים מוגשים מאותו שרת Node.js.

**לדוגמה - הגדרה מלאה:**
```html
<script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
<script>
  window.SOCKET_URL = 'https://hidon1.com';
</script>
<script src="socket-client.js"></script>
```

### תמונות נדרשות (מיושן)

הוסף את התמונות הבאות לתיקיות המתאימות:
- `public/images/default-avatar.png` - תמונת אווטר ברירת מחדל
- `public/images/coin-icon.png` - אייקון מטבע
- `public/images/trophy-icon.png` - אייקון גביע
- `public/backgrounds/main.jpg` - תמונת רקע ראשית

### H2H Multiplayer with Firebase (Node.js + Firebase)

This adds a simple Socket.IO server and HTML client to play a 20-question head-to-head game with room codes, player cards, and coin settlement through Firebase Admin.

### What this does
- Create room (4-digit code), join room, start game, answer questions.
- Shows player cards (avatar, display name, coins, wins).
- On finish, server transfers stake coins from loser to winner and increments winner's wins.
- Persists to Firebase Realtime Database.
- Ready to run on any Node.js host.

### Server (Node + Express + Socket.IO)
- Entry: `server.js`
- Static client served from `public/`
- Listens on `PORT` environment variable.
- Uses Firebase Admin credentials from environment variables.

### Environment variables
Set these in your hosting environment:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (ensure newlines are escaped as `\n`)
- `PORT` (optional; set by your hosting provider if needed)

You can copy from `.env.example`.

### Firebase client config
Update `public/firebase-client.js` with your Web App config (Project settings → Web app). This is needed for client read-only access to user cards.

### Database structure
- `users/{uid}`: `{ displayName, avatar, coins, wins }`
- `rooms/{code}`: `{ players: { hostUid, guestUid }, state, stake, scoreBoard, currentQuestion }`
- `matches/{matchId}`: `{ roomCode, players, winnerUid, coinsTransferred, endedAt }`

### Security rules (Realtime Database)
Use the following as a baseline to prevent client writes to `coins` and `wins`. See `firebase.rules.json`:

```json
{
  "rules": {
    ".read": true,
    ".write": false,
    "users": {
      "$uid": {
        ".read": "auth != null",
        "coins": { ".write": false },
        "wins": { ".write": false },
        ".write": "false"
      }
    },
    "rooms": {
      "$code": {
        ".read": true,
        "clientFlags": { ".write": "auth != null" }
      }
    },
    "matches": { ".read": true, ".write": false }
  }
}
```

### How it runs
- Client calls Socket.IO events (`create_room`, `join_room`, `start_game`, `answer`).
- Server maintains room state in Firebase RTDB and emits progress events.
- On game end, server performs secure transactions via Admin SDK to update coins and wins, and writes a `matches` record.

### Accessing the H2H interface
- Navigate to `public/h2h-index.html` for the Firebase-powered H2H game interface.
- The main `index.html` retains the original quiz interface.

### Next steps
- Integrate real questions and timers.
- Integrate Firebase Authentication for real user UIDs.
- Improve UI/UX and error handling.

---

## בטיחות

- **אל תעלה** מפתחות API של Firebase או סודות אחרים למאגר
- השתמש במשתני סביבה לכל המידע הרגיש
- הגבל את CORS לדומיינים המאושרים שלך בלבד
- עדכן באופן קבוע את התלויות לגרסאות בטוחות

### תחזוקה

- בדוק את לוגי השרת באופן קבוע
- עדכן את תיקיות השאלות (*.json) לפי הצורך
- גבה את נתוני המשתמשים מ-Firebase באופן קבוע
