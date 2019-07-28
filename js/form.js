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
    var buttonSubmit = document.querySelector('.ad-form__submit');
    buttonSubmit.disabled = true;
  };
  deactivationInput();

  // функция активации формы (все поля доступны для рекдактирования) срабатывает в функции activateForm
  window.singleFormActivation = false;
  var onClickActivateForm = function () {
    if (!window.singleFormActivation) {
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

      var buttonSubmit = document.querySelector('.ad-form__submit');
      buttonSubmit.disabled = false;
    }
    window.singleFormActivation = true;
  };

  // функция активации формы при сдвиге главной метки
  var activateForm = function () {
    var activate = document.querySelector('.map__pin--main');
    activate.addEventListener('mousedown', onClickActivateForm);
  };
  activateForm();

  // функция активации формы при ентере главной метки
  var activatePinKeydownForm = function () {
    var activate = document.querySelector('.map__pin--main');
    activate.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_BUTTON) {
        onClickActivateForm();
      }
    });
  };
  activatePinKeydownForm();


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

  var resetForm = function () {
    var title = document.querySelector('#title');
    var type = document.querySelector('#type');
    var price = document.querySelector('#price');
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    var description = document.querySelector('#description');
    var timein = document.querySelector('#timein');
    var timeout = document.querySelector('#timeout');
    var wifi = document.querySelector('#feature-wifi');
    var dishwasher = document.querySelector('#feature-dishwasher');
    var parking = document.querySelector('#feature-parking');
    var washer = document.querySelector('#feature-washer');
    var elevator = document.querySelector('#feature-elevator');
    var conditioner = document.querySelector('#feature-conditioner');
    var address = document.querySelector('#address');
    var mapPinMain = document.querySelector('.map__pin--main');

    title.value = '';
    type.value = 'flat';
    price.value = 1000;
    price.value = '';
    roomNumber.value = 1;
    capacity.value = 1;
    description.value = '';
    timein.value = '12:00';
    timeout.value = '12:00';
    wifi.checked = false;
    dishwasher.checked = false;
    parking.checked = false;
    washer.checked = false;
    elevator.checked = false;
    conditioner.checked = false;
    address.value = '';

    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
  };

  var adFormReset = document.querySelector('.ad-form__reset');
  adFormReset.addEventListener('click', function () {
    resetForm();
  });

  var onDeactivationAll = function () {

    var special = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins'); // сюда пишутся пины баттоны
    var mapPin = document.querySelectorAll('.map__pin'); // все пины

    var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    adForm.appendChild(successElement);

    var activateFormPin = function () {
      adForm.removeChild(successMessage);
      window.single = false;
      window.activatePin();
      window.singleFormActivation = false;
      activateForm();
      activatePinKeydownForm();
    };

    var successMessage = document.querySelector('.success');
    successMessage.addEventListener('click', function () {
      activateFormPin();
    });

    var onKeydownSuccessMessage = function (evt) {
      if (evt.keyCode === window.ESC_BUTTON) {
        activateFormPin();
        document.removeEventListener('keydown', onKeydownSuccessMessage);
      }
    };
    document.addEventListener('keydown', onKeydownSuccessMessage);

    // убираем все пины с карты кроме главного
    for (var i = 1; i < mapPin.length; i++) {
      mapPins.removeChild(mapPin[i]);
    }
    adForm.classList.add('ad-form--disabled');
    special.classList.add('map--faded');

    deactivationInput();
    window.closeCard();
    resetForm();
  };
  var onErrorHandler = function (Message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = Message;
    main.appendChild(errorElement);

    var errorButton = document.querySelector('.error__button');
    var buttonSubmit = document.querySelector('.ad-form__submit');
    errorButton.addEventListener('click', function () {
      main.removeChild(errorElement);
      buttonSubmit.disabled = false;
    });

    errorElement.addEventListener('click', function () {
      main.removeChild(errorElement);
      buttonSubmit.disabled = false;
    });

    var onKeydownErorMessage = function (evt) {
      if (evt.keyCode === window.ESC_BUTTON) {
        main.removeChild(errorElement);
        buttonSubmit.disabled = false;
        document.removeEventListener('keydown', onKeydownErorMessage);
      }
    };
    document.addEventListener('keydown', onKeydownErorMessage);
  };

  // document.body.insertAdjacentElement('afterbegin', node);

  var adForm = document.querySelector('.ad-form');
  var buttonSubmit = document.querySelector('.ad-form__submit');

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onDeactivationAll, onErrorHandler);
    evt.preventDefault();
    buttonSubmit.disabled = true;
  });

})();
