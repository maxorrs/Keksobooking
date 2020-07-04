'use strict';

(function () {

  window.pin.pinMain.addEventListener('mousedown', function (evt) {

    var coordsMap = {
      minX: window.utilConsts.MAP.offsetLeft,
      maxX: window.utilConsts.MAP.offsetLeft + window.utilConsts.MAP.offsetWidth,
      mapWidthMax: 1200,
      mapWidthMin: 0,
      minY: 130,
      maxY: 630
    };

    if (evt.button === window.utilConsts.LEFT_BUTTON_MOUSE) {
      evt.preventDefault();

      var startPosition = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startPosition.x - moveEvt.clientX,
          y: startPosition.y - moveEvt.clientY
        };

        startPosition = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (startPosition.x >= coordsMap.minX && startPosition.x <= coordsMap.maxX) {
          window.pin.pinMain.style.left = (window.pin.pinMain.offsetLeft - shift.x) + 'px';
        } else if (startPosition.x < coordsMap.minX) {
          window.pin.pinMain.style.left = coordsMap.mapWidthMin - window.utilConsts.MAIN_PIN_WIDTH / 2 + 'px';
        } else if (startPosition.x > coordsMap.maxX) {
          window.pin.pinMain.style.left = coordsMap.mapWidthMax - window.utilConsts.MAIN_PIN_WIDTH / 2 + 'px';
        }

        if (startPosition.y >= coordsMap.minY && startPosition.y <= coordsMap.maxY) {
          window.pin.pinMain.style.top = (window.pin.pinMain.offsetTop - shift.y) + 'px';
        } else if (startPosition.y < coordsMap.minY) {
          window.pin.pinMain.style.top = coordsMap.minY + 'px';
        } else if (startPosition.y > coordsMap.maxY) {
          window.pin.pinMain.style.top = coordsMap.maxY + 'px';
        }

        var valueX;
        var valueY;

        if (Math.floor(startPosition.x - coordsMap.minX + window.utilConsts.MAIN_PIN_WIDTH / 2) < coordsMap.mapWidthMin) {
          valueX = coordsMap.mapWidthMin;
        } else if (Math.floor(startPosition.x - coordsMap.minX + window.utilConsts.MAIN_PIN_WIDTH / 2) > coordsMap.mapWidthMax) {
          valueX = coordsMap.mapWidthMax;
        } else {
          valueX = Math.floor(startPosition.x - coordsMap.minX + window.utilConsts.MAIN_PIN_WIDTH / 2);
        }

        if (Math.floor(startPosition.y + window.utilConsts.MAIN_PIN_HEIGHT) < coordsMap.minY) {
          valueY = coordsMap.minY;
        } else if (Math.floor(startPosition.y + window.utilConsts.MAIN_PIN_HEIGHT) > coordsMap.maxY) {
          valueY = coordsMap.maxY;
        } else {
          valueY = Math.floor(startPosition.y + window.utilConsts.MAIN_PIN_HEIGHT);
        }

        window.utilConsts.addressInput.value = valueX + ', ' + valueY;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
