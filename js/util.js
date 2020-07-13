'use strict';

(function () {
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var declensionWord = function (number, word) {
    var cases = [2, 0, 1, 1, 1, 2];
    return word[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  window.util = {
    getRandomIntInclusive: getRandomIntInclusive,
    declensionWord: declensionWord
  };
})();
