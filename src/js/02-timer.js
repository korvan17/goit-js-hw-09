import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const input = document.querySelector("#datetime-picker");
const refs = {
  field: document.querySelectorAll(".field"),
  startButton: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
  setDate({ days, hours, minutes, seconds }) {
    this.days.textContent = addLeadingZero(days);
    this.hours.textContent = addLeadingZero(hours);
    this.minutes.textContent = addLeadingZero(minutes);
    this.seconds.textContent = addLeadingZero(seconds);
  },
};

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startButton.disabled = true;
let ms = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ms = new Date(selectedDates).getTime();
    buttUnblock(ms);
  },
};

flatpickr(input, options);

function convertMs(ms) {
  ms = ms - Date.now();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(val) {
  return val.toString().padStart(2, "0");
}

function buttUnblock(ms) {
  if (ms < Date.now()) {
    Notify.failure("Please choose a date in the future");
    refs.startButton.disabled = true;
    return;
  }
  setTime(ms);
  refs.startButton.disabled = false;
}

function setTime(ms) {
  if (ms < Date.now()) {
    clearInterval(intervalId);
    for (let i = 0; i < 30; i++) {
      createFirework();
    }
    return;
  }
  const dataSet = convertMs(ms);
  refs.setDate(dataSet);
}

refs.startButton.addEventListener("click", () => {
  refs.startButton.disabled = true;
  intervalId = setInterval(() => {
    refs.field.forEach((val) => (val.style.backgroundColor = randomColor()));
    setTime(ms);
  }, 1000);
});

// -------------------------------------------------------------------------------------

const fireworksContainer = document.getElementById("fireworks");

function createFirework() {
  const firework = document.createElement("div");
  firework.classList.add("firework");
  firework.style.left = Math.random() * 100 + "%";
  firework.style.top = Math.random() * 100 + "%";
  firework.style.background = randomColor();
  fireworksContainer.appendChild(firework);

  setTimeout(function () {
    firework.remove();
  }, 2000);
}
