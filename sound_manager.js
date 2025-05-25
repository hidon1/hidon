
let sounds = {
    intro: new Audio('sounds/intro.mp3'),
    stage_success: new Audio('sounds/stage_success.mp3'),
    stage_fail: new Audio('sounds/stage_fail.mp3'),
    game_music: new Audio('sounds/game_music.mp3'),
    success: new Audio('sounds/success.mp3'),
    fail: new Audio('sounds/fail.mp3')
};

Object.values(sounds).forEach(sound => {
    sound.load();
});

let stageEnded = false;

function playStageSuccessSound() {
    sounds.stage_success.play();
}

function playStageFailSound() {
    sounds.stage_fail.play();
}

function playIntroMusic() {
    sounds.intro.loop = true;
    sounds.intro.play();
}

function playGameMusic() {
    sounds.game_music.loop = true;
    sounds.game_music.play();
}

function playSuccessSound() {
    sounds.success.play();
}

function playFailSound() {
    sounds.fail.play();
}

function stopAllSounds() {
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

function showQuestion() {
    clearInterval(timer);
    if (current >= questions.length) {
        if (!stageEnded) {
            stageEnded = true;
            if (correct >= 9) {
                score += 10;
                playStageSuccessSound();
                setTimeout(showSuccessScreen, 3000);
            } else {
                playStageFailSound();
                setTimeout(showFailScreen, 3000);
            }
        }
        return;
    }
}
