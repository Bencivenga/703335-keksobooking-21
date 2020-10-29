'use strict';

const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeOut = null;

  return (...args) => {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};
