'use strict';

const MAP = document.querySelector(`.map`);
const PINS_AREA = document.querySelector(`.map__pins`);
const PINS_AMOUNT = 8;
const types = [`palace`, `flat`, `house`, `bungalow`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const checkins = [`12:00`, `13:00`, `14:00`];
const checkouts = [`12:00`, `13:00`, `14:00`];
const housePhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

MAP.classList.remove(`map--faded`);

// Получение рандомного числа в заданном интервале от min до max
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Возвращает случайный индекс элемента массива
const getRandomElement = (arr) => Math.floor(Math.random() * arr.length);

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
PINS_AREA.append(createPinAd(pinAd));
