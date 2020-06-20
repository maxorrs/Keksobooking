'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_CIRCLE = 62;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;
var COUNT_ADS = 8;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 3;
var ROOMS_COUNT_NOT_GUESTS = 100;
var GUESTS_MIN = 1;
var GUESTS_MAX = 3;
var HEIGHT_Y_MIN = 130;
var HEIGHT_Y_MAX = 630;
var KEY_CODE_ENTER = 13;
var KEY_CODE_ESC = 27;
var LEFT_BUTTON_MOUSE = 0;
var PHOTO_AD_WIDTH = 45;
var PHOTO_AD_HEIGHT = 40;
var DECLENCIONS_ROOMS = ['комната', 'комнаты', 'комнат'];
var PRICE_DEFAULT = 1000;
var PRICE_FOR_BUNGALO = 0;
var PRICE_FOR_FLAT = 1000;
var PRICE_FOR_HOUSE = 5000;
var PRICE_FOR_PALACE = 10000;
var mocks = [];
var map = document.querySelector('.map');

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
            'x': getRandomIntInclusive(0, map.offsetWidth) + PIN_WIDTH / 2,
            'y': getRandomIntInclusive(HEIGHT_Y_MIN, HEIGHT_Y_MAX) + PIN_HEIGHT
          }
        }
    );
  }
};

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

var cardTemplate = document.querySelector('#card').content.querySelector('article');
var card = cardTemplate.cloneNode(true);

var checkingPresenceInCard = function (selector, itemForCheck) {
  if (itemForCheck) {
    card.querySelector(selector).textContent = itemForCheck;
  } else {
    card.querySelector(selector).hidden = true;
  }
};

var getValueTypeOffer = function (typeOffer) {
  var typeInRussian;
  switch (typeOffer) {
    case 'palace':
      typeInRussian = 'Дворец';
      break;
    case 'flat':
      typeInRussian = 'Квартира';
      break;
    case 'house':
      typeInRussian = 'Дом';
      break;
    case 'bungalo':
      typeInRussian = 'Бунгало';
      break;
    default:
      typeInRussian = '';
  }

  return typeInRussian;
};

var renderPhotos = function (item) {
  var photos = card.querySelector('.popup__photos');
  photos.innerHTML = '';

  for (var k = 0; k < item.offer.photos.length; k++) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = item.offer.photos[k];
    photo.width = PHOTO_AD_WIDTH;
    photo.height = PHOTO_AD_HEIGHT;
    photo.alt = item.offer.title;
    photos.appendChild(photo);
  }
};

var declensionWord = function (number, word) {
  var cases = [2, 0, 1, 1, 1, 2];
  return word[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var renderCard = function (item) {
  var messageGuest = item.offer.guests % 10 !== 1 || item.offer.guests === 11 ? ' гостей' : ' гостя';

  checkingPresenceInCard('.popup__title', item.offer.title);
  checkingPresenceInCard('.popup__text--address', item.offer.address);
  checkingPresenceInCard('.popup__text--price', item.offer.price + '₽/ночь');
  checkingPresenceInCard('.popup__type', getValueTypeOffer(item.offer.type));

  if (item.offer.rooms || item.offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' ' + declensionWord(item.offer.rooms, DECLENCIONS_ROOMS) + ' для ' + item.offer.guests + ' ' + messageGuest;
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

  renderPhotos(item);

  card.querySelector('.popup__avatar').src = item.author.avatar;


  return card;
};

var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');

for (var k = 0; k < fieldsets.length; k++) {
  fieldsets[k].disabled = true;
}

var pinMain = document.querySelector('.map__pin--main');

var addressInput = document.querySelector('#address');
addressInput.readOnly = true;
addressInput.value = Math.floor(pinMain.offsetLeft + MAIN_PIN_CIRCLE / 2) + ', ' + Math.floor(pinMain.offsetTop + MAIN_PIN_CIRCLE / 2);

var activeModeOn = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var l = 0; l < fieldsets.length; l++) {
    fieldsets[l].disabled = false;
  }
  pins.appendChild(pinsFragment);
  addressInput.value = Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT);
};

var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');

var getValidityMessage = function () {
  var validityMessage;
  var roomValue = +roomNumberInput.value;
  var capacityValue = +capacityInput.value;

  switch (true) {
    case roomValue === ROOMS_COUNT_NOT_GUESTS && capacityValue >= ROOMS_MIN && capacityValue <= ROOMS_MAX:
    case roomValue < capacityValue:
    case roomValue >= ROOMS_MIN && roomValue <= ROOMS_MAX && capacityValue === 0:
      validityMessage = '1 комната рассчитана на 1 гостя';
      break;
    default:
      validityMessage = '';
      break;
  }

  return validityMessage;
};

