'use strict';

(function () {
  var COUNT_CARDS = 5;

  var filterValue = {};

  var defaultValue = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
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

  var filteredAds;

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

  var getTypeValue = function () {
    return type.value;
  };

  var getPriceValue = function () {
    return price.value;
  };

  var getRoomsValue = function () {
    return rooms.value;
  };

  var getGuestsValue = function () {
    return guests.value;
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

  var reset = function () {
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

  var updateFilterValues = function () {
    filterValue.type = getTypeValue();
    filterValue.price = getPriceValue();
    filterValue.rooms = getRoomsValue();
    filterValue.guests = getGuestsValue();
    filterValue.features = getChosenFeatures();
  };

  var getCompareResult = function (functions, ad, featuresValue) {
    var compareResult = true;
    for (var i = 0; i < functions.length; i++) {
      if (compareResult) {
        var func = functions[i];
        compareResult &= (func.name === 'featuresCompare') ? func(ad, featuresValue) : func(ad);
      } else {
        return compareResult;
      }
    }
    return compareResult;
  };

  var formChangeHandler = function () {
    var compares = [];
    updateFilterValues();
    filteredAds = window.getData();
    for (var key in filterValue) {
      if (filterValue[key].toString() !== defaultValue[key].toString()) {
        compares.push(TypeToCompareFunction[key]);
      }
    }

    filteredAds = filteredAds.filter(function (listItem) {
      return (getCompareResult(compares, listItem, filterValue.features));
    });

    if (filteredAds.length > COUNT_CARDS) {
      filteredAds.length = COUNT_CARDS;
    }
    window.closePopup();
    window.map.removeSimilarPins();

  };

  form.addEventListener('change', window.debounce(formChangeHandler));

  window.filter = {
    enable: enable,
    disable: disable,
    reset: reset
  };

})();
