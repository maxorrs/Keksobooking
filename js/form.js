'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');

  for (var k = 0; k < fieldsets.length; k++) {
    fieldsets[k].disabled = true;
  }

  for (var l = 0; l < fieldsets.length; l++) {
    fieldsets[l].disabled = false;
  }

  window.utilConsts.addressInput.readOnly = true;

  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');

  var getValidityMessage = function () {
    var validityMessage;
    var roomValue = +roomNumberInput.value;
    var capacityValue = +capacityInput.value;

    switch (true) {
      case roomValue === window.utilConsts.ROOMS_COUNT_NOT_GUESTS && capacityValue >= window.utilConsts.ROOMS_MIN && capacityValue <= window.utilConsts.ROOMS_MAX:
      case roomValue < capacityValue:
      case roomValue >= window.utilConsts.ROOMS_MIN && roomValue <= window.utilConsts.ROOMS_MAX && capacityValue === 0:
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

  capacityInput.addEventListener('change', function () {
    capacityInput.setCustomValidity(getValidityMessage());
  });

  roomNumberInput.addEventListener('change', syncSelects);

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
  priceInput.value = window.utilConsts.PRICE_DEFAULT;

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
        placeholderPrice = window.utilConsts.PRICE_FOR_BUNGALO;
        break;
      case 'flat':
        placeholderPrice = window.utilConsts.PRICE_FOR_FLAT;
        break;
      case 'house':
        placeholderPrice = window.utilConsts.PRICE_FOR_HOUSE;
        break;
      case 'palace':
        placeholderPrice = window.utilConsts.PRICE_FOR_PALACE;
        break;
      default:
        break;
    }

    return placeholderPrice;
  };

  var checkMinPricePerNight = function () {
    if (+priceInput.value < +priceInput.placeholder) {
      priceInput.setCustomValidity('Минимальная цена за ночь ' + priceInput.placeholder + ' рублей');
    } else {
      priceInput.setCustomValidity('');
    }
  };

  typeHousingInput.addEventListener('change', function () {
    priceInput.value = getValuePlaceholderPrice();
    priceInput.placeholder = getValuePlaceholderPrice();
    priceInput.minLength = priceInput.value.length;
    priceInput.addEventListener('change', checkMinPricePerNight);
  });

  window.form = {
    setDefaultValueSelect: setDefaultValueSelect,
    adForm: adForm
  };
})();
