'use strict';

(function () {
  var housingTypeInput = document.querySelector('#housing-type');

  var filteringByHousingType = function (value) {
    window.pin.removePin();

    var filteredDataByHousingType = window.main.originalData
    .slice()
    .filter(function (item) {
      return item.offer.type === value;
    });

    if (value === 'any') {
      filteredDataByHousingType = window.main.originalData;
    }

    if (filteredDataByHousingType) {
      for (var i = 0; i < filteredDataByHousingType.length; i++) {
        window.pin.addPin(filteredDataByHousingType[i]);
        window.pin.pinsFragment.children[i].dataset.id = i;
      }
      window.pin.pins.appendChild(window.pin.pinsFragment);
    }
  };

  var selectsFilter = document.querySelectorAll('.map__filters > select');

  for (var f = 0; f < selectsFilter.length; f++) {
    selectsFilter[f].addEventListener('change', function () {
      window.map.closeAdCard();
    });
  }

  window.filter = {
    housingTypeInput: housingTypeInput,
    filteringByHousingType: filteringByHousingType
  };
})();
