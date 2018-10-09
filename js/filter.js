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

  var filteredAds = [];

  var form = document.querySelector('.map__filters');
  var formElements = form.children;
  var type = form.querySelector('#housing-type');
  var price = form.querySelector('#housing-price');
  var rooms = form.querySelector('#housing-rooms');
  var guests = form.querySelector('#housing-guests');
  var features = form.querySelectorAll('#housing-features input');

  var enable = function () {
    Array.prototype.forEach.call(formElements, function (item) {
      item.disabled = false;
    });
  };

  var disable = function () {
    Array.prototype.forEach.call(formElements, function (item) {
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
    return ad.offer.type === type.value;
  };

  var roomsCompare = function (ad) {
    return ad.offer.rooms === parseInt(rooms.value, 10);
  };

  var guestsCompare = function (ad) {
    return ad.offer.guests === parseInt(guests.value, 10);
  };

  var priceCompare = function (ad) {
    return ad.offer.price >= roomPrice[price.value].MIN && ad.offer.price <= roomPrice[price.value].MAX;
  };

  var featuresCompare = function (list, values) {
    return !values || window.util.isElementsExistInArray(values, list.offer.features);
  };

  var TypeToCompareFunction = {
    type: typeCompare,
    price: priceCompare,
    rooms: roomsCompare,
    guests: guestsCompare,
    features: featuresCompare
  };

  var onFormChange = function () {
    var compares = [];
    filterValue.type = type.value;
    filterValue.price = price.value;
    filterValue.rooms = rooms.value;
    filterValue.guests = guests.value;
    filterValue.features = getChosenFeatures();

    // filteredAds = window.getData(function (serverData) {
    //   adsList = serverData.slice();
    //   for (var i = 0; i < serverData.length; i++) {
    //     fragment.appendChild(window.createPin(serverData[i], i));
    //   }
    // }, window.messageError);

    for (var key in filterValue) {
      if (filterValue[key].toString() !== defaultValue[key].toString()) {
        compares.push(TypeToCompareFunction[key]);
      }
    }

    var result = filteredAds.filter(typeCompare).filter(priceCompare).filter(roomsCompare).filter(guestsCompare);

    if (filteredAds.length > COUNT_CARDS) {
      filteredAds.length = COUNT_CARDS;
    }
    window.closePopup();
    window.removeSimilarPins();
  };

  form.addEventListener('change', window.debounce(onFormChange));

  window.filter = {
    enable: enable,
    disable: disable,
    resetFilters: resetFilters
  };

})();
