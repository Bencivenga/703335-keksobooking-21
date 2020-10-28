'use strict';
(() => {
  const PINS_TOTAL = 5;
  const {create} = window.pinAd;
  const {map, close} = window.card;
  const {pinsArea} = window.mainPin;
  const mapFilter = map.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

  const FILTER_ANY_VALUE = `any`;

  const PriceKey = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`,
  };

  const PriceValue = {
    MIDDLE: 10000,
    HIGH: 50000,
  };

  const LOW_PRICE_KEY = PriceKey.LOW;
  const MIDDLE_PRICE_KEY = PriceKey.MIDDLE;
  const HIGH_PRICE_KEY = PriceKey.HIGH;

  const MIDDLE_PRICE_VALUE = PriceValue.MIDDLE;
  const HIGH_PRICE_VALUE = PriceValue.HIGH;

  const housingType = mapFilter.querySelector(`#housing-type`);
  const housingPrice = mapFilter.querySelector(`#housing-price`);
  const housingRoom = mapFilter.querySelector(`#housing-rooms`);
  const housingGuest = mapFilter.querySelector(`#housing-guests`);
  const featuresSection = mapFilter.querySelector(`.map__features`);

  const removePins = () => {
    const prevPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    prevPins.forEach((pin) => {
      pin.remove();
    });
  };

  let ads;
  const onLoad = (data) => {
    ads = data;
    updateAds(data);
  };

  const updateAds = window.debounce((data) => {
    removePins();
    pinsArea.append(create(data.slice(0, PINS_TOTAL)));
  });

  const onFilterGetNewAds = () => {
    let newAds = [];

    ads.forEach((ad) => {
      if (filterHousingType(ad) &&
        filterHousingPrice(ad) &&
        filterHousingRooms(ad) &&
        filterHousingGuests(ad) &&
        filterHousingFeatures(ad)
      ) {
        newAds.push(ad);
      }
    });

    close();
    updateAds(newAds);
  };

  const filterHousingType = (ad) => housingType.value === ad.offer.type || housingType.value === FILTER_ANY_VALUE;

  const filterHousingPrice = (ad) => (housingPrice.value === LOW_PRICE_KEY && ad.offer.price < MIDDLE_PRICE_VALUE)
    || (housingPrice.value === MIDDLE_PRICE_KEY && ad.offer.price >= MIDDLE_PRICE_VALUE && ad.offer.price < HIGH_PRICE_VALUE)
    || (housingPrice.value === HIGH_PRICE_KEY && ad.offer.price >= HIGH_PRICE_VALUE)
    || (housingPrice.value === ad.offer.price
      || housingPrice.value === FILTER_ANY_VALUE);

  const filterHousingRooms = (ad) => (+housingRoom.value === ad.offer.rooms)
    || (housingRoom.value === FILTER_ANY_VALUE);

  const filterHousingGuests = (ad) => (+housingGuest.value === ad.offer.guests)
    || (housingGuest.value === FILTER_ANY_VALUE);

  const filterHousingFeatures = (ad) => {
    const checkedFeatures = featuresSection.querySelectorAll(`.map__checkbox:checked`);

    return Array.from(checkedFeatures).every((checkedFeature) => ad.offer.features.includes(checkedFeature.value));
  };

  window.mapFiltering = {
    map,
    mapFilterSelects,
    mapFilterInputs,
    mapFilter,
    removePins,
    onLoad,
    onFilterGetNewAds,
  };
})();
