'use strict';

(function () {
  var originalData = [];

  window.form.setDefaultValueSelect();
  window.form.toggleActiveFieldsets(true);

  var successHandler = function (data) {
    for (var i = 0; i < window.utilConsts.MAX_COUNT_PINS; i++) {
      window.pin.addPin(data[i]);
      window.pin.pinsFragment.children[i].dataset.id = i;
      originalData.push(data[i]);
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

    window.filter.housingTypeInput.addEventListener('change', function () {
      window.filter.filteringByHousingType(window.filter.housingTypeInput.value);
    });
  };

  var isActiveMode = true;

  var activeModeOn = function () {
    if (isActiveMode) {
      window.load(window.utilConsts.URL_GET_DATA, 'GET', successHandler, window.errorHandler.errorHandler);
      window.utilConsts.MAP.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.form.toggleActiveFieldsets(false);

      isActiveMode = false;
    }
  };

  window.reset.resetFormBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.reset.inactiveMod(evt);
    isActiveMode = true;
  });

  window.form.adForm.addEventListener('submit', function (evt) {
    window.form.submitHandler(evt);
    isActiveMode = true;
  });

  window.main = {
    activeModeOn: activeModeOn,
    isActiveMode: isActiveMode,
    originalData: originalData
  };
})();
