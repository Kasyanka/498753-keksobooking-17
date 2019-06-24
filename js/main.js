'use strict';
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ALT_TEXT = ['объявление-1', 'объявление-2', 'объявление-3'];
var SUM_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
var PINS_COUNT = 8;

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

var renderPins = function (pinCount) {
  var blocks = document.querySelector('.map__pins');
  var fragmentPin = getFragment(pinCount);
  blocks.appendChild(fragmentPin);
};

var deactivationInput = function () {
  var adFormInput = document.querySelectorAll('.ad-form input');
  for (var i = 0; i < adFormInput.length; i++) {
    adFormInput[i].setAttribute('disabled', 'disabled');
  }
  var adFormSelect = document.querySelectorAll('.ad-form select');
  for (i = 0; i < adFormSelect.length; i++) {
    adFormSelect[i].setAttribute('disabled', 'disabled');
  }
  var adFormFieldset = document.querySelectorAll('.ad-form .ad-form__element--wide');
  for (i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].setAttribute('disabled', 'disabled');
  }
};
deactivationInput();

var onClickActivate = function () {
  var adForm = document.querySelector('.ad-form');
  var special = document.querySelector('.map');
  adForm.classList.remove('ad-form--disabled');
  special.classList.remove('map--faded');

  var adFormInput = document.querySelectorAll('.ad-form input');
  for (var i = 0; i < adFormInput.length; i++) {
    adFormInput[i].removeAttribute('disabled');
  }

  var adFormSelect = document.querySelectorAll('.ad-form select');
  for (i = 0; i < adFormSelect.length; i++) {
    adFormSelect[i].removeAttribute('disabled');
  }

  var adFormFieldset = document.querySelectorAll('.ad-form .ad-form__element--wide');
  for (i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].removeAttribute('disabled');
  }
  renderPins(PINS_COUNT);
};

var activateForm = function () {
  var activate = document.querySelector('.map__pin--main');
  activate.addEventListener('click', onClickActivate);
};
activateForm();

var address = document.querySelector('#address');
var pinMainLeft = document.querySelector('.map__pin--main').style.left;
var pinMainTop = document.querySelector('.map__pin--main').style.top;
address.setAttribute('value', pinMainLeft + ', ' + pinMainTop);
