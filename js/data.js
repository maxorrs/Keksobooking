'use strict';

(function () {
  var creationMock = function (arr) {
    for (var i = 0; i < window.consts.COUNT_ADS; i++) {
      arr.push(
          {
            'author': {
              'avatar': 'img/avatars/user0' + (i + 1) + '.png'
            },
            'offer': {
              'title': 'Заголовок объявления',
              'address': window.util.getRandomIntInclusive(0, window.consts.MAP.offsetWidth) + ', ' + window.util.getRandomIntInclusive(window.consts.HEIGHT_Y_MIN, window.consts.HEIGHT_Y_MAX),
              'price': window.util.getRandomIntInclusive(window.consts.PRICE_MIN, window.consts.PRICE_MAX),
              'type': window.consts.TYPES[window.util.getRandomIntInclusive(0, window.consts.TYPES.length - 1)],
              'rooms': window.util.getRandomIntInclusive(window.consts.ROOMS_MIN, window.consts.ROOMS_MAX),
              'guests': window.util.getRandomIntInclusive(window.consts.GUESTS_MIN, window.consts.GUESTS_MAX),
              'checkin': window.consts.TIMES[window.util.getRandomIntInclusive(0, window.consts.TIMES.length - 1)],
              'checkout': window.consts.TIMES[window.util.getRandomIntInclusive(0, window.consts.TIMES.length - 1)],
              'features': window.consts.FEATURES,
              'description': 'Описание объявления',
              'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
            },
            'location': {
              'x': window.util.getRandomIntInclusive(0, window.consts.MAP.offsetWidth) + window.consts.PIN_WIDTH / 2,
              'y': window.util.getRandomIntInclusive(window.consts.HEIGHT_Y_MIN, window.consts.HEIGHT_Y_MAX) + window.consts.PIN_HEIGHT
            }
          }
      );
    }
  };

  var mocks = [];
  creationMock(mocks);

  window.data = {
    mocks: mocks
  };

})();
