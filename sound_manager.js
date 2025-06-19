
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
  sounds.intro.play().catch(e => console.log("Audio play failed: " + e));
}

function playGameMusic() {
  stopAllSounds();
  sounds.game.play().catch(e => console.log("Audio play failed: " + e));
}

function playSuccessSound() {
  sounds.success.currentTime = 0;
  sounds.success.play().catch(e => console.log("Audio play failed: " + e));
}

function playFailSound() {
  sounds.fail.currentTime = 0;
  sounds.fail.play().catch(e => console.log("Audio play failed: " + e));
}

function playLevelSuccessSound() {
  stopAllSounds();
  sounds.levelSuccess.currentTime = 0;
  sounds.levelSuccess.play().catch(e => console.log("Audio play failed: " + e));
}

function playLevelFailSound() {
  stopAllSounds();
  sounds.levelFail.currentTime = 0;
  sounds.levelFail.play().catch(e => console.log("Audio play failed: " + e));
}

function stopAllSounds() {
  Object.values(sounds).forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });
}
