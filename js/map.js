// Файл map.js
'use strict';

(function () {
  // функция вывода 8-ми Pinов на карту
  var PINS_COUNT = 8;

  var single = false;
  var onClickActivate = function () {
    if (!single) {
      window.renderPins(PINS_COUNT);
    }
    single = true;
  };

  var activateForm = function () {
    var activate = document.querySelector('.map__pin--main');
    activate.addEventListener('mousedown', onClickActivate);
  };
  activateForm();

  // функция передвижения главной метки по карте
  var movePin = function () {
    var activateMove = document.querySelector('.map__pin--main');
    // зажимаем метку
    activateMove.addEventListener('mousedown', function (evt) {
    // запоминаем координаты
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      // двигаем метку
      var onMouseMove = function (moveEvt) {
        if ((moveEvt.clientY + window.pageYOffset) < 130 || (moveEvt.clientY + window.pageYOffset) > 630 || moveEvt.clientX < 400 || moveEvt.clientX > 1500) {
          return;
        }
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var addressX = activateMove.style.left = (activateMove.offsetLeft - shift.x) + 'px';
        var addressY = activateMove.style.top = (activateMove.offsetTop - shift.y) + 'px';

        // настройка адреса
        var addAddress = function () {
          var address = document.querySelector('#address');
          var pinMainLeft = parseInt(addressX, 10) + 33;
          var pinMainTop = parseInt(addressY, 10) + 65 + 22;
          address.setAttribute('value', pinMainLeft + ', ' + pinMainTop);
        };
        addAddress();
      };
      // отпускаем метку
      var onMouseUp = function () {

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  movePin();
})();