var setDefaultValueSelect = function () {
  for (var x = 0; x < capacityInput.children.length; x++) {
    capacityInput.children[x].disabled = true;
  }
  capacityInput.children[2].disabled = false;
  capacityInput.children[2].selected = true;
};

var syncSelects = function () {
  for (var z = 0; z < capacityInput.children.length; z++) {
    switch (roomNumberInput.value) {
      case '1':
        capacityInput.children[z].disabled = true;
        capacityInput.children[2].disabled = false;
        capacityInput.children[2].selected = true;
        break;
      case '2':
        capacityInput.children[z].disabled = true;
        capacityInput.children[1].disabled = false;
        capacityInput.children[2].disabled = false;
        capacityInput.children[2].selected = true;
        break;
      case '3':
        capacityInput.children[z].disabled = true;
        capacityInput.children[2].disabled = false;
        capacityInput.children[1].disabled = false;
        capacityInput.children[0].disabled = false;
        capacityInput.children[2].selected = true;
        break;
      case '100':
        capacityInput.children[z].disabled = true;
        capacityInput.children[3].disabled = false;
        capacityInput.children[3].selected = true;
        break;
      default:
        break;
    }
  }
};

setDefaultValueSelect();

capacityInput.addEventListener('change', function () {
  capacityInput.setCustomValidity(getValidityMessage());
});

roomNumberInput.addEventListener('change', syncSelects);

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_BUTTON_MOUSE) {
    activeModeOn();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    activeModeOn();
  }
});

for (var v = 0; v < mocks.length; v++) {
  pinsFragment.children[v].dataset.id = v;
}


var closeAdCard = function () {
  if (document.querySelector('.map__card')) {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onCardEscPress);
    if (document.querySelector('.popup__close')) {
      document.querySelector('.popup__close').removeEventListener('click', onCardCloseButton);
    }
  }
};

var onCardEscPress = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    evt.preventDefault();
    closeAdCard();
  }
};


var onCardCloseButton = function () {
  closeAdCard();
};

var openAdCard = function (evt) {
  var pinSelected = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (pinSelected) {
    pins.after(renderCard(mocks[pinSelected.dataset.id]));
    document.addEventListener('keydown', onCardEscPress);
    document.querySelector('.popup__close').addEventListener('click', onCardCloseButton);
  }
};


pins.addEventListener('click', function (evt) {
  openAdCard(evt);
});

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

timeOut.children[1].disabled = true;
timeOut.children[2].disabled = true;

var syncTimesChekInCheckOut = function () {
  switch (timeIn.value) {
    case '12:00':
      timeOut.children[0].disabled = false;
      timeOut.children[1].disabled = true;
      timeOut.children[2].disabled = true;
      timeOut.children[0].selected = true;
      break;
    case '13:00':
      timeOut.children[0].disabled = true;
      timeOut.children[1].disabled = false;
      timeOut.children[2].disabled = true;
      timeOut.children[1].selected = true;
      break;
    case '14:00':
      timeOut.children[0].disabled = true;
      timeOut.children[1].disabled = true;
      timeOut.children[2].disabled = false;
      timeOut.children[2].selected = true;
      break;
    default:
      break;
  }
};

timeIn.addEventListener('change', function () {
  syncTimesChekInCheckOut();
});

var priceInput = document.querySelector('#price');
priceInput.value = PRICE_DEFAULT;

var checkValididityPriceInput = function () {
  if (priceInput.value.match(/\D/)) {
    priceInput.setCustomValidity('Только цифры');
    priceInput.reportValidity();
  } else {
    priceInput.setCustomValidity('');
  }
};

priceInput.addEventListener('input', checkValididityPriceInput);


var typeHousingInput = document.querySelector('#type');

var getValuePlaceholderPrice = function () {
  var placeholderPrice;

  switch (typeHousingInput.value) {
    case 'bungalo':
      placeholderPrice = PRICE_FOR_BUNGALO;
      break;
    case 'flat':
      placeholderPrice = PRICE_FOR_FLAT;
      break;
    case 'house':
      placeholderPrice = PRICE_FOR_HOUSE;
      break;
    case 'palace':
      placeholderPrice = PRICE_FOR_PALACE;
      break;
    default:
      break;
  }

  return placeholderPrice;
};

typeHousingInput.addEventListener('change', function () {
  priceInput.placeholder = getValuePlaceholderPrice();
  priceInput.minLength = priceInput.placeholder;
});

var checkMinPricePerNight = function () {
  if (+priceInput.value < +priceInput.placeholder) {
    priceInput.setCustomValidity('Минимальная цена за ночь ' + priceInput.placeholder + ' рублей');
  } else {
    priceInput.setCustomValidity('');
  }
};

priceInput.addEventListener('change', checkMinPricePerNight);
