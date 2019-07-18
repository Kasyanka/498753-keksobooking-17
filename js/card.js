'use strict';
window.renderShowCard = function (data) {

  var getCard = function (n) {
    // var array = window.SERVER_DATA;
    // console.log(data)
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#card')
                  .content
                  .querySelector('.map__card');
    var element = template.cloneNode(true);
    element.classList.add('www');
    var title = element.querySelector('.popup__title');

    title.textContent = data[n].offer.title;

    fragment.appendChild(element);
    return fragment;
  };

  var showCard = function () {
    var map = document.querySelector('.map');
    var block = document.querySelector('.map__filters-container');
    var mapPinAll = document.querySelectorAll('.pin_all');
    for (var i = 0; i < mapPinAll.length; i++) {
      var j = i;
      mapPinAll[i].addEventListener('click', function () {
        console.log(j)
        map.insertBefore(getCard(j), block);
      });
    }
  };
  showCard();
};

