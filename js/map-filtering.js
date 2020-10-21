'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const mapFilter = map.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

  window.mapFiltering = {
    map,
    mapFilterSelects,
    mapFilterInputs,
  };
})();
