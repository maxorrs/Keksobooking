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

var cardTemplate = document.querySelector('#card').content.querySelector('article');
var card = cardTemplate.cloneNode(true);

var checkingPresenceInCard = function (selector, itemForCheck) {
  if (itemForCheck) {
    card.querySelector(selector).textContent = itemForCheck;
  } else {
    card.querySelector(selector).hidden = true;
  }
};

var renderCard = function (item) {
  var messageRoom = item.offer.rooms === 1 ? ' комната для ' : ' комнаты для ';
  var messageGuest = item.offer.guests === 1 ? ' гостя' : ' гостей';
  var type = item.offer.type;

  switch (type) {
    case 'palace':
      type = 'Дворец';
      break;
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    default:
      type = '';
  }

  checkingPresenceInCard('.popup__title', item.offer.title);
  checkingPresenceInCard('.popup__text--address', item.offer.address);
  checkingPresenceInCard('.popup__text--price', item.offer.price + '₽/ночь');
  checkingPresenceInCard('.popup__type', type);

  if (item.offer.rooms || item.offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = item.offer.rooms + messageRoom + item.offer.guests + messageGuest;
  } else {
    card.querySelector('.popup__text--capacity').hidden = true;
  }

  if (item.offer.checkin) {
    card.querySelector('.popup__text--time').textContent = 'Зазед после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  } else {
    card.querySelector('.popup__text--time').hidden = true;
  }

  var features = card.querySelector('.popup__features');
  features.innerHTML = '';

  for (var j = 0; j < item.offer.features.length; j++) {
    var feature = features.appendChild(document.createElement('li'));
    feature.className = 'popup__feature popup__feature--' + item.offer.features[j];
    features.appendChild(feature);
  }

  card.querySelector('.popup__description').textContent = item.offer.description;

  var photos = card.querySelector('.popup__photos');
  photos.innerHTML = '';

  for (var k = 0; k < item.offer.photos.length; k++) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = item.offer.photos[k];
    photo.width = 45;
    photo.height = 40;
    photo.alt = item.offer.title;
    photos.appendChild(photo);
  }

  card.querySelector('.popup__avatar').src = item.author.avatar;

  return card;
};

pins.after(renderCard(mocks[0]));
