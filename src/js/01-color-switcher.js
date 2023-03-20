const refs = {
  buttStart: document.querySelector("[data-start]"),
  buttStop: document.querySelector("[data-stop]"),
  bodyColor: document.body,
  intervalID: null,
  setBodyColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
    this.bodyColor.style.backgroundColor = randomColor;
  },
  start() {
    this.intervalID = setInterval(() => {
      this.setBodyColor();
    }, 1000);
    this.buttStart.disabled = true;
  },
  stop() {
    clearInterval(this.intervalID);
    this.buttStart.disabled = false;
  },
};

refs.buttStart.addEventListener("click", () => {
  refs.start();
});
refs.buttStop.addEventListener("click", () => {
  refs.stop();
});
