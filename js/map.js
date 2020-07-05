'use strict';

(function () {

  window.pin.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.utilConsts.LEFT_BUTTON_MOUSE) {
      window.main.activeModeOn();
    }
  });

  window.pin.pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utilConsts.KEY_CODE_ENTER) {
      window.main.activeModeOn();
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

  window.map = {
    onCardEscPress: onCardEscPress,
    onCardCloseButton: onCardCloseButton
  };
})();
