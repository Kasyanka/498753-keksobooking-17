// Файл data.js
'use strict';

(function () {
// 8 объявлений со случайными параметрами появляются на карте
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ALT_TEXT = ['объявление-1', 'объявление-2', 'объявление-3'];
  var SUM_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];

  // функция генерирования случайных чисел для координат "х" и "у" у всех Pinов
  var randomSearch = function (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  };

  // функция генерирования случайного индекса у массива чтобы выбрать случайное значение массива для выбора параметра text и тип у всех Pinов
  var generates = function (array) {
    var variableRandom = Math.floor(Math.random() * array.length);
    var variableArray = array[variableRandom];
    return variableArray;
  };

  // функция выбора случайного но не повторяющегося значения вмассиве для аватарок у всех Pinов
  var getRandomElement = function (array) {
    var element = generates(array);
    var index = array.indexOf(element);
    array.splice(index, 1);
    return element;
  };

  // функция генерирования параметров для всех Pinов
  var generatPinData = function (n) {
    var ads = [];

    for (var i = 0; i < n; i++) {
      var ad = {
        'author': {
          'avatar': 'img/avatars/user' + '0' + getRandomElement(SUM_AVATAR) + '.png'},
        'offer': {
          'type': generates(TYPE)},
        'location': {
          'x': randomSearch(0, 1200),
          'y': randomSearch(130, 630)},
        'alt': {
          'text': generates(ALT_TEXT),
        }
      };
      ads.push(ad);
    }
    return ads;
  };

  // функция создания Pinов но без подтянутых параметров
  var createBlock = function (templ, objeckt) {
    var block = templ.cloneNode(true);
    block.style.left = objeckt.location.x + 'px';
    block.style.top = objeckt.location.y + 'px';
    block.querySelector('img').src = objeckt.author.avatar;
    block.querySelector('img').alt = objeckt.alt.text;
    return block;
  };

  // функция подтягивания параметорв в Pinы (тэмлейт и параметры из ф-ции generatPinData. n - количество пинов)
  var getFragment = function (n) {
    var fragment = document.createDocumentFragment();
    var pinData = generatPinData(n); // массив из 8 объектов с разными параметрами для Pin
    var template = document.querySelector('#pin')
                  .content
                  .querySelector('.map__pin');
    for (var i = 0; i < n; i++) {
      var block = createBlock(template, pinData[i]);
      fragment.appendChild(block);
    }
    return fragment;
  };

  // функция генерации 8 Pinов
  window.renderPins = function (pinCount) {
    var blocks = document.querySelector('.map__pins');
    var fragmentPin = getFragment(pinCount);
    blocks.appendChild(fragmentPin);
  };
})();
