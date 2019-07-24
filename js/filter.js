'use strict';
window.filteringPins = function (array) {
  var houseType = document.querySelector('#housing-type'); // селект опшнс

  window.renderPins(array.slice(0, 5));
  window.renderShowCard(array);

  houseType.addEventListener('change', function () {
    var mapPins = document.querySelector('.map__pins'); // сюда пишутся пины баттоны
    var mapPin = document.querySelectorAll('.map__pin'); // все пины

    // убираем все пины с карты кроме главного
    for (var i = 1; i < mapPin.length; i++) {
      mapPins.removeChild(mapPin[i]);
    }
    window.closeCard();
    if (houseType.value === 'any') {
      window.renderPins(array.slice(0, 5));
      window.renderShowCard(array);
    } else {
      window.saveData(houseType.value, array);
    }
  });
};
