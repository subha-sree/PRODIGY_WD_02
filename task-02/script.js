let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById("display");
const lapTimes = document.getElementById("lapTimes");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${Math.floor(milliseconds / 10).toString().padStart(2, "0")}`;
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
  
  // Change the text color dynamically based on elapsed time
  if (elapsedTime < 60000) {
    display.style.color = "#ff6347"; // Tomato for under 1 minute
  } else if (elapsedTime < 120000) {
    display.style.color = "#ff9800"; // Orange for between 1 and 2 minutes
  } else {
    display.style.color = "#4caf50"; // Green for over 2 minutes
  }
}

startButton.addEventListener("click", () => {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10); // Update every 10ms for millisecond precision
    startButton.disabled = true; // Disable start button while running
    pauseButton.disabled = false; // Enable pause button
  }
});

pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  startButton.disabled = false; // Enable start button again
  pauseButton.disabled = true; // Disable pause button while paused
});

resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  lapTimes.innerHTML = "";
  laps = [];
  startButton.disabled = false; // Enable start button
  pauseButton.disabled = true; // Disable pause button when reset
});

lapButton.addEventListener("click", () => {
  const lapTime = formatTime(elapsedTime);
  laps.push(lapTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${laps.length}: ${lapTime}`;
  lapTimes.appendChild(li);
});
