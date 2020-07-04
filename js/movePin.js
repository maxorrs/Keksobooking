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

      // console.log(startPosition.x);
      // console.log(startPosition.y);

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

        // window.pin.pinMain.style.top = (window.pin.pinMain.offsetTop - shift.y) + 'px';
        // window.pin.pinMain.style.left = (window.pin.pinMain.offsetLeft - shift.x) + 'px';

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
