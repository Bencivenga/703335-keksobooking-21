'use strict';
(() => {
  const MOUSE_MAIN_BUTTON = 0;
  const {map, mapFilterSelects, mapFilterInputs} = window.mapFiltering;
  const {adForm} = window.validation;
  const {setupAddress, mainPin, pinsArea} = window.mainPin;
  const {close} = window.card;
  const {create} = window.pinAd;
  const {get} = window.data;
  const {isEnterEvent} = window.util;

  const adFormSelects = adForm.querySelectorAll(`select`);
  const adFormInputs = adForm.querySelectorAll(`input`);
  const adFormTextArea = adForm.querySelector(`#description`);
  const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);

  const setDisabled = (elements) => {
    elements.forEach((element) => {
      element.setAttribute(`disabled`, `true`);
    });
  };

  const setActive = (elements) => {
    elements.forEach((element) => {
      element.removeAttribute(`disabled`, `true`);
    });
  };

  setDisabled(adFormSelects);
  setDisabled(adFormInputs);
  setDisabled(mapFilterSelects);
  setDisabled(mapFilterInputs);
  adFormTextArea.setAttribute(`disabled`, `true`);
  adFormSubmit.setAttribute(`disabled`, `true`);

  function removePins() {
    const prevPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (prevPins) {
      prevPins.forEach((pin) => {
        pin.parentNode.removeChild(pin);
      });
    }
  }

  const onMainPinMouseButtonPress = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activatePage();
      close();
    }
  };

  const onMainPinEnterPress = (evt) => {
    isEnterEvent(evt, activatePage);
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseButtonPress);
  mainPin.addEventListener(`keydown`, onMainPinEnterPress);

  const activatePage = () => {
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    setActive(adFormSelects);
    setActive(adFormInputs);
    setActive(mapFilterSelects);
    setActive(mapFilterInputs);
    adFormTextArea.removeAttribute(`disabled`, `true`);
    adFormSubmit.removeAttribute(`disabled`, `true`);
    removePins();
    const pinAd = get();
    pinsArea.append(create(pinAd));
    setupAddress();
    mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonPress);
  };
})();


