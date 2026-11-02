const form = document.querySelector("#meet-form");
const nameInput = document.querySelector("#meet-name");
const dateInput = document.querySelector("#meet-date");

const eventTitle = document.querySelector("#event-title");
const eventDate = document.querySelector("#event-date");
const statusText = document.querySelector("#status");

const timeFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds")
};

let meetTime = null;
let timerId = null;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredName = nameInput.value.trim();
  const enteredDate = new Date(dateInput.value);

  if (!enteredName || Number.isNaN(enteredDate.getTime())) {
    statusText.textContent = "Please enter a meet name and a valid date.";
    return;
  }

  if (enteredDate.getTime() <= Date.now()) {
    statusText.textContent = "Choose a future date and time for your meet.";
    return;
  }

  meetTime = enteredDate;
  eventTitle.textContent = enteredName;
  eventDate.textContent = meetTime.toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short"
  });
  statusText.textContent = "Time until race day:";

  if (timerId) {
    clearInterval(timerId);
  }

  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
  if (!meetTime) return;

  const difference = meetTime.getTime() - Date.now();

  if (difference <= 0) {
    Object.values(timeFields).forEach((field) => {
      field.textContent = "00";
    });
    statusText.textContent = "It's meet time! Good luck!";
    clearInterval(timerId);
    timerId = null;
    return;
  }

  const secondsTotal = Math.floor(difference / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  timeFields.days.textContent = String(days).padStart(2, "0");
  timeFields.hours.textContent = String(hours).padStart(2, "0");
  timeFields.minutes.textContent = String(minutes).padStart(2, "0");
  timeFields.seconds.textContent = String(seconds).padStart(2, "0");
}
