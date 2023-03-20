import { Notify } from "notiflix/build/notiflix-notify-aio";

const form = document.querySelector(".form");
const refs = {
  position: 0,
};

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  if (!refs.delay) {
    const formData = new FormData(event.currentTarget);
    formData.forEach((val, name) => {
      refs[name] = Number(val);
    });
    form.reset();
  }
  if (refs.position >= refs.amount) {
    refs.delay = undefined;
    refs.position = 0;
    return;
  }
  let p = refs.position;
  let d = refs.delay;
  setPromise(p, d);
  refs.position += 1;
  refs.delay += refs.step;
  onFormSubmit(event);
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
