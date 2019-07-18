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
      block.classList.add('pin_' + i);
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

  var houseType = document.querySelector('#housing-type'); // селект опшнс

  var sevaData = function (type, array) {
    window.SERVER_DATA = array;

    var filterPin = window.SERVER_DATA.filter(function (objeckt) {
      return objeckt.offer.type === type;
    });
    renderPins(filterPin.slice(0, 5));
  };

  var filteringPins = function (array) {
    renderPins(array.slice(0, 5));

    window.renderShowCard(array);

    houseType.addEventListener('change', function () {
      var mapPins = document.querySelector('.map__pins'); // сюда пишутся пины баттоны
      var mapPin = document.querySelectorAll('.map__pin'); // все пины
      for (var i = 1; i < mapPin.length; i++) {
        mapPins.removeChild(mapPin[i]);
      }

      if (houseType.value === 'any') {
        renderPins(array.slice(0, 5));
        window.renderShowCard(array);
      } else {
        sevaData(houseType.value, array);
        window.renderShowCard(array);
      }
    });
  };

  window.backend.load(filteringPins, errorHandler);
};
