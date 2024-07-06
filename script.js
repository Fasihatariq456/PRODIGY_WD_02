const timerElement = document.querySelector('.timer');
const captionElement = document.getElementById('caption');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const resetButton = document.getElementById('reset-button');
const lapsButton = document.getElementById('laps-button');
const lapsList = document.getElementById('laps-list');
const lapsContainer = document.getElementById('laps-container');

let startTime = 0;
let currentTime = 0;
let intervalId = 0;
let isRunning = false;
let lapIndex = 1;

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);
resetButton.addEventListener('click', resetTimer);
lapsButton.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime();
        intervalId = setInterval(updateTimer, 10);
        isRunning = true;
        pauseButton.disabled = false;
        resumeButton.disabled = false;
        captionElement.textContent = 'Start!';
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startButton.disabled = true;
        captionElement.textContent = 'Paused!';
    }
}

function resumeTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - currentTime;
        intervalId = setInterval(updateTimer, 10);
        isRunning = true;
        captionElement.textContent = 'Resumed!';
    }
}

function resetTimer() {
    clearInterval(intervalId);
    startTime = 0;
    currentTime = 0;
    timerElement.textContent = '00:00:00:00'; // Update the timer display
    isRunning = false;
    startButton.disabled = false; // Enable the Start button again
    pauseButton.disabled = true; // Disable the Pause button
    resumeButton.disabled = true; // Disable the Resume button
    lapsList.innerHTML = ''; // Clear laps list
    lapIndex = 1; // Reset lap index
    lapsContainer.style.display = 'none'; // Hide laps container
    captionElement.textContent = 'Reset!';
}

function updateTimer() {
    currentTime = new Date().getTime() - startTime;
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = currentTime % 1000;
    timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}

function recordLap() {
    const lapTime = timerElement.textContent;
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.textContent = `Lap ${lapIndex} : ${lapTime}`; // Update lapItem text
    lapsList.appendChild(lapItem);
    lapIndex++;
    lapsContainer.style.display = 'block'; // Show laps container
    captionElement.textContent = `Lap ${lapIndex - 1} recorded`; // Update caption text
}
