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

  var removePin = function () {
    var pinsForRemove = pins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsForRemove.length; i++) {
      pinsForRemove[i].remove();
    }
  };

  window.pin = {
    pins: pins,
    pinsFragment: pinsFragment,
    renderPin: renderPin,
    pinMain: pinMain,
    addPin: addPin,
    removePin: removePin
  };
})();
