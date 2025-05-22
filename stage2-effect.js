
// JavaScript for Stage 2 Animated Elements (7 seconds)

function runStage2Animation() {
    const images = [
        "1 (2).png", "1 (3).png", "1 (5).png", "1 (6).png",
        "1 (7).png", "1 (11).png", "1 (12).png", "1 (13).png", "1 (14).png"
    ];

    const container = document.createElement("div");
    container.id = "stage2AnimationContainer";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.zIndex = "9999";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    images.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.style.position = "absolute";
        img.style.width = "80px";
        img.style.height = "80px";
        img.style.top = Math.random() * (screenHeight - 80) + "px";
        img.style.left = Math.random() * (screenWidth - 80) + "px";
        img.style.animation = "floatAnimation 7s ease-in-out infinite";
        container.appendChild(img);
    });

    // Remove animation after 7 seconds
    setTimeout(() => {
        container.remove();
    }, 7000);
}

// Example usage: call this when Stage 2 ends
// runStage2Animation();


// Animation CSS
const style = document.createElement('style');
style.textContent = `
@keyframes floatAnimation {
    0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
    50% { transform: translateY(-30px) rotate(180deg); opacity: 0.7; }
    100% { transform: translateY(0px) rotate(360deg); opacity: 1; }
}`;
document.head.appendChild(style);
