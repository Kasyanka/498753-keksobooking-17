// Файл form.js
'use strict';

(function () {
// функция деактевации формы (ничего нельзя в форму забить)
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

  // функция активации формы (все поля доступны для рекдактирования) срабатывает в функции activateForm
  var single = false;
  var onClickActivate = function () {
    if (!single) {
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
    }
    single = true;
  };

  // функция активации формы при сдвиге главной метки
  var activateForm = function () {
    var activate = document.querySelector('.map__pin--main');
    activate.addEventListener('mousedown', onClickActivate);
  };
  activateForm();

  // настройки прайса
  var settingPlaceholder = function () {
    var select = document.querySelector('#type');
    var price = document.querySelector('#price');

    select.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (select.selectedIndex === 0) {
        price.setAttribute('min', '0');
        price.placeholder = 0;
      }
      if (select.selectedIndex === 1) {
        price.setAttribute('min', '1000');
        price.placeholder = 1000;
      }
      if (select.selectedIndex === 2) {
        price.setAttribute('min', '5000');
        price.placeholder = 5000;
      }
      if (select.selectedIndex === 3) {
        price.setAttribute('min', '10000');
        price.placeholder = 10000;
      }
    });
  };
  settingPlaceholder();
  // настройки времени заезда и выезда
  var settingTime = function () {
    var selectTimeIn = document.querySelector('#timein');
    var selectTimeOut = document.querySelector('#timeout');

    selectTimeIn.addEventListener('click', function () {
      if (selectTimeIn.selectedIndex === 0) {
        selectTimeOut.selectedIndex = 0;
      }
      if (selectTimeIn.selectedIndex === 1) {
        selectTimeOut.selectedIndex = 1;
      }
      if (selectTimeIn.selectedIndex === 2) {
        selectTimeOut.selectedIndex = 2;
      }
    });
    selectTimeOut.addEventListener('click', function () {
      if (selectTimeOut.selectedIndex === 0) {
        selectTimeIn.selectedIndex = 0;
      }
      if (selectTimeOut.selectedIndex === 1) {
        selectTimeIn.selectedIndex = 1;
      }
      if (selectTimeOut.selectedIndex === 2) {
        selectTimeIn.selectedIndex = 2;
      }
    });
  };
  settingTime();
  // настройки кол-ва комнат и кол-ва гостей
  var settingRoomNumber = function () {
    var selectRoomNumber = document.querySelector('#room_number'); // первый инпут команты
    var selectCapacity = document.querySelector('#capacity'); // второй инпут гости

    selectRoomNumber.addEventListener('click', function () {

      selectCapacity.options[0].style.display = selectRoomNumber.selectedIndex === 3 ? 'none' : 'block';
      selectCapacity.options[1].style.display = selectRoomNumber.selectedIndex === 0 ? 'none' : selectCapacity.options[1].style.display = selectRoomNumber.selectedIndex === 3 ? 'none' : 'block';
      selectCapacity.options[2].style.display = selectRoomNumber.selectedIndex === 2 ? 'block' : 'none';
      selectCapacity.options[3].style.display = selectRoomNumber.selectedIndex === 3 ? 'block' : 'none';

      if (selectRoomNumber.selectedIndex === 0 || selectRoomNumber.selectedIndex === 1 || selectRoomNumber.selectedIndex === 2) {
        selectCapacity.options[0].setAttribute('selected', 'selected');
        selectCapacity.options[3].removeAttribute('selected');
      }
      if (selectRoomNumber.selectedIndex === 3) {
        selectCapacity.options[0].removeAttribute('selected');
        selectCapacity.options[3].setAttribute('selected', 'selected');
      }
      if (selectRoomNumber.selectedIndex === 0) {
        selectCapacity.value = '1';
      }
      if (selectRoomNumber.selectedIndex === 1) {
        selectCapacity.value = '2';
      }
    });
  };
  settingRoomNumber();
})();
