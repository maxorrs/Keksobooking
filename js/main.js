'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mock = [];

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var creationMock = function (arr) {
  for (var i = 0; i < 8; i++) {
    arr.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': 'Заголовок объявления',
            'address': getRandomIntInclusive(0, map.offsetWidth) + ', ' + getRandomIntInclusive(130, 630),
            'price': getRandomIntInclusive(10000, 80000),
            'type': TYPE[getRandomIntInclusive(0, TYPE.length - 1)],
            'rooms': getRandomIntInclusive(1, 3),
            'guests': getRandomIntInclusive(1, 3),
            'checkin': CHECK[getRandomIntInclusive(0, CHECK.length - 1)],
            'checkout': CHECK[getRandomIntInclusive(0, CHECK.length - 1)],
            'features': FEATURES,
            'description': 'Описание объявления',
            'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
          },
          'location': {
            'x': getRandomIntInclusive(0, map.offsetWidth) + PIN_WIDTH,
            'y': getRandomIntInclusive(130, 630) + PIN_HEIGHT
          }
        }
    );
  }
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

creationMock(mock);

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

for (var i = 0; i < mock.length; i++) {
  pinsFragment.appendChild(renderPin(mock[i]));
}

pins.appendChild(pinsFragment);
