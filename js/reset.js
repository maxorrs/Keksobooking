'use strict';

(function () {
  var resetFormBtn = document.querySelector('.ad-form__reset');

  var inactiveMod = function () {
    if (resetFormBtn) {
      window.utilConsts.MAP.classList.add('map--faded');
      window.map.closeAdCard();
      window.pin.removePin();
      window.filter.formFilters.reset();

      window.form.adForm.classList.add('ad-form--disabled');
      window.form.adForm.reset();
      window.form.setDefaultValueSelect();

      window.filter.formFilters.removeEventListener('change', window.filter.onFilterChange);
    }
  };

  window.reset = {
    inactiveMod: inactiveMod,
    resetFormBtn: resetFormBtn
  };
})();
