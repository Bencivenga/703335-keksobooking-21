'use strict';
(() => {
  const statusCode = {
    OK: 200,
  };

  const URL_TO_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_TO_POST = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 5000;
  const GET = `GET`;
  const POST = `POST`;

  const dataHandler = (method, url, data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения, проверьте подключение к интернету и повторите попытку`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

  };

  window.backend = {
    load(onLoad, onError) {
      dataHandler(GET, URL_TO_GET, null, onLoad, onError);
    },
    save(data, onLoad, onError) {
      dataHandler(POST, URL_TO_POST, data, onLoad, onError);
    },
  };
})();
