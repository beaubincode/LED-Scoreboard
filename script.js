const scores = {
  home: 9,
  guest: 1
};

let remainingSeconds = 3;
let intervalId = null;

const homeScoreEl = document.getElementById("homeScore");
const guestScoreEl = document.getElementById("guestScore");
const timerEl = document.getElementById("timer");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startStopButton = document.getElementById("startStop");

function renderScores() {
  homeScoreEl.textContent = String(scores.home).padStart(2, "0");
  guestScoreEl.textContent = String(scores.guest).padStart(2, "0");
}

function renderClock() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function stopClock() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  startStopButton.textContent = "Start";
}

function startClock() {
  if (intervalId !== null || remainingSeconds <= 0) return;

  startStopButton.textContent = "Pause";
  intervalId = setInterval(() => {
    remainingSeconds -= 1;
    renderClock();

    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      renderClock();
      stopClock();
    }
  }, 1000);
}

document.querySelectorAll("[data-team][data-change]").forEach((button) => {
  button.addEventListener("click", () => {
    const team = button.dataset.team;
    const change = Number(button.dataset.change);
    scores[team] = Math.max(0, Math.min(99, scores[team] + change));
    renderScores();
  });
});

document.getElementById("setClock").addEventListener("click", () => {
  stopClock();

  const minutes = Math.max(0, Math.min(99, Number(minutesInput.value) || 0));
  const seconds = Math.max(0, Math.min(59, Number(secondsInput.value) || 0));

  remainingSeconds = minutes * 60 + seconds;
  renderClock();
});

startStopButton.addEventListener("click", () => {
  if (intervalId === null) {
    startClock();
  } else {
    stopClock();
  }
});

document.getElementById("reset").addEventListener("click", () => {
  stopClock();
  scores.home = 0;
  scores.guest = 0;
  renderScores();
});

renderScores();
renderClock();
