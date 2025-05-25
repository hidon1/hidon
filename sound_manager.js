
let stageEnded = false;

function playStageSuccessSound() {
    const audio = new Audio('sounds/stage_success.mp3');
    audio.play();
}

function playStageFailSound() {
    const audio = new Audio('sounds/stage_fail.mp3');
    audio.play();
}

function playIntroMusic() {
    const audio = new Audio('sounds/intro.mp3');
    audio.loop = true;
    audio.play();
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
