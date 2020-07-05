'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var pins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var pinsFragment = document.createDocumentFragment();

  var renderPin = function (item) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = item.location.x + 'px';
    pin.style.top = item.location.y + 'px';

    pin.querySelector('img').src = item.author.avatar;
    pin.querySelector('img').alt = item.offer.title;

    return pin;
  };

  var addPin = function (itemData) {
    pinsFragment.appendChild(renderPin(itemData));
  };

  window.pin = {
    pins: pins,
    pinsFragment: pinsFragment,
    renderPin: renderPin,
    pinMain: pinMain,
    addPin: addPin
  };
})();
