'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var COUNT_ADS = 8;
var PRICE_MIN = 1000;
var PRICE_MAX = 100000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 3;
var GUESTS_MIN = 1;
var GUESTS_MAX = 3;
var HEIGHT_Y_MIN = 130;
var HEIGHT_Y_MAX = 630;
var mocks = [];

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var creationMock = function (arr) {
  for (var i = 0; i < COUNT_ADS; i++) {
    arr.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': 'Заголовок объявления',
            'address': getRandomIntInclusive(0, map.offsetWidth) + ', ' + getRandomIntInclusive(HEIGHT_Y_MIN, HEIGHT_Y_MAX),
            'price': getRandomIntInclusive(PRICE_MIN, PRICE_MAX),
            'type': TYPES[getRandomIntInclusive(0, TYPES.length - 1)],
            'rooms': getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX),
            'guests': getRandomIntInclusive(GUESTS_MIN, GUESTS_MAX),
            'checkin': TIMES[getRandomIntInclusive(0, TIMES.length - 1)],
            'checkout': TIMES[getRandomIntInclusive(0, TIMES.length - 1)],
            'features': FEATURES,
            'description': 'Описание объявления',
            'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
          },
          'location': {
            'x': getRandomIntInclusive(0, map.offsetWidth) + PIN_WIDTH,
            'y': getRandomIntInclusive(HEIGHT_Y_MIN, HEIGHT_Y_MAX) + PIN_HEIGHT
          }
        }
    );
  }
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

creationMock(mocks);

var pins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var pinsFragment = document.createDocumentFragment();

var renderPin = function (item) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = item.location.x + 'px';
  pin.style.top = item.location.y + 'px';

  pin.querySelector('img').src = item.author.avatar;
  pin.querySelector('img').alt = item.offer.title;

  return pin;
};

for (var i = 0; i < mocks.length; i++) {
  pinsFragment.appendChild(renderPin(mocks[i]));
}

pins.appendChild(pinsFragment);
