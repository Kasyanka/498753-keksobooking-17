// Файл data.js
'use strict';

window.renderPinsClick = function () {

  // функция создания Pinов но без подтянутых параметров
  var createBlock = function (templ, objeckt) {
    var block = templ.cloneNode(true);
    block.style.left = objeckt.location.x + 'px';
    block.style.top = objeckt.location.y + 'px';
    block.querySelector('img').src = objeckt.author.avatar;
    return block;
  };

  // функция подтягивания параметорв в Pinы (тэмлейт и параметры из массива с сервера)
  var getFragment = function (array) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin')
                  .content
                  .querySelector('.map__pin');
    for (var i = 0; i < array.length; i++) {
      var block = createBlock(template, array[i]);
      fragment.appendChild(block);
    }
    return fragment;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // функция генерации всех Pinов из массива с сервера
  var renderPins = function (array) {
    var blocks = document.querySelector('.map__pins');
    var fragmentPin = getFragment(array);
    blocks.appendChild(fragmentPin);
  };
  window.backend.load(renderPins, errorHandler);

};
