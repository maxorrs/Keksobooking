'use strict';

(function () {
  window.consts.addressInput.value = Math.floor(window.pin.pinMain.offsetLeft + window.consts.MAIN_PIN_CIRCLE / 2) + ', ' + Math.floor(window.pin.pinMain.offsetTop + window.consts.MAIN_PIN_CIRCLE / 2);
  window.form.setDefaultValueSelect();
})();
