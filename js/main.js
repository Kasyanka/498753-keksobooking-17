'use strict';
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ALT_TEXT = ['объявление-1', 'объявление-2', 'объявление-3'];
var SUM_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8]

var randomSearch = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

var generates = function (array) {
  var variableRandom = Math.floor(Math.random() * array.length);
  var variableArray = array[variableRandom];
  return variableArray;
};

var getRandomElement = function (array) {
  var element = generates(array);
  var index = array.indexOf(element);
  array.splice(index, 1);
  return element;
};

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


var createBlock = function (templ, objeckt) {
  var block = templ.cloneNode(true);
  block.style.left = objeckt.location.x + 'px';
  block.style.top = objeckt.location.y + 'px';
  block.querySelector('img').src = objeckt.author.avatar;
  block.querySelector('img').alt = objeckt.alt.text;
  return block;
};


var renderPins = function (n) {
  var special = document.querySelector('.map');
  special.classList.remove('map--faded');

  var blocks = document.querySelector('.map__pins');
  var template = document.querySelector('#pin')
.content
.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var pinData = generatPinData(8); // массив из 8 объектов с разными параметрами для Pin
  for (var i = 0; i < n; i++) {
    var block = createBlock(template, pinData[i]);
    fragment.appendChild(block);
  }

  blocks.appendChild(fragment);

};
renderPins(8);
