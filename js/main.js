'use strict';
var special = document.querySelector('.map');
special.classList.remove('map--faded');

var randomSearch = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

var type = ['palace', 'flat', 'house', 'bungalo'];
var altText = ['объявление-1', 'объявление-2', 'объявление-3'];

var generates = function (array) { // case
  var variableRandom = Math.floor(Math.random() * array.length);
  var variableArray = array[variableRandom];
  return variableArray;
};

var ads = [];

for (var i = 0; i < 8; i++) {
  var ad = {
    'author': {
      'avatar': 'img/avatars/user' + 0 + randomSearch(1, 8) + '.png'},
    'offer': {
      'type': generates(type)},
    'location': {
      'x': randomSearch(0, 1200),
      'y': randomSearch(130, 630)},
    'alt': {
      'text': generates(altText),
    }
  };
  ads.push(ad);
}

var blocks = document.querySelector('.map__pins');
var template = document.querySelector('#pin')
.content
.querySelector('.map__pin');

for (i = 0; i < 8; i++) {
  var block = template.cloneNode(true);
  block.style.left = ads[i].location.x;
  block.style.top = ads[i].location.y;
  block.querySelector('img').src = ads[i].author.avatar;
  block.querySelector('img').alt = ads[i].alt.text;
  blocks.appendChild(block);
}
