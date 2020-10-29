'use strict';
(() => {
  const MOUSE_MAIN_BUTTON = 0;
  const {mapFilterSelects, mapFilterInputs, mapFilter, removePins, onLoad, onFilterGetNewAds} = window.mapFiltering;
  const {adForm} = window.validation;
  const {setupAddress, mainPin, MAIN_PIN_START_X, MAIN_PIN_START_Y, setInitPinMainPosition} = window.mainPin;
  const {map, mapFiltersContainer, close} = window.card;
  const {isEnterEvent, isEscEvent, onError} = window.util;
  const {onMainPinMouseMove} = window.dnd;
  const {upload, download} = window.backend;
  const {
    adTitle, onAdTitleSetCustomValidity, adPrice, onInvalidAdPriceCheckValidity, onInputAdPriceCheckValidity, housingType,
    onHousingTypeChange, checkIn, checkOut, onCheckInChange, onCheckOutChange, adRoomsNumber, onAdRoomsChange
  } = window.validation;
  const {setDisabled, setEnabled} = window.uploadImage;

  const adFormSelects = adForm.querySelectorAll(`select`);
  const adFormInputs = adForm.querySelectorAll(`input`);
  const adFormTextArea = adForm.querySelector(`#description`);
  const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);

  const setInputsDisabled = (elements) => {
    elements.forEach((element) => {
      element.setAttribute(`disabled`, `true`);
    });
  };

  const setInputsActive = (elements) => {
    elements.forEach((element) => {
      element.removeAttribute(`disabled`, `true`);
    });
  };

  mapFiltersContainer.classList.add(`hidden`);

  setInputsDisabled(adFormSelects);
  setInputsDisabled(adFormInputs);
  setInputsDisabled(mapFilterSelects);
  setInputsDisabled(mapFilterInputs);
  adFormTextArea.setAttribute(`disabled`, `true`);
  adFormSubmit.setAttribute(`disabled`, `true`);

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
    setInputsDisabled(mapFilterSelects);
    setInputsDisabled(mapFilterInputs);
    setInputsDisabled(adFormSelects);
    setInputsDisabled(adFormInputs);
    mapFiltersContainer.classList.add(`hidden`);
    adFormTextArea.setAttribute(`disabled`, `true`);
    adFormSubmit.setAttribute(`disabled`, `true`);

    mainPin.addEventListener(`mousedown`, onMainPinMouseButtonPress);
    resetButton.removeEventListener(`click`, resetForm);

    mapFilter.removeEventListener(`change`, onFilterGetNewAds);
    adTitle.removeEventListener(`input`, onAdTitleSetCustomValidity);
    adPrice.removeEventListener(`input`, onInputAdPriceCheckValidity);
    adPrice.removeEventListener(`invalid`, onInvalidAdPriceCheckValidity);
    housingType.removeEventListener(`change`, onHousingTypeChange);
    checkIn.removeEventListener(`change`, onCheckInChange);
    checkOut.removeEventListener(`change`, onCheckOutChange);
    adRoomsNumber.removeEventListener(`change`, onAdRoomsChange);
    setDisabled();
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseButtonPress);
  mainPin.addEventListener(`mousedown`, onMainPinMouseMove);
  mainPin.addEventListener(`keydown`, onMainPinEnterPress);

  const activatePage = () => {
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    setInputsActive(adFormSelects);
    setInputsActive(adFormInputs);
    setInputsActive(mapFilterSelects);
    setInputsActive(mapFilterInputs);
    adFormTextArea.removeAttribute(`disabled`, `true`);
    adFormSubmit.removeAttribute(`disabled`, `true`);
    mapFiltersContainer.classList.remove(`hidden`);
    setupAddress();
    upload(onLoad, onError);

    adForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const data = new FormData(adForm);

      download(data, () => {
        deactivatePage();
        showSuccessMessage();
      }, showErrorMessage);
    });

    mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonPress);
    resetButton.addEventListener(`click`, resetForm);

    mapFilter.addEventListener(`change`, onFilterGetNewAds);
    adTitle.addEventListener(`input`, onAdTitleSetCustomValidity);
    adPrice.addEventListener(`input`, onInputAdPriceCheckValidity);
    adPrice.addEventListener(`invalid`, onInvalidAdPriceCheckValidity);
    housingType.addEventListener(`change`, onHousingTypeChange);
    checkIn.addEventListener(`change`, onCheckInChange);
    checkOut.addEventListener(`change`, onCheckOutChange);
    adRoomsNumber.addEventListener(`change`, onAdRoomsChange);
    setEnabled();
  };
})();


