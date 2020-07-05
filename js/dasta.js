'use strict';

(function () {
  var creationMock = function (arr) {
    for (var i = 0; i < window.utilConsts.COUNT_ADS; i++) {
      arr.push(
          {
            'author': {
              'avatar': 'img/avatars/user0' + (i + 1) + '.png'
            },
            'offer': {
              'title': 'Заголовок объявления',
              'address': window.util.getRandomIntInclusive(0, window.utilConsts.MAP.offsetWidth) + ', ' + window.util.getRandomIntInclusive(window.utilConsts.HEIGHT_Y_MIN, window.utilConsts.HEIGHT_Y_MAX),
              'price': window.util.getRandomIntInclusive(window.utilConsts.PRICE_MIN, window.utilConsts.PRICE_MAX),
              'type': window.utilConsts.TYPES[window.util.getRandomIntInclusive(0, window.utilConsts.TYPES.length - 1)],
              'rooms': window.util.getRandomIntInclusive(window.utilConsts.ROOMS_MIN, window.utilConsts.ROOMS_MAX),
              'guests': window.util.getRandomIntInclusive(window.utilConsts.GUESTS_MIN, window.utilConsts.GUESTS_MAX),
              'checkin': window.utilConsts.TIMES[window.util.getRandomIntInclusive(0, window.utilConsts.TIMES.length - 1)],
              'checkout': window.utilConsts.TIMES[window.util.getRandomIntInclusive(0, window.utilConsts.TIMES.length - 1)],
              'features': window.utilConsts.FEATURES,
              'description': 'Описание объявления',
              'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
            },
            'location': {
              'x': window.util.getRandomIntInclusive(0, window.utilConsts.MAP.offsetWidth) + window.utilConsts.PIN_WIDTH / 2,
              'y': window.util.getRandomIntInclusive(window.utilConsts.HEIGHT_Y_MIN, window.utilConsts.HEIGHT_Y_MAX) + window.utilConsts.PIN_HEIGHT
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
