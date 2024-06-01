document.addEventListener("DOMContentLoaded", function() {
  const workTimeInput = document.getElementById("workTime");
  const breakTimeInput = document.getElementById("breakTime");
  const numberOfBreaksInput = document.getElementById("numberOfBreaks");
  const timeLeftDisplay = document.getElementById("time-left");
  const progressBar = document.getElementById("progress");
  const pomodorosCompletedDisplay = document.getElementById("pomodorosCompleted");
  const totalTimeWorkedDisplay = document.getElementById("totalTimeWorked");
  const modeToggle = document.getElementById("modeToggle");

  let workTime = parseInt(workTimeInput.value) * 60;
  let breakTime = parseInt(breakTimeInput.value) * 60;
  let numberOfBreaks = parseInt(numberOfBreaksInput.value);
  let currentBreaks = 0;
  let totalTimeWorked = 0;
  let timer;
  let isWorkTime = true;
  let isRunning = false;
  let remainingTime = workTime;

  const updateDisplay = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeLeftDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const startTimer = () => {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
      remainingTime--;
      progressBar.style.width = `${((isWorkTime ? (workTime - remainingTime) : (breakTime - remainingTime)) / (isWorkTime ? workTime : breakTime)) * 100}%`;
      updateDisplay(remainingTime);

      if (remainingTime <= 0) {
        if (isWorkTime) {
          totalTimeWorked += workTime / 60;
          currentBreaks++;
          if (currentBreaks >= numberOfBreaks) {
            clearInterval(timer);
            isRunning = false;
            alert('Pomodoro Session Completed!');
            return;
          }
        }

        isWorkTime = !isWorkTime;
        remainingTime = isWorkTime ? workTime : breakTime;

        if (!isWorkTime) {
          pomodorosCompletedDisplay.textContent = currentBreaks;
        }

        totalTimeWorkedDisplay.textContent = totalTimeWorked;
      }
    }, 1000);
  };

  document.getElementById("start").addEventListener("click", () => {
    startTimer();
  });

  document.getElementById("pause").addEventListener("click", () => {
    isRunning = false;
    clearInterval(timer);
  });

  document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    isWorkTime = true;
    currentBreaks = 0;
    totalTimeWorked = 0;
    remainingTime = workTime;
    updateDisplay(remainingTime);
    progressBar.style.width = '0';
    pomodorosCompletedDisplay.textContent = 0;
    totalTimeWorkedDisplay.textContent = 0;
  });

  document.getElementById("skip").addEventListener("click", () => {
    remainingTime = 1;
  });

  workTimeInput.addEventListener("change", () => {
    workTime = parseInt(workTimeInput.value) * 60;
    remainingTime = workTime;
    updateDisplay(remainingTime);
  });

  breakTimeInput.addEventListener("change", () => {
    breakTime = parseInt(breakTimeInput.value) * 60;
  });

  numberOfBreaksInput.addEventListener("change", () => {
    numberOfBreaks = parseInt(numberOfBreaksInput.value);
  });

  modeToggle.addEventListener("change", (event) => {
    document.body.classList.toggle("dark-mode", event.target.checked);
  });

  updateDisplay(remainingTime);
});