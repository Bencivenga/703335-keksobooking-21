'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const mapFilter = map.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

  const onError = (errorMessage) => {
    const error = document.createElement(`div`);
    error.style = `z-index: 100; margin: 0 auto; text-align: center`;
    error.style.width = `800px`;
    error.style.height = `100px`;
    error.style.paddingTop = `30px`;
    error.style.backgroundColor = `black`;
    error.style.color = `white`;
    error.style.position = `absolute`;
    error.style.top = `200px`;
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = `30px`;
    error.textContent = errorMessage;
    error.style.cursor = `pointer`;
    document.body.insertAdjacentElement(`afterbegin`, error);
    error.addEventListener(`click`, () => {
      error.remove();
    });
  };

  window.mapFiltering = {
    map,
    mapFilterSelects,
    mapFilterInputs,
    onError,
  };
})();
