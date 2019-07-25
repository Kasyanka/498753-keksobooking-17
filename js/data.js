// Файл data.js
'use strict';

window.renderPinsClick = function () {

  // функция создания Pinов но без подтянутых параметров
  var createBlock = function (templ, objeckt) {
    var block = templ.cloneNode(true);
    block.style.left = objeckt.location.x + 'px';
    block.style.top = objeckt.location.y + 'px';
    block.querySelector('img').src = objeckt.author.avatar;
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

  // функция генерации всех Pinов из массива с сервера
  var renderPins = function (array) {
    var blocks = document.querySelector('.map__pins');
    var fragmentPin = getFragment(array);
    blocks.appendChild(fragmentPin);
  };

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

  var filteringType = function (type, room, guest, price, wifi, dishwasher, parking, washer, elevator, conditioner, array) {
    window.SERVER_DATA = array;

    var filterPinType = window.SERVER_DATA.filter(function (objeckt) {
      return type === 'any' || objeckt.offer.type === type;
    });

    var filterPinRooms = filterPinType.filter(function (objeckt) {
      return room === 'any' || objeckt.offer.rooms === parseInt(room, 10);
    });

    var filterPinQuest = filterPinRooms.filter(function (objeckt) {
      return guest === 'any' || objeckt.offer.guests === parseInt(guest, 10);
    });

    if (price === 'any') {
      var filterPinPrice = filterPinQuest;
    }
    if (price === 'low') {
      filterPinPrice = filterPinQuest.filter(function (objeckt) {
        return objeckt.offer.price < 10000;
      });
    }
    if (price === 'high') {
      filterPinPrice = filterPinQuest.filter(function (objeckt) {
        return objeckt.offer.price >= 50000;
      });
    }
    if (price === 'middle') {
      filterPinPrice = filterPinQuest.filter(function (objeckt) {
        return objeckt.offer.price >= 10000 && objeckt.offer.price < 50000;
      });
    }
    if (wifi) {
      var filterPinWifi = filterPinPrice.filter(function (objeckt) {
        return objeckt.offer.features.indexOf('wifi') !== -1;
      });
    } else {
      filterPinWifi = filterPinPrice;
    }
    if (dishwasher) {
      var filterPinDishwasher = filterPinWifi.filter(function (objeckt) {
        return objeckt.offer.features.indexOf('dishwasher') !== -1;
      });
    } else {
      filterPinDishwasher = filterPinWifi;
    }
    if (parking) {
      var filterPinParking = filterPinDishwasher.filter(function (objeckt) {
        return objeckt.offer.features.indexOf('parking') !== -1;
      });
    } else {
      filterPinParking = filterPinDishwasher;
    }
    if (washer) {
      var filterPinWasher = filterPinParking.filter(function (objeckt) {
        return objeckt.offer.features.indexOf('washer') !== -1;
      });
    } else {
      filterPinWasher = filterPinParking;
    }
    if (elevator) {
      var filterPinElevator = filterPinWasher.filter(function (objeckt) {
        return objeckt.offer.features.indexOf('elevator') !== -1;
      });
    } else {
      filterPinElevator = filterPinWasher;
    }
    if (conditioner) {
      var filterPinConditioner = filterPinElevator.filter(function (objeckt) {
        return objeckt.offer.features.indexOf('conditioner') !== -1;
      });
    } else {
      filterPinConditioner = filterPinElevator;
    }

    renderPins(filterPinConditioner.slice(0, 5));
    window.renderShowCard(filterPinConditioner.slice(0, 5));
  };

  var filteringPins = function (array) {
    renderPins(array.slice(0, 5));
    window.renderShowCard(array);

    var onChangeFilterAll = function () {
      var mapPins = document.querySelector('.map__pins'); // сюда пишутся пины баттоны
      var mapPin = document.querySelectorAll('.map__pin'); // все пины

      // убираем все пины с карты кроме главного
      for (var i = 1; i < mapPin.length; i++) {
        mapPins.removeChild(mapPin[i]);
      }
      window.closeCard();
      if (housingType.value === 'any' && housingPrice.value === 'any' && housingRoom.value === 'any' && housingGuest.value === 'any' && inputWifi.checked === false && inputDishwasher.checked === false && inputParking.checked === false && inputWasher.checked === false && inputElevator.checked === false && inputConditioner.checked === false) {
        renderPins(array.slice(0, 5));
        window.renderShowCard(array);
      } else {
        var lastTimeout;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        window.setTimeout(function () {
          lastTimeout = filteringType(housingType.value, housingRoom.value, housingGuest.value, housingPrice.value, inputWifi.checked, inputDishwasher.checked, inputParking.checked, inputWasher.checked, inputElevator.checked, inputConditioner.checked, array);
        }, 500);
      }
    };

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
  };

  window.backend.load(filteringPins, errorHandler);
};
