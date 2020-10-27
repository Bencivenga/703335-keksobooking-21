'use strict';
(() => {
  const PINS_TOTAL = 5;
  const {create} = window.pinAd;
  const {map, close} = window.card;
  const {pinsArea} = window.mainPin;
  const mapFilter = map.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

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

  const updateAds = (data) => {
    removePins();
    pinsArea.append(create(data.slice(0, PINS_TOTAL)));
  };

  const housingType = document.querySelector(`#housing-type`);
  let housingTypeValue = ``;
  const ANY_HOUSING = `any`;
  housingType.addEventListener(`change`, () => {
    housingTypeValue = housingType.value;
    let newAds = [];
    ads.forEach((item) => {
      if (housingTypeValue === ANY_HOUSING || item.offer.type === housingTypeValue) {
        newAds.push(item);
      }
    });
    close();
    updateAds(newAds);
  });


  window.mapFiltering = {
    map,
    mapFilterSelects,
    mapFilterInputs,
    removePins,
    onLoad,
  };
})();
