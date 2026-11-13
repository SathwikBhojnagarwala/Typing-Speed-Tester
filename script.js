
const input = document.querySelector("#username");
const timer = document.querySelector("#timer");
const wpm = document.querySelector("#wpm");
const accuracy = document.querySelector("#accuracy");
const passage = document.querySelector("#passage");
const restart = document.querySelector("#restart");
const charCount = document.querySelector("#charCount");

const original = "The quick brown fox jumps over the lazy dog.";

let timeLeft = 60;
let countdown = null;
let started = false;

function updatePassage() {
    const typed = input.value;

    passage.innerHTML = "";

    for (let i = 0; i < original.length; i++) {
        const character = document.createElement("span");
        character.textContent = original[i];

        if (i < typed.length) {
            character.className =
                typed[i] === original[i] ? "correct" : "incorrect";
        } else if (i === typed.length) {
            character.className = "current";
        }

        passage.appendChild(character);
    }
}

function startTimer() {
    countdown = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            input.disabled = true;
            calculateResults();
        }
    }, 1000);
}

function calculateResults() {
    const typed = input.value;
    let correct = 0;

    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) {
            correct++;
        }
    }

    wpm.textContent = typed.trim() === ""
        ? 0
        : typed.trim().split(/\s+/).length;

    accuracy.textContent = typed.length === 0
        ? 0
        : Math.round(correct / typed.length * 100);
}

input.addEventListener("input", function() {
    charCount.textContent = input.value.length;

    updatePassage();

    if (!started && input.value.length > 0) {
        started = true;
        startTimer();
    }

    if (input.value.length >= original.length) {
        clearInterval(countdown);
        input.disabled = true;
        calculateResults();
    }
});

restart.addEventListener("click", function() {
    clearInterval(countdown);

    timeLeft = 60;
    started = false;
    countdown = null;

    input.value = "";
    input.disabled = false;

    timer.textContent = 60;
    charCount.textContent = 0;
    wpm.textContent = 0;
    accuracy.textContent = 0;

    updatePassage();
});

updatePassage();
