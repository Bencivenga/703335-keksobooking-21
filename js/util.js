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

  window.util = {
    isEscEvent,
    isEnterEvent,
    getRandomNumber,
    getRandomElement,
    getRandomArr,
    getRandomLocation,
  };
})();
