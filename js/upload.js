'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const StatusCode = {
    OK: 200
  };

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.resposeType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
