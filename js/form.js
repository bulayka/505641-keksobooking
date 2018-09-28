'use strict';

(function () {
  var houseType = document.querySelector('#type');
  var inputPrice = window.map.adForm.querySelector('#price');
  var OPTION_VALUE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  houseType.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    inputPrice.min = OPTION_VALUE[currentValue];
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    timeOut.value = currentValue;
  });

  timeOut.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    timeIn.value = currentValue;
  });

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var onRoomsSelect = function () {
    if ((roomNumber.value === '100') && (capacity.value === '0')) {
      capacity.setCustomValidity('');
    } else if ((roomNumber.value === '100') && (capacity.value !== '0')) {
      capacity.setCustomValidity('Столько комнат не для гостей');
    } else if ((roomNumber.value !== '100') && (capacity.value === '0')) {
      capacity.setCustomValidity('Не для гостей только 100 комнат');
    } else if (roomNumber.value >= capacity.value) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('В комнате максимум один гость');
    }
  };

  var submitForm = window.map.adForm.querySelector('.ad-form__submit');

  submitForm.addEventListener('click', onRoomsSelect);
})();
