// sound_manager.js

// צלילים - נתיבי קבצים
const sounds = {
  intro: new Audio('sounds/intro.mp3'),
  game: new Audio('sounds/game.mp3'),
  success: new Audio('sounds/success.mp3'),
  fail: new Audio('sounds/fail.mp3'),
  levelSuccess: new Audio('sounds/level_success.mp3'),
  levelFail: new Audio('sounds/level_fail.mp3')
};

// הגדרות לולאה - רק לפתיח ולמוזיקה של המשחק
sounds.intro.loop = true;
sounds.game.loop = true;
sounds.success.loop = false;
sounds.fail.loop = false;
sounds.levelSuccess.loop = false;
sounds.levelFail.loop = false;

// פונקציות הפעלה וכיבוי
function playIntroMusic() {
  stopAllSounds();
  sounds.intro.play();
}

function playGameMusic() {
  stopAllSounds();
  sounds.game.play();
}

function playSuccessSound() {
  sounds.success.currentTime = 0;
  sounds.success.play();
}

function playFailSound() {
  sounds.fail.currentTime = 0;
  sounds.fail.play();
}

function playLevelSuccessSound() {
  stopAllSounds();
  sounds.levelSuccess.currentTime = 0;
  sounds.levelSuccess.play();
}

function playLevelFailSound() {
  stopAllSounds();
  sounds.levelFail.currentTime = 0;
  sounds.levelFail.play();
}

function stopAllSounds() {
  Object.values(sounds).forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });
}

// דוגמה: שימוש בסיסי
// playIntroMusic();
// כאשר מתחיל המשחק: playGameMusic();
// תשובה נכונה: playSuccessSound();
// תשובה שגויה: playFailSound();
// סוף שלב בהצלחה: playLevelSuccessSound();
// סוף שלב בכישלון: playLevelFailSound();
