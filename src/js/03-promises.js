import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {};
const form = document.querySelector(".form");

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  formData.forEach((val, name) => {
    refs[name] = Number(val);
  });
  form.reset();
  for (let i = 1; i <= refs.amount; i += 1) {
    let position = i;
    let delay = refs.delay;
    setPromise(position, delay);
    refs.delay += refs.step;
  }
}

function setPromise(position, delay) {
  const id = setTimeout(() => {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    }
    reject({ position, delay });
  });
}
