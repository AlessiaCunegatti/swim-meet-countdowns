
const form = document.querySelector("#meet-form");
const nameInput = document.querySelector("#meet-name");

const eventTitle = document.querySelector("#event-title");
const eventDate = document.querySelector("#event-date");
const statusText = document.querySelector("#status");

const timeFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds")
};

// Your 2026-2027 swimming and diving schedule
const meets = {
  tyr: {
    name: "TYR '85 Invite",
    date: "2026-11-20",
    time: "09:00"
  },

  gs: {
    name: "Georgia Southern",
    date: "2026-12-10"
  },

  queens: {
    name: "Queens (Diving)",
    date: "2027-01-08"
  },

  gw: {
    name: "Gardner-Webb (Swimming)",
    date: "2027-01-09"
  },

  gsd: {
    name: "Georgia Southern (Diving)",
    date: "2027-01-15"
  },

  uncp: {
    name: "UNC Pembroke",
    date: "2027-01-23"
  },

  asun: {
    name: "ASUN Conference Championships",
    date: "2027-02-17"
  }
};

let selectedMeet = null;
let timerId = null;

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const meet = meets[nameInput.value];

  if (!meet) {
    statusText.textContent = "Please select a meet.";
    return;
  }

  selectedMeet = meet;

  eventTitle.textContent = meet.name;

  eventDate.textContent = new Date(
    meet.date + "T12:00:00"
  ).toLocaleDateString(undefined, {
    dateStyle: "full"
  });

  if (meet.time) {
    eventDate.textContent += " at " + meet.time;
  }

  if (timerId) {
    clearInterval(timerId);
  }

  updateCountdown();

  timerId = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
  if (!selectedMeet) return;

  const now = new Date();

  // If the meet time is known, count down to the exact time.
  if (selectedMeet.time) {

    const target = new Date(
      selectedMeet.date + "T" +
      selectedMeet.time + ":00"
    );

    const difference = target - now;

    if (difference <= 0) {
      statusText.textContent =
        "It's meet time! Good luck!";

      clearInterval(timerId);
      return;
    }

    const totalSeconds =
      Math.floor(difference / 1000);

    timeFields.days.textContent =
      Math.floor(totalSeconds / 86400);

    timeFields.hours.textContent =
      Math.floor((totalSeconds % 86400) / 3600);

    timeFields.minutes.textContent =
      Math.floor((totalSeconds % 3600) / 60);

    timeFields.seconds.textContent =
      totalSeconds % 60;

    statusText.textContent =
      "Time until race day:";

  } else {

    // For meets without a confirmed start time,
    // display the number of calendar days remaining.

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const meetDay = new Date(
      selectedMeet.date + "T00:00:00"
    );

    const daysRemaining = Math.ceil(
      (meetDay - today) / 86400000
    );

    if (daysRemaining < 0) {
      statusText.textContent =
        "This meet has already taken place.";

      return;
    }

    timeFields.days.textContent =
      daysRemaining;

    timeFields.hours.textContent = "--";
    timeFields.minutes.textContent = "--";
    timeFields.seconds.textContent = "--";

    statusText.textContent =
      "Days until the meet. Start time not yet provided.";
  }
}

