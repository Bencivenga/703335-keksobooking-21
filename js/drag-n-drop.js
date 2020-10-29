'use strict';

const {MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, PIN_TIP_HEIGHT, setupAddress, pinsArea, mainPin} = window.mainPin;
const {map} = window.mapFiltering;

const MAP_TOP = 130;
const MAP_BOTTOM = 630;
const MAP_LEFT = 0;
const MAP_RIGHT = pinsArea.offsetWidth;

const limits = {
  top: map.offsetTop + MAP_TOP - (MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT),
  bottom: MAP_BOTTOM - (MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT),
  left: MAP_LEFT + Math.ceil(MAIN_PIN_WIDTH / 2) - mainPin.offsetWidth,
  right: MAP_RIGHT + Math.ceil(MAIN_PIN_WIDTH / 2) - mainPin.offsetWidth,
};

const onMainPinMouseMove = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    const coordinates = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y,
    };

    if (coordinates.x < limits.left) {
      coordinates.x = limits.left;
    } else if (coordinates.x > limits.right) {
      coordinates.x = limits.right;
    }

    if (coordinates.y < limits.top) {
      coordinates.y = limits.top;
    } else if (coordinates.y > limits.bottom) {
      coordinates.y = limits.bottom;
    }

    mainPin.style.top = `${coordinates.y}px`;
    mainPin.style.left = `${coordinates.x}px`;

    setupAddress();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

window.dnd = {
  onMainPinMouseMove,
};
