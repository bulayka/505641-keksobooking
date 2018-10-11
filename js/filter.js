'use strict';

(function () {
  var COUNT_CARDS = 5;

  var filterValue = {};

  var defaultValue = {
    'type': 'any',
    'price': 'any',
    'rooms': 'any',
    'guests': 'any',
    'features': []
  };

  var roomPrice = {
    'low': {
      MIN: 0,
      MAX: 9999
    },
    'middle': {
      MIN: 10000,
      MAX: 50000
    },
    'high': {
      MIN: 50001,
      MAX: Infinity
    }
  };

  var filterForm = document.querySelector('.map__filters');
  var filterFormElements = filterForm.children;
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelectorAll('.map__checkbox:checked');

  var enableFilterForm = function () {
    Array.prototype.forEach.call(filterFormElements, function (item) {
      item.disabled = false;
    });
  };

  var disableFilterForm = function () {
    Array.prototype.forEach.call(filterFormElements, function (item) {
      item.disabled = true;
    });
  };

  var getChosenFeatures = function () {
    var chosenFeatures = [];
    features.forEach(function (item) {
      if (item.checked) {
        chosenFeatures.push(item.value);
      }
    });
    return chosenFeatures;
  };

  var resetFilters = function () {
    type.value = defaultValue.type;
    price.value = defaultValue.price;
    rooms.value = defaultValue.rooms;
    guests.value = defaultValue.guests;
    window.util.resetFeatures(features);
  };

  var typeCompare = function (ad) {
    if (type.value === 'any') {
      return true;
    }
    return ad.offer.type === type.value;
  };

  var roomsCompare = function (ad) {
    if (rooms.value === 'any') {
      return true;
    }

    return ad.offer.rooms === parseInt(rooms.value, 10);
  };

  var guestsCompare = function (ad) {
    if (guests.value === 'any') {
      return true;
    }

    return ad.offer.guests === parseInt(guests.value, 10);
  };

  var priceCompare = function (ad) {
    if (price.value === 'any') {
      return true;
    }
    return ad.offer.price >= roomPrice[price.value].MIN && ad.offer.price <= roomPrice[price.value].MAX;
  };

  var featuresCompare = function (pin) {
    var featuresList = Array.from(filterForm.querySelectorAll('.map__checkbox:checked'));
    return featuresList.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
  };

  var TypeToCompareFunction = {
    type: typeCompare,
    price: priceCompare,
    rooms: roomsCompare,
    guests: guestsCompare,
    features: featuresCompare
  };

  var onFilterFormChange = function () {
    var compares = [];
    filterValue.type = type.value;
    filterValue.price = price.value;
    filterValue.rooms = rooms.value;
    filterValue.guests = guests.value;
    filterValue.features = getChosenFeatures();

    for (var key in filterValue) {
      if (filterValue[key].toString() !== defaultValue[key].toString()) {
        compares.push(TypeToCompareFunction[key]);
      }
    }

    window.closePopup();
    window.removeSimilarPins();

    window.result = window.rawData.filter(typeCompare).filter(priceCompare).filter(roomsCompare).filter(guestsCompare).filter(featuresCompare);
    var fragment = document.createDocumentFragment();

    if (window.result.length > COUNT_CARDS) {
      window.result.length = COUNT_CARDS;
    }

    for (var i = 0; i < window.result.length; i++) {
      fragment.appendChild(window.createPin(window.result[i], i));
    }
    window.map.pinsContainer.appendChild(fragment);
  };

  filterForm.addEventListener('change', window.debounce(onFilterFormChange));

  window.filter = {
    filterForm: filterForm,
    enableFilterForm: enableFilterForm,
    disableFilterForm: disableFilterForm,
    resetFilters: resetFilters,
    onFilterFormChange: onFilterFormChange
  };

})();
