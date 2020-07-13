'use strict';

(function () {
  var Price = {
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    low: {
      MAX: 10000
    },
    high: {
      MIN: 5000
    }
  };

  var formFilters = document.querySelector('.map__filters');
  var featuresSpace = formFilters.querySelector('.map__features');

  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');

  var translatePrice = function (price) {
    var result;
    switch (true) {
      case price >= Price.middle.MIN && price <= Price.middle.MAX:
        result = 'middle';
        break;
      case price < Price.low.MAX:
        result = 'low';
        break;
      case price > Price.high.MIN:
        result = 'high';
        break;
    }
    return result;
  };

  var filterByType = function (item) {
    return housingType.value === window.utilConsts.DEFAULT_VALUE_FILTER
    || housingType.value === item.offer.type;
  };

  var filterByPrice = function (item) {
    return housingPrice.value === window.utilConsts.DEFAULT_VALUE_FILTER
    || housingPrice.value === item.offer.priceGradation;
  };

  var filterByRooms = function (item) {
    return housingRooms.value === window.utilConsts.DEFAULT_VALUE_FILTER
    || +housingRooms.value === item.offer.rooms;
  };

  var filterByGuests = function (item) {
    return housingGuests.value === window.utilConsts.DEFAULT_VALUE_FILTER
    || +housingGuests.value === item.offer.guests;
  };

  var filterByFeatures = function (item, features) {
    var itemFeatures = item.offer.features;
    return features.every(function (feature) {
      return itemFeatures.includes(feature);
    });
  };

  var setFilters = function () {
    var main = [];

    window.pin.removePin();
    window.map.closeAdCard();

    var features = Array.from(featuresSpace.querySelectorAll('input:checked')).map(function (feature) {
      return feature.value;
    });

    for (var i = 0; i < window.main.originalData.length; i++) {
      var item = window.main.originalData[i];
      if (filterByType(item)
      && filterByPrice(item)
      && filterByRooms(item)
      && filterByGuests(item)
      && filterByFeatures(item, features)
      ) {
        main.push(item);
      }
      if (main.length >= window.utilConsts.MAX_COUNT_PINS) {
        break;
      }
    }

    for (var j = 0; j < main.length; j++) {
      window.pin.addPin(main[j]);
      window.pin.pinsFragment.children[j].dataset.id = main[j].id;
    }

    window.pin.pins.appendChild(window.pin.pinsFragment);
  };

  var onFilterChange = function () {
    window.debounce(setFilters);
  };

  var toggleActiveFilters = function (bool) {
    for (var i = 0; i < formFilters.children.length; i++) {
      formFilters.children[i].disabled = bool;

      if (bool) {
        formFilters.children[i].style.cursor = 'default';
      } else {
        formFilters.children[i].style.cursor = 'pointer';
      }
    }
  };

  window.filter = {
    formFilters: formFilters,
    toggleActiveFilters: toggleActiveFilters,
    translatePrice: translatePrice,
    onFilterChange: onFilterChange,
    setFilters: setFilters
  };
})();
