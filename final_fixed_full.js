
let stageEnded = false;

function playStageSuccessSound() {
    if (sounds && sounds.stage_success) {
        sounds.stage_success.play();
    } else {
        const audio = new Audio('sounds/stage_success.mp3');
        audio.play();
    }
}

function playStageFailSound() {
    if (sounds && sounds.stage_fail) {
        sounds.stage_fail.play();
    } else {
        const audio = new Audio('sounds/stage_fail.mp3');
        audio.play();
    }
}

function playIntroMusic() {
    if (sounds && sounds.intro) {
        sounds.intro.loop = true;
        sounds.intro.play();
    } else {
        const audio = new Audio('sounds/intro.mp3');
        audio.loop = true;
        audio.play();
    }
}

function playGameMusic() {
    if (sounds && sounds.game_music) {
        sounds.game_music.loop = true;
        sounds.game_music.play();
    } else {
        const audio = new Audio('sounds/game_music.mp3');
        audio.loop = true;
        audio.play();
    }
}

function playSuccessSound() {
    if (sounds && sounds.success) {
        sounds.success.play();
    } else {
        const audio = new Audio('sounds/success.mp3');
        audio.play();
    }
}

function playFailSound() {
    if (sounds && sounds.fail) {
        sounds.fail.play();
    } else {
        const audio = new Audio('sounds/fail.mp3');
        audio.play();
    }
}

function stopAllSounds() {
    if (typeof sounds !== 'undefined') {
        Object.values(sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    } else {
        console.warn("No sounds object defined to stop.");
    }
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
