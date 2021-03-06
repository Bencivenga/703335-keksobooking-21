'use strict';

const Housing = {
  FLAT: `flat`,
  BUNGALOW: `bungalow`,
  HOUSE: `house`,
  PALACE: `palace`,
};

const map = document.querySelector(`.map`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);

const {isEscEvent} = window.util;

const generateFeatures = (cardFeatures, cardFragment) => {
  cardFeatures.forEach((feature) => {
    const featureElement = document.createElement(`li`);
    featureElement.className = `popup__feature popup__feature--${feature}`;
    cardFragment.appendChild(featureElement);
  });
  return cardFragment;
};

const createCard = (data) => {
  const cardTemplate = document.querySelector(`#card`).content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardFragment = document.createDocumentFragment();
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = data.offer;
  const {avatar} = data.author;
  const closeCardButton = cardElement.querySelector(`.popup__close`);
  closeCardButton.addEventListener(`click`, () => {
    closePopup();
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

    return (ending >= 5 && ending <= 20) ? `` : endings[lastFigure];
  };

  const guestEnding = (ending) => {
    let lastFigure = ending;
    if (ending >= 10) {
      lastFigure = ending % 10;
    }
    return (lastFigure === 1) ? `я` : `ей`;
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
  map.insertBefore(cardElement, mapFiltersContainer);
  return cardElement;
};

const showPopup = (item) => {
  closePopup();
  createCard(item);
  document.addEventListener(`keydown`, onMapCardEscPress);
};

const onMapCardEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const closePopup = () => {
  const card = map.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
  document.removeEventListener(`keydown`, onMapCardEscPress);
};

window.card = {
  map,
  mapFiltersContainer,
  showPopup,
  closePopup,
};
