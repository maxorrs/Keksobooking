'use strict';

(function () {

  var activeModeOn = function () {
    window.utilConsts.MAP.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.pin.pins.appendChild(window.pin.pinsFragment);
    window.utilConsts.addressInput.value = Math.floor(window.pin.pinMain.offsetLeft + window.utilConsts.MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(window.pin.pinMain.offsetTop + window.utilConsts.MAIN_PIN_HEIGHT);
  };

  window.pin.pins.addEventListener('click', function (evt) {
    window.map.openAdCard(evt);
  });

  window.pin.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.utilConsts.LEFT_BUTTON_MOUSE) {
      activeModeOn();
    }
  });

  window.pin.pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utilConsts.KEY_CODE_ENTER) {
      activeModeOn();
    }
  });

  var closeAdCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', onCardEscPress);
      if (document.querySelector('.popup__close')) {
        document.querySelector('.popup__close').removeEventListener('click', onCardCloseButton);
      }
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.utilConsts.KEY_CODE_ESC) {
      evt.preventDefault();
      closeAdCard();
    }
  };

  var onCardCloseButton = function () {
    closeAdCard();
  };

  var openAdCard = function (evt) {
    var pinSelected = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pinSelected) {
      window.pin.pins.after(window.card.renderCard(window.data.mocks[pinSelected.dataset.id]));
      document.addEventListener('keydown', onCardEscPress);
      document.querySelector('.popup__close').addEventListener('click', onCardCloseButton);
    }
  };

  window.map = {
    activeModeOn: activeModeOn,
    openAdCard: openAdCard
  };
})();
