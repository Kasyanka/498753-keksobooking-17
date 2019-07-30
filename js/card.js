'use strict';
(function () {
  window.renderShowCard = function (data) {

  // функция создания карт с данными с сервера и навешиваением обработчиков (не открывает карту а создает)
    var getCard = function (n) {
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#card')
                  .content
                  .querySelector('.map__card');
      var element = template.cloneNode(true);

      var title = element.querySelector('.popup__title');
      var address = element.querySelector('.popup__text--address');
      var price = element.querySelector('.popup__text--price');
      var type = element.querySelector('.popup__type');
      var capacity = element.querySelector('.popup__text--capacity');
      var time = element.querySelector('.popup__text--time');
      var features = element.querySelector('.popup__features');
      var wifi = features.querySelector('.popup__feature--wifi');
      var dishwasher = features.querySelector('.popup__feature--dishwasher');
      var parking = features.querySelector('.popup__feature--parking');
      var washer = features.querySelector('.popup__feature--washer');
      var elevator = features.querySelector('.popup__feature--elevator');
      var conditioner = features.querySelector('.popup__feature--conditioner');
      var description = element.querySelector('.popup__description');
      var avatar = element.querySelector('.popup__avatar');
      var photoBlock = element.querySelector('.popup__photos');
      var photoImg = element.querySelector('.popup__photo');
      var popupClose = element.querySelector('.popup__close');

      title.textContent = data[n].offer.title;
      address.textContent = data[n].offer.address;
      price.textContent = data[n].offer.price + '₽/ночь';
      type.textContent = data[n].offer.type;
      capacity.textContent = data[n].offer.rooms + ' комнаты для ' + data[n].offer.guests + ' гостей';
      time.textContent = 'Заезд после ' + data[n].offer.checkin + ', ' + 'выезд до ' + data[n].offer.checkout;
      description.textContent = data[n].offer.description;
      avatar.src = data[n].author.avatar;

      var renerType = function (english, russian) {
        if (data[n].offer.type.indexOf(english) !== -1) {
          type.textContent = russian;
        }
      };
      renerType('palace', 'Дворец');
      renerType('flat', 'Квартира');
      renerType('house', 'Дом');
      renerType('bungalo', 'Бунгало');

      var photosSum = data[n].offer.photos;
      for (var i = 0; i < photosSum.length; i++) {
        var newImg = photoImg.cloneNode(true);
        photoBlock.appendChild(newImg);
        newImg.src = data[n].offer.photos[i];
      }
      photoBlock.removeChild(photoImg);

      var renderFeatures = function (nameFeatures, domElement) {
        if (data[n].offer.features.indexOf(nameFeatures) === -1) {
          features.removeChild(domElement);
        }
      };
      renderFeatures('wifi', wifi);
      renderFeatures('dishwasher', dishwasher);
      renderFeatures('parking', parking);
      renderFeatures('washer', washer);
      renderFeatures('elevator', elevator);
      renderFeatures('conditioner', conditioner);

      // обработчик клика по кнопке закрытия в карте
      popupClose.addEventListener('click', function () {
        window.closeCard();
      });

      // отктываем карту
      fragment.appendChild(element);
      return fragment;
    };

    // функция закрытия карты пина
    var map = document.querySelector('.map');

    window.closeCard = function () {
      var templateCard = document.querySelector('.map__card');
      if (templateCard) {
        map.removeChild(templateCard);
      }
    };

    // функция открытия карты пина
    var showCard = function () {
      var block = document.querySelector('.map__filters-container');
      var mapPinAll = document.querySelectorAll('.pin_all');

      // навешиваем обработчики клика откртыия карты на все пины
      for (var i = 0; i < mapPinAll.length; i++) {
        (function (j) {
          mapPinAll[j].addEventListener('click', function () {
          // удаляем карту если она есть открытая
            window.closeCard();
            // открываем другую карту
            map.insertBefore(getCard(j), block);
            // обработчик закрытия карты при эскейпе
            document.addEventListener('keydown', function (evt) {
              if (evt.keyCode === window.ESC_BUTTON) {
                window.closeCard();
              }
            });
          });
        })(i);
      }
    };
    showCard();
  };
})();
