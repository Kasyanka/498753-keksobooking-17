// Файл map.js
'use strict';

(function () {
  window.ESC_BUTTON = 27;
  window.ENTER_BUTTON = 13;
  window.MAIN_PIN_START_X = 603;
  window.MAIN_PIN_START_Y = 462;
  var RADIUS_PIN = 33;
  var DIAMETER_PIN = 65;
  var HEIGHT_END_PIN = 22;

  // функция вывода всех Pinов с сервера на карту
  window.single = false;
  var onClickActivatePin = function () {

    if (!window.single) {
      window.renderPinsClick();
    }
    window.single = true;
  };

  window.activatePin = function () {
    var activate = document.querySelector('.map__pin--main');
    activate.addEventListener('mousedown', onClickActivatePin);
  };
  window.activatePin();

  window.activatePinKeydown = function () {
    var activate = document.querySelector('.map__pin--main');
    activate.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_BUTTON) {
        onClickActivatePin();
      }
    });
  };
  window.activatePinKeydown();

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
        if ((moveEvt.clientY + window.pageYOffset) < 130 || (moveEvt.clientY + window.pageYOffset) > 630 || moveEvt.clientX < 380 || moveEvt.clientX > 1520) {
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
          var pinMainLeft = parseInt(addressX, 10) + RADIUS_PIN;
          var pinMainTop = parseInt(addressY, 10) + DIAMETER_PIN + HEIGHT_END_PIN;
          address.value = pinMainLeft + ', ' + pinMainTop;
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
