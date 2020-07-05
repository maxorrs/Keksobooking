'use strict';

(function () {
  window.utilConsts.addressInput.value = Math.floor(window.pin.pinMain.offsetLeft + window.utilConsts.MAIN_PIN_CIRCLE / 2) + ', ' + Math.floor(window.pin.pinMain.offsetTop + window.utilConsts.MAIN_PIN_CIRCLE / 2);
  window.form.setDefaultValueSelect();

  // var successHandler = function (wizards) {
  //   var fragment = document.createDocumentFragment();
    
  //   for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
  //     fragment.appendChild(renderWizard(wizards[i]));
  //   }
  //   similarListElement.appendChild(fragment);
    
  //   userDialog.querySelector('.setup-similar').classList.remove('hidden');
  // };

  var successHandler = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.pin.addPin(data[i]);
      window.pin.pinsFragment.children[i].dataset.id = i;
    }

    

    // console.log(data[0]);
    // console.log(data[0].offer.guests);


    //  window.map.openAdCard(data[3]);
  }

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pin.pins.addEventListener('click', function (evt) {
    window.map.openAdCard(evt);
  });

  var activeModeOn = function () {
    window.utilConsts.MAP.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.pin.pins.appendChild(window.pin.pinsFragment);

    window.load(successHandler, errorHandler);
  };

  window.main = {
    activeModeOn: activeModeOn
  };
})();
