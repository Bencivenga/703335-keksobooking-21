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
const getPinAd = () => {
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
const createPinAd = (data) => {
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
  });

  return fragment;
};

// Oтрисовывает пины в DOM
const pinAd = getPinAd();

// // Создаем элементы списка с удобствами
// const generateFeatures = (cardFeatures, cardFragment) => {
//   cardFeatures.forEach((feature) => {
//     const featureElement = document.createElement(`li`);
//     featureElement.className = `popup__feature popup__feature--${feature}`;
//     cardFragment.appendChild(featureElement);
//   });
//   return cardFragment;
// };
//
// // Заполняем шаблон модального окна информацией об объявлении
// const createCard = (data) => {
//   const cardTemplate = document.querySelector(`#card`).content;
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardFragment = document.createDocumentFragment();
//   const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = data.offer;
//   const {avatar} = data.author;
//
//
//   const cardFeaturesContainer = cardElement.querySelector(`.popup__features`);
//   cardFeaturesContainer.innerHTML = ``;
//
//   const renderPhotos = (popupPhotos, photosCard) => {
//     const cardPhotos = popupPhotos.querySelector(`.popup__photos`);
//     const cardPhoto = cardPhotos.querySelector(`.popup__photo`);
//
//     cardPhotos.innerHTML = ``;
//     photosCard.forEach((photo) => {
//       const newCardPhoto = cardPhoto.cloneNode(true);
//       newCardPhoto.src = photo;
//       cardFragment.appendChild(newCardPhoto);
//     });
//
//     cardPhotos.appendChild(cardFragment);
//   };
//
//   const cardType = cardElement.querySelector(`.popup__type`);
//   const Housing = {
//     FLAT: `flat`,
//     BUNGALOW: `bungalow`,
//     HOUSE: `house`,
//     PALACE: `palace`,
//   };
//
//   switch (type) {
//     case (Housing.FLAT):
//       cardType.textContent = `квартира`;
//       break;
//     case (Housing.BUNGALOW):
//       cardType.textContent = `бунгало`;
//       break;
//     case (Housing.HOUSE):
//       cardType.textContent = `дом`;
//       break;
//     case (Housing.PALACE):
//       cardType.textContent = `дворец`;
//       break;
//   }
//
//   cardElement.querySelector(`.popup__title`).textContent = title;
//   cardElement.querySelector(`.popup__text--address`).textContent = address;
//   cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
//   cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
//   cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
//   cardFeaturesContainer.appendChild(generateFeatures(features, cardFragment));
//   cardElement.querySelector(`.popup__description`).textContent = description;
//   renderPhotos(cardElement, photos);
//   cardElement.querySelector(`.popup__avatar`).src = avatar;
//
//   return cardElement;
// };
//
// const mapFiltersContainer = document.querySelector(`.map__filters-container`);
// map.insertBefore(createCard(pinAd[0]), mapFiltersContainer);

const mainPin = pinsArea.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form `);
const adFormSelects = adForm.querySelectorAll(`select`);
const adFormInputs = adForm.querySelectorAll(`input`);
const adFormTextArea = adForm.querySelector(`#description`);
const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);
const mainPinLocationInput = adForm.querySelector(`#address`);
const adFormRoomsNumber = adForm.querySelector(`#room_number`);
const adFormGuestsNumber = adForm.querySelector(`#capacity`);
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

const setInitPinMainPosition = () => {
  mainPinLocationInput.value = `${mainPinsStartCoordinates.x}, ${mainPinsStartCoordinates.y}`;
};

setInitPinMainPosition();

const setupAddress = () => {
  const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
  mainPinLocationInput.value = `${mainPinsStartCoordinates.x}, ${newPinPositionY}`;
};

const onMainPinMouseButtonPress = (evt) => {
  if (evt.button === MOUSE_MAIN_BUTTON) {
    activatePage();
  }
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
  pinsArea.append(createPinAd(pinAd));
  setupAddress();
  mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
  mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonPress);
};

const checkRoomsNumber = (roomsNumber) => {
  switch (roomsNumber) {
    case `1`:
      roomsNumber = 1;
      break;
    case `2`:
      roomsNumber = 2;
      break;
    case `3`:
      roomsNumber = 3;
      break;
    case `100`:
      roomsNumber = 100;
      break;
  }
  return roomsNumber;
};

const checkGuestsNumber = (guestsNumber) => {
  switch (guestsNumber) {
    case `1`:
      guestsNumber = 1;
      break;
    case `2`:
      guestsNumber = 2;
      break;
    case `3`:
      guestsNumber = 3;
      break;
    case `0`:
      guestsNumber = 100;
      break;
  }
  return guestsNumber;
};

const checkGuestsValidity = (roomsNumber, guestsNumber) => {
  switch (roomsNumber) {
    case 1:
      if (!(roomsNumber === guestsNumber)) {
        adFormGuestsNumber.setCustomValidity(`1 комната для 1 гостя`);
      } else {
        adFormGuestsNumber.setCustomValidity(``);
      }
      break;
    case 2:
      if (!(roomsNumber >= guestsNumber)) {
        adFormGuestsNumber.setCustomValidity(`2 комнаты для 2 гостей или для 1 гостя`);
      } else {
        adFormGuestsNumber.setCustomValidity(``);
      }
      break;
    case 3:
      if (!(roomsNumber >= guestsNumber)) {
        adFormGuestsNumber.setCustomValidity(`3 комнаты для 3 гостей, для 2 гостей или для 1 гостя`);
      } else {
        adFormGuestsNumber.setCustomValidity(``);
      }
      break;
    case 100:
      if (!(roomsNumber === guestsNumber)) {
        adFormGuestsNumber.setCustomValidity(`не для гостей`);
      } else {
        adFormGuestsNumber.setCustomValidity(``);
      }
  }
};

const setGuestsValidity = () => {
  let roomsNumber = checkRoomsNumber(adFormRoomsNumber.value);
  let guestsNumber = checkGuestsNumber(adFormGuestsNumber.value);
  return checkGuestsValidity(roomsNumber, guestsNumber);
};

setGuestsValidity();

adFormRoomsNumber.addEventListener(`change`, () => {
  setGuestsValidity();
});

adFormGuestsNumber.addEventListener(`change`, () => {
  setGuestsValidity();
});

