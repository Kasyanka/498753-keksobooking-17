'use strict';
(function () {
  window.backend = (function () {
    var URL_SAVE = 'https://js.dump.academy/keksobooking';
    var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
    var STATUS_OK = 200;
    var TIMEOUT_PERIOD = 10000;

    return {
      save: function (data, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
          if (xhr.status === STATUS_OK) {
            onLoad(xhr.response);
          } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
        });
        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = TIMEOUT_PERIOD; // 10s
        xhr.open('POST', URL_SAVE);
        xhr.send(data);
      },

      load: function (onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
          if (xhr.status === 200) {
            onLoad(xhr.response);
          } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
        });
        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = 10000; // 10s

        xhr.open('GET', URL_LOAD);
        xhr.send();
      }
    };
  })();
})();
