'use strict';
(() => {
  const {adForm} = window.validation;

  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const PIN_TIP_HEIGHT = 22;
  const MAIN_PIN_START_X = 570;
  const MAIN_PIN_START_Y = 375;
  const pinsArea = document.querySelector(`.map__pins`);
  const mainPin = pinsArea.querySelector(`.map__pin--main`);
  const mainPinLocationInput = adForm.querySelector(`#address`);

  const mainPinsStartCoordinates = {
    x: Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
    y: Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2)
  };

  const setInitPinMainPosition = () => {
    mainPinLocationInput.value = `${mainPinsStartCoordinates.x}, ${mainPinsStartCoordinates.y}`;
  };

  setInitPinMainPosition();

  const setupAddress = () => {
    const newPinPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    mainPinLocationInput.value = `${newPinPositionX}, ${newPinPositionY}`;
  };

  mainPinLocationInput.setAttribute(`readonly`, `true`);

  window.mainPin = {
    MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT,
    PIN_TIP_HEIGHT,
    MAIN_PIN_START_X,
    MAIN_PIN_START_Y,
    setupAddress,
    pinsArea,
    mainPin,
    setInitPinMainPosition,
  };

})();
