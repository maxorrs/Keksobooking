'use strict';

(function () {
  var resetFormBtn = document.querySelector('.ad-form__reset');

  var resetForm = function () {
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.setDefaultValueSelect();
  };

  var inactiveMod = function () {
    if (resetFormBtn) {
      window.utilConsts.MAP.classList.add('map--faded');
      window.map.closeAdCard();
      resetForm();
      window.pin.removePin();
    }
  };

  window.reset = {
    inactiveMod: inactiveMod,
    resetFormBtn: resetFormBtn
  };
})();
