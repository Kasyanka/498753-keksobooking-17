// Файл data.js
'use strict';
(function () {
// вызываем в модуле map.js при сдвиге главной метки или ентере на главной метке
  window.renderPinsClick = function () {

    // функция неудачи при загрузке данных с сервера
    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    // функция создания Pinов но без подтянутых параметров
    var createBlock = function (templ, object) {
      var block = templ.cloneNode(true);
      block.style.left = object.location.x + 'px';
      block.style.top = object.location.y + 'px';
      block.querySelector('img').src = object.author.avatar;
      return block;
    };

    // функция подтягивания параметорв в Pinы (тэмлейт и параметры из массива с сервера)
    var getFragment = function (array) {
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#pin')
                  .content
                  .querySelector('.map__pin');
      for (var i = 0; i < array.length; i++) {
        var block = createBlock(template, array[i]);
        block.classList.add('pin_all');
        fragment.appendChild(block);
      }
      return fragment;
    };

    // функция генерации всех Pinов из массива с сервера
    var renderPins = function (array) {
      var blocks = document.querySelector('.map__pins');
      var fragmentPin = getFragment(array);
      blocks.appendChild(fragmentPin);
    };

    // фильтруем пины по всем параметрам
    var filteringPinAll = function (type, room, guest, price, wifi, dishwasher, parking, washer, elevator, conditioner, array) {
      var PRICE_MIN = 10000;
      var PRICE_MAX = 50000;

      window.SERVER_DATA = array;

      var filterPinType = window.SERVER_DATA.filter(function (object) {
        return type === 'any' || object.offer.type === type;
      });

      var filterPinRooms = filterPinType.filter(function (object) {
        return room === 'any' || object.offer.rooms === parseInt(room, 10);
      });

      var filterPinQuest = filterPinRooms.filter(function (object) {
        return guest === 'any' || object.offer.guests === parseInt(guest, 10);
      });

      if (price === 'any') {
        var filterPinPrice = filterPinQuest;
      }
      if (price === 'low') {
        filterPinPrice = filterPinQuest.filter(function (object) {
          return object.offer.price < PRICE_MIN;
        });
      }
      if (price === 'high') {
        filterPinPrice = filterPinQuest.filter(function (object) {
          return object.offer.price >= PRICE_MAX;
        });
      }
      if (price === 'middle') {
        filterPinPrice = filterPinQuest.filter(function (object) {
          return object.offer.price >= PRICE_MIN && object.offer.price < PRICE_MAX;
        });
      }
      if (wifi) {
        var filterPinWifi = filterPinPrice.filter(function (object) {
          return object.offer.features.indexOf('wifi') !== -1;
        });
      } else {
        filterPinWifi = filterPinPrice;
      }
      if (dishwasher) {
        var filterPinDishwasher = filterPinWifi.filter(function (object) {
          return object.offer.features.indexOf('dishwasher') !== -1;
        });
      } else {
        filterPinDishwasher = filterPinWifi;
      }
      if (parking) {
        var filterPinParking = filterPinDishwasher.filter(function (object) {
          return object.offer.features.indexOf('parking') !== -1;
        });
      } else {
        filterPinParking = filterPinDishwasher;
      }
      if (washer) {
        var filterPinWasher = filterPinParking.filter(function (object) {
          return object.offer.features.indexOf('washer') !== -1;
        });
      } else {
        filterPinWasher = filterPinParking;
      }
      if (elevator) {
        var filterPinElevator = filterPinWasher.filter(function (object) {
          return object.offer.features.indexOf('elevator') !== -1;
        });
      } else {
        filterPinElevator = filterPinWasher;
      }
      if (conditioner) {
        var filterPinConditioner = filterPinElevator.filter(function (object) {
          return object.offer.features.indexOf('conditioner') !== -1;
        });
      } else {
        filterPinConditioner = filterPinElevator;
      }
      // после фильтрации пинов сразу выводим их на карту
      renderPins(filterPinConditioner.slice(0, 5));
      // вызываем функцию создания карт и навешивания клика открытия карт на все .pin_all которые отфильровали выше и вывели на карту
      window.renderShowCard(filterPinConditioner.slice(0, 5));
    };

    // выводим на карту все пины с сервера без фильтра или с фильтром
    var filteringPins = function (array) {

      var housingType = document.querySelector('#housing-type'); // селект тип жилья
      var housingRoom = document.querySelector('#housing-rooms'); // селект комнаты
      var housingGuest = document.querySelector('#housing-guests'); // селект гости
      var housingPrice = document.querySelector('#housing-price'); // селект цена
      var inputWifi = document.querySelector('#filter-wifi');
      var inputDishwasher = document.querySelector('#filter-dishwasher');
      var inputParking = document.querySelector('#filter-parking');
      var inputWasher = document.querySelector('#filter-washer');
      var inputElevator = document.querySelector('#filter-elevator');
      var inputConditioner = document.querySelector('#filter-conditioner');

      // выводим на карту все пины с сервера (фильтруем 5 первых) и навешиваем клик открытия карт
      renderPins(array.slice(0, 5));
      window.renderShowCard(array.slice(0, 5));

      // формула работы списков фильтра при клике 'change' на любой из них
      var onChangeFilterAll = function () {
        var mapPins = document.querySelector('.map__pins'); // сюда пишутся пины баттоны
        var mapPin = document.querySelectorAll('.map__pin'); // все пины

        // убираем все пины с карты кроме главного
        for (var i = 1; i < mapPin.length; i++) {
          mapPins.removeChild(mapPin[i]);
        }
        // закрываем карту (если открыта)
        window.closeCard();
        // выводим пины если все фильты 'any' и навешиваем клики открытия карт на все пины
        if (housingType.value === 'any' && housingPrice.value === 'any' && housingRoom.value === 'any' && housingGuest.value === 'any' && inputWifi.checked === false && inputDishwasher.checked === false && inputParking.checked === false && inputWasher.checked === false && inputElevator.checked === false && inputConditioner.checked === false) {
          renderPins(array.slice(0, 5));
          window.renderShowCard(array.slice(0, 5));
        } else {
        // вызываем функцию filteringPinAll для вывода отфильтрованных пинов с навешанными обработчиками открытия карт
          var lastTimeout;
          if (lastTimeout) {
            window.clearTimeout(lastTimeout);
          }
          window.setTimeout(function () {
            lastTimeout = filteringPinAll(housingType.value, housingRoom.value, housingGuest.value, housingPrice.value, inputWifi.checked, inputDishwasher.checked, inputParking.checked, inputWasher.checked, inputElevator.checked, inputConditioner.checked, array);
          }, 500);
        }
      };

      // навешивание клика 'change' на списки фильтов
      housingType.addEventListener('change', onChangeFilterAll);
      housingRoom.addEventListener('change', onChangeFilterAll);
      housingGuest.addEventListener('change', onChangeFilterAll);
      housingPrice.addEventListener('change', onChangeFilterAll);
      inputWifi.addEventListener('change', onChangeFilterAll);
      inputDishwasher.addEventListener('change', onChangeFilterAll);
      inputParking.addEventListener('change', onChangeFilterAll);
      inputWasher.addEventListener('change', onChangeFilterAll);
      inputElevator.addEventListener('change', onChangeFilterAll);
      inputConditioner.addEventListener('change', onChangeFilterAll);

      // функция удаления обработчиков 'change' с пинов после фильтрации
      window.delHandlerAll = function () {
        housingType.removeEventListener('change', onChangeFilterAll);
        housingRoom.removeEventListener('change', onChangeFilterAll);
        housingGuest.removeEventListener('change', onChangeFilterAll);
        housingPrice.removeEventListener('change', onChangeFilterAll);
        inputWifi.removeEventListener('change', onChangeFilterAll);
        inputDishwasher.removeEventListener('change', onChangeFilterAll);
        inputParking.removeEventListener('change', onChangeFilterAll);
        inputWasher.removeEventListener('change', onChangeFilterAll);
        inputElevator.removeEventListener('change', onChangeFilterAll);
        inputConditioner.removeEventListener('change', onChangeFilterAll);
      };
    };

    window.backend.load(filteringPins, errorHandler);
  };
})();
