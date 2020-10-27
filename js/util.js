'use strict';
(() => {
  const isEscEvent = (evt, cb) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      cb();
    }
  };

  const isEnterEvent = (evt, cb) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      cb();
    }
  };

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomArr = (arr) => arr.slice(getRandomNumber(0, arr.length));

  const getRandomLocation = () => {
    const locationX = getRandomNumber(1, 1000);
    const locationY = getRandomNumber(1, 1000);
    return `${locationX}, ${locationY}`;
  };

  const onError = (errorMessage) => {
    const error = document.createElement(`div`);
    error.style = `z-index: 100; margin: 0 auto; text-align: center`;
    error.style.width = `800px`;
    error.style.height = `100px`;
    error.style.paddingTop = `30px`;
    error.style.backgroundColor = `black`;
    error.style.color = `white`;
    error.style.position = `absolute`;
    error.style.top = `200px`;
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = `30px`;
    error.textContent = errorMessage;
    error.style.cursor = `pointer`;
    document.body.insertAdjacentElement(`afterbegin`, error);
    error.addEventListener(`click`, () => {
      error.remove();
    });
  };

  window.util = {
    isEscEvent,
    isEnterEvent,
    getRandomNumber,
    getRandomElement,
    getRandomArr,
    getRandomLocation,
    onError,
  };
})();
