'use strict';

const MAP = document.querySelector(`.map`);
const PINS_AREA = document.querySelector(`.map__pins`);
const PINS_AMOUNT = 8;

MAP.classList.remove(`map--faded`);

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
        x: getRandomNumber(0, MAP.clientWidth),
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
// console.log(pinAd);
PINS_AREA.append(createPinAd(pinAd));

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

  cardElement.querySelector(`.popup__title`).textContent = title;
  cardElement.querySelector(`.popup__text--address`).textContent = address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardFeaturesContainer.appendChild(generateFeatures(features, cardFragment));
  cardElement.querySelector(`.popup__description`).textContent = description;
  renderPhotos(cardElement, photos);
  cardElement.querySelector(`.popup__avatar`).src = avatar;

  return cardElement;
};

const mapFiltersContainer = document.querySelector(`.map__filters-container`);
MAP.insertBefore(createCard(pinAd[0]), mapFiltersContainer);

