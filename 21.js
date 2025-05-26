// ========== ניהול צלילים ==========

// צלילים - נתיבי קבצים
const sounds = {
  intro: new Audio('sounds/intro.mp3'),
  game: new Audio('sounds/game.mp3'),
  success: new Audio('sounds/success.mp3'),
  fail: new Audio('sounds/fail.mp3'),
  levelSuccess: new Audio('sounds/level_success.mp3'),
  levelFail: new Audio('sounds/level_fail.mp3')
};

sounds.intro.loop = true;
sounds.game.loop = true;
sounds.success.loop = false;
sounds.fail.loop = false;
sounds.levelSuccess.loop = false;
sounds.levelFail.loop = false;

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

// ========== הצגת שאלה ==========

// יש להניח שכל המשתנים הגלובליים (stage, current, correct, score, questions וכו') כבר קיימים

function showQuestion() {
    let isAnswerLocked = false;
    setBackgroundOpacity(0.75);
    clearInterval(timer); // מנקה כל טיימר קודם - עדכון חשוב!
    if (current >= 10) {
        document.getElementById('skipButton').style.display = 'none';
        if (correct >= 9) {
            score += 10;
            playLevelSuccessSound();  // הפעלת צליל הצלחה של שלב
            setTimeout(() => {
                showSuccessScreen();
            }, 1400); // תן לצליל להתנגן לפני החלפת מסך (כוון לפי אורך הצליל שלך)
        } else {
            playLevelFailSound(); // הפעלת צליל כישלון שלב
            setTimeout(() => {
                showFailScreen();
            }, 1400); // כנ"ל
        }
        return;
    }
    document.getElementById('skipButton').style.display = score >= 50 ? 'inline-block' : 'none';
    const q = questions[current];
    shuffleQuestionAnswers(q);
    document.getElementById('questionText').textContent = q.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'answer';
        btn.textContent = opt;
        btn.onclick = () => {
            if (isAnswerLocked) return;
            isAnswerLocked = true;
            clearInterval(timer); // מנקה טיימר מיד בלחיצה - עדכון חשוב!
            const isCorrect = i === q.correct;
            btn.classList.add(isCorrect ? 'correct' : 'wrong');
            if (isCorrect) {
                playSuccessSound();
            } else {
                playFailSound();
            }
            if (isCorrect) { score += 5; correct++; } else { score -= 5; }
            setTimeout(() => { current++; showQuestion(); }, 800);
        };
        answersDiv.appendChild(btn);
    });
    startTimer();
    updateDashboard();
}

// ===============================
// ↓↓ עדכון כאן — בלי מוזיקת פתיח בסיום שלב! ↓↓
// ===============================

function showSuccessScreen() {
    setBackgroundOpacity(1);
    clearInterval(timer);
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('successScreen').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('endScreen').style.display = 'none';
    // לא קוראים כאן ל-playIntroMusic()!
    document.getElementById('successStageNum').textContent = stage;
    showSuccessMessage();
}

function showFailScreen() {
    setBackgroundOpacity(1);
    clearInterval(timer);
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('failScreen').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('successScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'none';
    // לא קוראים כאן ל-playIntroMusic()!
}
