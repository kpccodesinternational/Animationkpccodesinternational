const spinner = document.getElementById("spinner");
let mode = 1;
let glowEnabled = true;

const motionModes = {
    1: "spin 4s linear infinite, float 3.2s ease-in-out infinite, pulseGlow 2.6s ease-in-out infinite",
    2: "spin 1.2s linear infinite, float 1.6s ease-in-out infinite, pulseGlow 1.2s ease-in-out infinite",
    3: "spin 0.9s linear infinite, float 1s ease-in-out infinite, pulseGlow 0.8s ease-in-out infinite",
};

function setSpinnerMotion() {
    spinner.style.animation = motionModes[mode];
    if (!glowEnabled) {
        spinner.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        spinner.style.filter = "saturate(0.9)";
    } else {
        spinner.style.boxShadow = "0 0 35px rgba(94, 231, 255, 0.8), 0 0 70px rgba(124, 92, 255, 0.55), 0 0 120px rgba(255, 94, 196, 0.35)";
        spinner.style.filter = "saturate(1.2)";
    }
}

function changeMode() {
    mode = mode >= Object.keys(motionModes).length ? 1 : mode + 1;
    setSpinnerMotion();
}

function toggleGlow() {
    glowEnabled = !glowEnabled;
    setSpinnerMotion();
}

async function updateColor() {
    try {
        const response = await fetch("/color");
        if (!response.ok) {
            throw new Error("Failed to fetch color");
        }
        const data = await response.json();
        const colorA = data.color || "#ff4d6d";
        const colorB = data.secondaryColor || "#7c5cff";

        spinner.style.background = `conic-gradient(${colorA}, #ffd166, #7ae582, #5ee7ff, ${colorB}, #ff5ec4, ${colorA})`;
        spinner.style.animationDuration = `${data.speed || 4}s`;
    } catch (error) {
        console.log("Color update failed:", error);
    }
}

setInterval(updateColor, 1200);
setSpinnerMotion();