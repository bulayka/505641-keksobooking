'use strict';

(function () {
  var TypeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var houseType = document.querySelector('#type');
  var inputPrice = window.map.adForm.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var submitForm = window.map.adForm;
  var resetForm = document.querySelector('.ad-form__reset');

  houseType.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    inputPrice.min = TypeMinPrice[currentValue];
    inputPrice.placeholder = TypeMinPrice[currentValue];
  });

  timeIn.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    timeOut.value = currentValue;
  });

  timeOut.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    timeIn.value = currentValue;
  });

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

  submitForm.addEventListener('click', onRoomsSelect);

  window.map.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.sendData(new FormData(window.map.adForm), window.messageSuccess, window.messageError);
    window.getUnactivateCondition();
  });

  resetForm.addEventListener('click', function () {
    window.getUnactivateCondition();
  });
})();
