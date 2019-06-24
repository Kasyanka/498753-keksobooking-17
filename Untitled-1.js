var renderPins = function (pinCount) {
  // var special = document.querySelector('.map');
  // special.classList.remove('map--faded');
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
// console.log(adFormInput);
};
deactivationInput();

var activateForm = function () {
  var activate = document.querySelector('.map__pin--main');
  activate.addEventListener('click', function () {
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
      adFormSelect[i].removeAttribute('disabled', 'disabled');
    }

    var adFormFieldset = document.querySelectorAll('.ad-form .ad-form__element--wide');
    for (i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].removeAttribute('disabled', 'disabled');
    }
    renderPins(8);
  });
};
activateForm();

var address = document.querySelector('#address');
var pinMainLeft = document.querySelector('.map__pin--main').style.left;
address.setAttribute('value', pinMainLeft);
