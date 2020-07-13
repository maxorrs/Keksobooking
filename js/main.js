'use strict';

(function () {
  var originalData = [];

  window.form.setDefaultValueSelect();

  window.form.toggleActiveFieldsets(true);
  window.filter.toggleActiveFilters(true);

  var successHandler = function (data) {
    for (var i = 0; i < data.length; i++) {
      originalData.push(data[i]);
      originalData[i].id = i;
      originalData[i].offer.priceGradation = window.filter.translatePrice(originalData[i].offer.price);
    }

    for (var j = 0; j < window.utilConsts.MAX_COUNT_PINS; j++) {
      window.pin.addPin(originalData[j]);
      window.pin.pinsFragment.children[j].dataset.id = originalData[j].id;
    }
    window.pin.pins.appendChild(window.pin.pinsFragment);

    window.pin.pins.addEventListener('click', function (evt) {
      var pinSelected = evt.target.closest('.map__pin:not(.map__pin--main)');

      if (pinSelected) {
        window.pin.pins.after(window.card.renderCard(originalData[pinSelected.dataset.id]));
        window.pin.removeActiveClassFromPins();
        pinSelected.classList.add('map__pin--active');
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

      window.form.toggleActiveFieldsets(false);
      window.filter.toggleActiveFilters(false);

      window.filter.formFilters.addEventListener('change', window.filter.onFilterChange);

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


  window.uploadPhoto.setPhoto(window.form.fileChooserAvatar, window.form.previewAvatar);
  window.uploadPhoto.setPhoto(window.form.fileChooserPhotoAd, window.form.previewPhotoAd);


  window.main = {
    activeModeOn: activeModeOn,
    isActiveMode: isActiveMode,
    originalData: originalData
  };
})();
