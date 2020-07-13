'use strict';

(function () {
  var Rooms = {
    ONE_PERSON: 1,
    TWO_PERSONS: 2,
    THREE_PERSONS: 3,
    HUNDRED_PERSONS: 100
  };

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeHousingInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');


  var toggleActiveFieldsets = function (bool) {
    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].disabled = bool;
    }
  };

  for (var l = 0; l < fieldsets.length; l++) {
    fieldsets[l].disabled = false;
  }

  window.utilConsts.addressInput.readOnly = true;

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
    typeHousingInput[1].selected = true;

    priceInput.value = window.utilConsts.PRICE_DEFAULT;
    priceInput.placeholder = window.utilConsts.PRICE_DEFAULT;
    priceInput.minLength = window.utilConsts.MIN_LENGTH_PRICE_DEFAULT;

    window.pin.pinMain.style.left = window.utilConsts.START_POSITION_MAIN_Y + 'px';
    window.pin.pinMain.style.top = window.utilConsts.START_POSITION_MAIN_X + 'px';
    window.utilConsts.addressInput.value = Math.floor(window.pin.pinMain.offsetLeft + window.utilConsts.MAIN_PIN_CIRCLE / 2) + ', ' + Math.floor(window.pin.pinMain.offsetTop + window.utilConsts.MAIN_PIN_CIRCLE / 2);
  };

  var syncSelects = function () {
    for (var z = 0; z < capacityInput.children.length; z++) {
      switch (+roomNumberInput.value) {
        case Rooms.ONE_PERSON:
          capacityInput.children[z].disabled = true;
          capacityInput.children[2].disabled = false;
          capacityInput.children[2].selected = true;
          break;
        case Rooms.TWO_PERSONS:
          capacityInput.children[z].disabled = true;
          capacityInput.children[1].disabled = false;
          capacityInput.children[2].disabled = false;
          capacityInput.children[2].selected = true;
          break;
        case Rooms.THREE_PERSONS:
          capacityInput.children[z].disabled = true;
          capacityInput.children[2].disabled = false;
          capacityInput.children[1].disabled = false;
          capacityInput.children[0].disabled = false;
          capacityInput.children[2].selected = true;
          break;
        case Rooms.HUNDRED_PERSONS:
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

  var checkValididityPriceInput = function () {
    if (priceInput.value.match(/\D/)) {
      priceInput.setCustomValidity('Только цифры');
      priceInput.reportValidity();
    } else if (priceInput.value > window.utilConsts.PRICE_MAX) {
      priceInput.setCustomValidity('Максмальная цена за ночь 1 000 000');
      priceInput.reportValidity();
    } else {
      priceInput.setCustomValidity('');
    }
  };

  priceInput.addEventListener('input', checkValididityPriceInput);

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

  var successFormHandler = function () {
    window.reset.inactiveMod();

    var successMesageTemplate = document.querySelector('#success').content.querySelector('div');
    var mes = successMesageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(mes);

    var onEscCloseModal = function (evt) {
      if (evt.keyCode === window.utilConsts.KEY_CODE_ESC) {
        mes.remove();
      }

      document.removeEventListener('keydown', onEscCloseModal);
    };

    var onClickRemoveMes = function () {
      mes.remove();

      document.removeEventListener('click', onClickRemoveMes);
    };

    document.addEventListener('keydown', onEscCloseModal);

    document.addEventListener('click', onClickRemoveMes);
  };

  var errorFormHandler = function () {
    var errorMesageTemplate = document.querySelector('#error').content.querySelector('div');
    var mes = errorMesageTemplate.cloneNode(true);
    var errorButton = mes.querySelector('.error__button');


    document.querySelector('main').appendChild(mes);

    var onEscCloseModal = function (evt) {
      if (evt.keyCode === window.utilConsts.KEY_CODE_ESC) {
        mes.remove();
      }

      document.removeEventListener('keydown', onEscCloseModal);
    };

    var onClickRemoveMes = function () {
      mes.remove();

      document.removeEventListener('click', onClickRemoveMes);
    };

    var onBtnRemoveMes = function () {
      mes.remove();

      errorButton.removeEventListener('click', onBtnRemoveMes);
    };

    document.addEventListener('keydown', onEscCloseModal);

    document.addEventListener('click', onClickRemoveMes);

    errorButton.addEventListener('click', onBtnRemoveMes);
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.load(window.utilConsts.URL_POST_DATA, 'POST', successFormHandler, errorFormHandler, new FormData(adForm));
  };

  window.form = {
    setDefaultValueSelect: setDefaultValueSelect,
    adForm: adForm,
    submitHandler: submitHandler,
    toggleActiveFieldsets: toggleActiveFieldsets
  };
})();
