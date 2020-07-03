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

  for (var i = 0; i < window.data.mocks.length; i++) {
    pinsFragment.appendChild(renderPin(window.data.mocks[i]));
  }

  for (var v = 0; v < window.data.mocks.length; v++) {
    pinsFragment.children[v].dataset.id = v;
  }

  window.pin = {
    pins: pins,
    pinsFragment: pinsFragment,
    renderPin: renderPin,
    pinMain: pinMain
  };
})();
