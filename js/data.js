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
  var housingPrice = document.querySelector('#housing-price'); // селект цена
  var housingRoom = document.querySelector('#housing-rooms'); // селект цена
  var housingQuest = document.querySelector('#housing-guests'); // селект цена

  var filteringType = function (type, room, array) {
    window.SERVER_DATA = array;

    var filterPinType = window.SERVER_DATA.filter(function (objeckt) {
      return objeckt.offer.type === type;
    });

    console.log(filterPinType)

    var filterPinRooms = filterPinType.filter(function (objeckt) {
      return objeckt.offer.rooms === room;
    });

    console.log(room)

    console.log(filterPinRooms)

    renderPins(filterPinRooms.slice(0, 5));
    window.renderShowCard(filterPinRooms.slice(0, 5));
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
      if (housingType.value === 'any' && housingPrice.value === 'any' && housingRoom.value === 'any' && housingQuest.value === 'any') {
        renderPins(array.slice(0, 5));
        window.renderShowCard(array);
      } else {
        filteringType(housingType.value, housingRoom.value, array);
      }
    };

    housingType.addEventListener('change', onChangeFilterAll);
    housingRoom.addEventListener('change', onChangeFilterAll);
  };

  window.backend.load(filteringPins, errorHandler);
};
