'use strict';

(function () {
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

  var isActiveMode = true;

  var activeModeOn = function () {
    if (isActiveMode) {
      window.load(window.utilConsts.URL_GET_DATA, 'GET', successHandler, window.errorHandler.errorHandler);
      window.utilConsts.MAP.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');

      isActiveMode = false;
    }
  };

  window.reset.resetFormBtn.addEventListener('click', function (evt) {
    window.reset.inactiveMod(evt);
    isActiveMode = true;
  });

  window.form.adForm.addEventListener('submit', function (evt) {
    window.form.submitHandler(evt);
    isActiveMode = true;
  });

  window.main = {
    activeModeOn: activeModeOn,
    isActiveMode: isActiveMode
  };
})();
