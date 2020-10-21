'use strict';
(() => {
  const adForm = document.querySelector(`.ad-form `);
  const adTitle = adForm.querySelector(`#title`);
  const minTitleLength = adTitle.minLength;

  adTitle.addEventListener(`input`, () => {
    let valueLength = adTitle.value.length;
    if (valueLength < minTitleLength) {
      adTitle.setCustomValidity(`Минимальная длина — 30 символов, ещё ${minTitleLength - valueLength}`);
    } else {
      adTitle.setCustomValidity(``);
    }
    adTitle.reportValidity();
  });

  const adPrice = adForm.querySelector(`#price`);

  const validatePrice = () => {
    if (adPrice.validity.rangeUnderflow) {
      adPrice.setCustomValidity(`Цена не может быть меньше ${adPrice.min}`);
    } else if (adPrice.validity.rangeOverflow) {
      adPrice.setCustomValidity(`Цена не может быть больше ${adPrice.max}`);
    } else {
      adPrice.setCustomValidity(``);
    }
  };

  adPrice.addEventListener(`invalid`, () => {
    validatePrice();
  });

  adPrice.addEventListener(`input`, () => {
    validatePrice();
  });

  const typeToPriceMap = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  const setMinPrice = (minPrice) => {
    adPrice.setAttribute(`min`, minPrice);
    adPrice.setAttribute(`placeholder`, minPrice);
  };

  const housingType = adForm.querySelector(`#type`);
  let minPrice = typeToPriceMap[housingType.value];
  setMinPrice(minPrice);

  housingType.addEventListener(`change`, () => {
    adPrice.value = ``;
    minPrice = typeToPriceMap[housingType.value];
    setMinPrice(minPrice);
  });

  const checkIn = adForm.querySelector(`#timein`);
  const checkOut = adForm.querySelector(`#timeout`);

  const changeCheckIn = (value) => {
    checkIn.value = value;
  };

  const changeCheckOut = (value) => {
    checkOut.value = value;
  };

  checkIn.addEventListener(`change`, () => {
    changeCheckOut(checkIn.value);
  });

  checkOut.addEventListener(`change`, () => {
    changeCheckIn(checkOut.value);
  });

  const adRoomsNumber = adForm.querySelector(`#room_number`);
  const adGuestsNumber = adForm.querySelector(`#capacity`);

  const capacityValues = {
    '1': [`1`],
    '2': [`1`, `2`],
    '3': [`1`, `2`, `3`],
    '100': [`0`],
  };

  const setValidCapacity = () => {
    let roomsNumber = adRoomsNumber.value;
    let guestsOptions = adGuestsNumber.querySelectorAll(`option`);
    guestsOptions.forEach((option) => {
      if (capacityValues[roomsNumber].indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });

    if (guestsOptions[adGuestsNumber.selectedIndex].disabled) {
      adGuestsNumber.querySelector(`option:not([disabled])`).selected = true;
    }
  };

  setValidCapacity();

  adRoomsNumber.addEventListener(`change`, () => {
    setValidCapacity();
  });

  window.validation = {
    adForm,
  };
})();
