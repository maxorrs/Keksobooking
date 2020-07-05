'use strict';

(function () {
  window.utilConsts.addressInput.value = Math.floor(window.pin.pinMain.offsetLeft + window.utilConsts.MAIN_PIN_CIRCLE / 2) + ', ' + Math.floor(window.pin.pinMain.offsetTop + window.utilConsts.MAIN_PIN_CIRCLE / 2);
  window.form.setDefaultValueSelect();

  var successHandler = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.pin.addPin(data[i]);
      window.pin.pinsFragment.children[i].dataset.id = i;
    }

    window.pin.pins.appendChild(window.pin.pinsFragment);

    window.pin.pins.addEventListener('click', function (evt) {
      var pinSelected = evt.target.closest('.map__pin:not(.map__pin--main)');

      if (pinSelected) {
        window.pin.pins.after(window.card.renderCard(data[pinSelected.dataset.id]));
        document.addEventListener('keydown', window.map.onCardEscPress);
        document.querySelector('.popup__close').addEventListener('click', window.map.onCardCloseButton);
      }
    });
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

  var isActiveMode = true;

  var activeModeOn = function () {
    if (isActiveMode) {
      window.load(successHandler, errorHandler);
      window.utilConsts.MAP.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');

      isActiveMode = false;
    }
  };

  window.main = {
    activeModeOn: activeModeOn,
    isActiveMode: isActiveMode
  };
})();
