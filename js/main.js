'use strict';

const PINS_AMOUNT = 8;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const PIN_TIP_HEIGHT = 22;
const MOUSE_MAIN_BUTTON = 0;
const map = document.querySelector(`.map`);
const pinsArea = document.querySelector(`.map__pins`);

// Получение рандомного числа в заданном интервале от min до max
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Возвращает случайный индекс элемента массива
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Возвращает новый массив случайной длины
const getRandomArr = (arr) => arr.slice(getRandomNumber(0, arr.length));

// Получение случайных координат адреса
const getRandomLocation = () => {
  const locationX = getRandomNumber(1, 1000); // 600
  const locationY = getRandomNumber(1, 1000); // 350
  return `${locationX}, ${locationY}`;
};

// Создает массив из сгенерированных объектов с описанием объявления
const getPinAds = () => {
  const pinAdData = [];

  const types = [`palace`, `flat`, `house`, `bungalow`];
  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const checkins = [`12:00`, `13:00`, `14:00`];
  const checkouts = [`12:00`, `13:00`, `14:00`];
  const housePhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  for (let i = 1; i <= PINS_AMOUNT; i++) {

    pinAdData.push({
      author: {
        avatar: `img/avatars/user0${i}.png`,
      },
      offer: {
        title: `Заголовок`,
        address: getRandomLocation(),
        price: getRandomNumber(1000, 1000000),
        type: getRandomElement(types),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getRandomElement(checkins),
        checkout: getRandomElement(checkouts),
        features: getRandomArr(features),
        description: `burn motherfucker`,
        photos: getRandomArr(housePhotos),
      },
      location: {
        x: getRandomNumber(0, map.clientWidth),
        y: getRandomNumber(130, 630),
      },
    });
  }

  return pinAdData;
};


// Заполняет шаблон для отрисовки пина
const createPinAds = (data) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const element = pinTemplate.cloneNode(true);
    const img = element.querySelector(`img`);

    element.style = `left: ${item.location.x - img.width / 2}px;
                     top: ${item.location.y - img.height}px;`;
    img.src = item.author.avatar;
    img.alt = item.offer.title;

    fragment.append(element);
    element.addEventListener(`click`, () => {
      showCard(item);
    });
  });

  return fragment;
};

// Создаем элементы списка с удобствами
const generateFeatures = (cardFeatures, cardFragment) => {
  cardFeatures.forEach((feature) => {
    const featureElement = document.createElement(`li`);
    featureElement.className = `popup__feature popup__feature--${feature}`;
    cardFragment.appendChild(featureElement);
  });
  return cardFragment;
};

// Заполняем шаблон модального окна информацией об объявлении
const createCard = (data) => {
  const cardTemplate = document.querySelector(`#card`).content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardFragment = document.createDocumentFragment();
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = data.offer;
  const {avatar} = data.author;
  const closeCardButton = cardElement.querySelector(`.popup__close`);
  closeCardButton.addEventListener(`click`, () => {
    closeCard();
  });

  const cardFeaturesContainer = cardElement.querySelector(`.popup__features`);
  cardFeaturesContainer.innerHTML = ``;

  const renderPhotos = (popupPhotos, photosCard) => {
    const cardPhotos = popupPhotos.querySelector(`.popup__photos`);
    const cardPhoto = cardPhotos.querySelector(`.popup__photo`);

    cardPhotos.innerHTML = ``;
    photosCard.forEach((photo) => {
      const newCardPhoto = cardPhoto.cloneNode(true);
      newCardPhoto.src = photo;
      cardFragment.appendChild(newCardPhoto);
    });

    cardPhotos.appendChild(cardFragment);
  };

  const cardType = cardElement.querySelector(`.popup__type`);
  const Housing = {
    FLAT: `flat`,
    BUNGALOW: `bungalow`,
    HOUSE: `house`,
    PALACE: `palace`,
  };

  switch (type) {
    case (Housing.FLAT):
      cardType.textContent = `квартира`;
      break;
    case (Housing.BUNGALOW):
      cardType.textContent = `бунгало`;
      break;
    case (Housing.HOUSE):
      cardType.textContent = `дом`;
      break;
    case (Housing.PALACE):
      cardType.textContent = `дворец`;
      break;
  }

  const roomEnding = (ending) => {
    let lastFigure = ending;
    if (ending > 20) {
      lastFigure = ending % 10;
    }
    const endings = {
      0: ``,
      1: `а`,
      2: `ы`,
      3: `ы`,
      4: `ы`,
      5: ``,
      6: ``,
      7: ``,
      8: ``,
      9: ``,
    };
    let result = (ending >= 5 && ending <= 20) ? `` : endings[lastFigure];
    return result;
  };

  const guestEnding = (ending) => {
    let lastFigure = ending;
    if (ending >= 10) {
      lastFigure = ending % 10;
    }
    let result = (lastFigure === 1) ? `я` : `ей`;
    return result;
  };


  cardElement.querySelector(`.popup__title`).textContent = title;
  cardElement.querySelector(`.popup__text--address`).textContent = address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнат${roomEnding(rooms)} для ${guests} гост${guestEnding(guests)}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardFeaturesContainer.appendChild(generateFeatures(features, cardFragment));
  cardElement.querySelector(`.popup__description`).textContent = description;
  renderPhotos(cardElement, photos);
  cardElement.querySelector(`.popup__avatar`).src = avatar;
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  map.insertBefore(cardElement, mapFiltersContainer);
  return cardElement;
};


const mainPin = pinsArea.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form `);
const adFormSelects = adForm.querySelectorAll(`select`);
const adFormInputs = adForm.querySelectorAll(`input`);
const adFormTextArea = adForm.querySelector(`#description`);
const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);

const mainPinsStartCoordinates = {
  x: Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
  y: Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2)
};
const mapFilter = document.querySelector(`.map__filters`);
const mapFilterSelects = mapFilter.querySelectorAll(`select`);
const mapFilterInputs = mapFilter.querySelectorAll(`input`);

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

const mainPinLocationInput = adForm.querySelector(`#address`);

const setInitPinMainPosition = () => {
  mainPinLocationInput.value = `${mainPinsStartCoordinates.x}, ${mainPinsStartCoordinates.y}`;
};

setInitPinMainPosition();

const setupAddress = () => {
  const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
  mainPinLocationInput.value = `${mainPinsStartCoordinates.x}, ${newPinPositionY}`;
};

mainPinLocationInput.setAttribute(`readonly`, `true`);

const onMainPinMouseButtonPress = (evt) => {
  if (evt.button === MOUSE_MAIN_BUTTON) {
    activatePage();
    closeCard();
  }
};

const onMapCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    closeCard();
  }
};

const showCard = (item) => {
  closeCard();
  createCard(item);
  document.addEventListener(`keydown`, onMapCardEscPress);
};

const closeCard = () => {
  const card = map.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
  document.removeEventListener(`keydown`, onMapCardEscPress);
};

const onMainPinEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    activatePage();
  }
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
  const pinAd = getPinAds();
  pinsArea.append(createPinAds(pinAd));
  setupAddress();
  mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
  mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonPress);
};

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

