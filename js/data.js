'use strict';
(() => {
  const PINS_AMOUNT = 8;

  const {map} = window.mapFiltering;
  const {getRandomNumber, getRandomElement, getRandomArr, getRandomLocation} = window.util;

  const get = () => {
    const data = [];

    const types = [`palace`, `flat`, `house`, `bungalow`];
    const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
    const checkins = [`12:00`, `13:00`, `14:00`];
    const checkouts = [`12:00`, `13:00`, `14:00`];
    const housePhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

    for (let i = 1; i <= PINS_AMOUNT; i++) {

      data.push({
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

    return data;
  };

  window.data = {
    get,
  };

})();

