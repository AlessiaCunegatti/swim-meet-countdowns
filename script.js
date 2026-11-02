const meets = {
  "tyr": {
    name: "TYR '85 INVITE",
    date: "2026-11-20T09:00:00"
  },

  "georgia-dec": {
    name: "Georgia Southern",
    date: "2026-12-10T09:00:00"
  },

  "queens": {
    name: "Queens (Diving)",
    date: "2027-01-08T09:00:00"
  },

  "gardner-webb": {
    name: "Gardner-Webb (Swimming)",
    date: "2027-01-09T09:00:00"
  },

  "georgia-jan": {
    name: "Georgia Southern (Diving)",
    date: "2027-01-15T09:00:00"
  },

  "unc-pembroke": {
    name: "UNC Pembroke",
    date: "2027-01-23T09:00:00"
  },

  "asun": {
    name: "ASUN Conference Championships",
    date: "2027-02-17T09:00:00"
  }
};

const meetSelect = document.getElementById("meet-name");
const meetTitle = document.getElementById("meet-title");
const meetDate = document.getElementById("meet-date");
const daysDisplay = document.getElementById("days");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const message = document.getElementById("message");

let countdownInterval;

function updateCountdown() {
  const selectedMeet = meets[meetSelect.value];

  if (!selectedMeet) {
    meetTitle.textContent = "Your next meet";
    meetDate.textContent = "Select a meet to begin.";

    daysDisplay.textContent = "0";
    hoursDisplay.textContent = "00";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";

    message.textContent = "Pick a meet from the dropdown above.";
    return;
  }

  const targetDate = new Date(selectedMeet.date);
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  meetTitle.textContent = selectedMeet.name;
  meetDate.textContent = targetDate.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

  if (difference <= 0) {
    daysDisplay.textContent = "0";
    hoursDisplay.textContent = "00";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";

    message.textContent = "This meet has started or has already happened!";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysDisplay.textContent = days;
  hoursDisplay.textContent = String(hours).padStart(2, "0");
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");

  message.textContent = "Time left until your meet!";
}

meetSelect.addEventListener("change", function () {
  clearInterval(countdownInterval);
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

updateCountdown();
