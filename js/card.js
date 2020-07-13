'use strict';

(function () {
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
      photo.width = window.utilConsts.PHOTO_AD_WIDTH;
      photo.height = window.utilConsts.PHOTO_AD_HEIGHT;
      photo.alt = item.offer.title;
      photos.appendChild(photo);
    }
  };

  var renderCard = function (item) {

    var messageGuest = item.offer.guests % 10 !== 1 || item.offer.guests === 11 ? ' гостей' : ' гостя';

    checkingPresenceInCard('.popup__title', item.offer.title);
    checkingPresenceInCard('.popup__text--address', item.offer.address);
    checkingPresenceInCard('.popup__text--price', item.offer.price + '₽/ночь');
    checkingPresenceInCard('.popup__type', getValueTypeOffer(item.offer.type));

    if (item.offer.rooms || item.offer.guests) {
      card.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' ' + window.util.declensionWord(item.offer.rooms, window.utilConsts.DECLENCIONS_ROOMS) + ' для ' + item.offer.guests + ' ' + messageGuest;
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

  window.card = {
    checkingPresenceInCard: checkingPresenceInCard,
    getValueTypeOffer: getValueTypeOffer,
    renderPhotos: renderPhotos,
    renderCard: renderCard
  };
})();
