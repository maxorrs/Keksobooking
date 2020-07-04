'use strict';

(function () {
  window.utilConsts.addressInput.value = Math.floor(window.pin.pinMain.offsetLeft + window.utilConsts.MAIN_PIN_CIRCLE / 2) + ', ' + Math.floor(window.pin.pinMain.offsetTop + window.utilConsts.MAIN_PIN_CIRCLE / 2);
  window.form.setDefaultValueSelect();
})();
