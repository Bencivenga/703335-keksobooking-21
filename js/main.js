'use strict';
(() => {
  const MOUSE_MAIN_BUTTON = 0;
  const {map, mapFilterSelects, mapFilterInputs, onError} = window.mapFiltering;
  const {adForm} = window.validation;
  const {setupAddress, mainPin, pinsArea, MAIN_PIN_START_X, MAIN_PIN_START_Y, setInitPinMainPosition} = window.mainPin;
  const {close} = window.card;
  const {create} = window.pinAd;
  const {isEnterEvent, isEscEvent} = window.util;
  const {onMainPinMouseMove} = window.dnd;
  const {upload, download} = window.backend;

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

  const removePins = () => {
    const prevPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    prevPins.forEach((pin) => {
      pin.remove();
    });
  };

  const onMainPinMouseButtonPress = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activatePage();
    }
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const success = successTemplate.cloneNode(true);

  const showSuccessMessage = () => {
    map.appendChild(success);

    document.addEventListener(`click`, onBannerSuccessClick);
    document.addEventListener(`keydown`, onBannerSuccessKeyDown);
  };

  const onBannerSuccessClick = () => {
    closeBanner();
  };

  const onBannerSuccessKeyDown = (evt) => {
    isEscEvent(evt, closeBanner);
  };

  const onMainPinEnterPress = (evt) => {
    isEnterEvent(evt, activatePage);
  };

  const closeBanner = () => {
    const successMessage = document.querySelector(`.success`);
    successMessage.remove();

    document.removeEventListener(`click`, onBannerSuccessClick);
    document.removeEventListener(`keydown`, onBannerSuccessKeyDown);
  };

  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const error = errorTemplate.cloneNode(true);

  const showErrorMessage = () => {
    map.appendChild(error);

    document.addEventListener(`click`, onBannerErrorClick);
    document.addEventListener(`keydown`, onBannerErrorKeyDown);
  };

  const onBannerErrorClick = () => {
    closeBannerError();
  };

  const onBannerErrorKeyDown = (evt) => {
    isEscEvent(evt, closeBannerError);
  };

  const closeBannerError = () => {
    const message = document.querySelector(`.error`);
    message.remove();

    document.removeEventListener(`click`, onBannerErrorClick);
    document.removeEventListener(`keydown`, onBannerErrorKeyDown);
  };

  const resetButton = document.querySelector(`.ad-form__reset`);

  const resetForm = () => {
    deactivatePage();
  };

  const deactivatePage = () => {
    close();
    removePins();
    adForm.reset();
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    setupAddress();
    mainPin.style.left = `${MAIN_PIN_START_X}px`;
    mainPin.style.top = `${MAIN_PIN_START_Y}px`;
    setInitPinMainPosition();
    setDisabled(mapFilterSelects);
    setDisabled(mapFilterInputs);
    setDisabled(adFormSelects);
    setDisabled(adFormInputs);
    adFormTextArea.setAttribute(`disabled`, `true`);
    adFormSubmit.setAttribute(`disabled`, `true`);

    mainPin.addEventListener(`mousedown`, onMainPinMouseButtonPress);
    resetButton.removeEventListener(`click`, resetForm);
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseButtonPress);
  mainPin.addEventListener(`mousedown`, onMainPinMouseMove);
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
    setupAddress();
    upload((data) => {
      pinsArea.append(create(data));
    }, onError);

    adForm.addEventListener(`submit`, (evt) => {
      const data = new FormData(adForm);
      const onLoad = () => {
        deactivatePage();
        showSuccessMessage();
      };

      download(data, onLoad, showErrorMessage);
      evt.preventDefault();

    });

    mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonPress);
    resetButton.addEventListener(`click`, resetForm);

  };
})();


