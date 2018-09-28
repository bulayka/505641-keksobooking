'use strict';

(function () {
  var map = document.querySelector('.map');

  var OFFERS_COUNT = 8;
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var offerParameters = {
    TITLES: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    TYPES: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    CHECKIN_TIMES: [
      '12:00',
      '13:00',
      '14:00'
    ],
    CHECKOUT_TIMES: [
      '12:00',
      '13:00',
      '14:00'
    ],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 5,
    MIN_GUESTS: 1,
    MAX_GUESTS: 10
  };

  var DICTIONARY = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var CARD_PHOTOS = {
    width: 45,
    height: 40,
    alt: 'Фотография жилья'
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomElement = function (array) {
    var index = getRandomNumber(0, array.length - 1);
    return array[index];
  };

  var getRandomArrayItem = function (array) {
    return getRandomNumber(0, array.length - 1);
  };

  var getRandomArrayList = function (array, length) {
    var list = [];

    for (var i = 0; i < length; i++) {
      var item = array[getRandomArrayItem(array)];
      if (list.indexOf(item) === -1) {
        list.push(item);
      }
    }

    return list;
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  var getAvatarUrl = function (index) {
    return 'img/avatars/user0' + index + '.png';
  };

  window.createAd = function (number) {
    var locationX = getRandomNumber(MIN_X, MAX_X);
    var locationY = getRandomNumber(MIN_Y, MAX_Y);

    var ad = {
      author: {
        avatar: getAvatarUrl(number)
      },
      offer: {
        title: offerParameters.TITLES[number - 1],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(offerParameters.MIN_PRICE, offerParameters.MAX_PRICE),
        type: getRandomElement(offerParameters.TYPES),
        rooms: getRandomNumber(offerParameters.MIN_ROOMS, offerParameters.MAX_ROOMS),
        guests: getRandomNumber(offerParameters.MIN_GUESTS, offerParameters.MAX_GUESTS),
        checkin: getRandomElement(offerParameters.CHECKIN_TIMES),
        checkout: getRandomElement(offerParameters.CHECKOUT_TIMES),
        features: getRandomArrayList(offerParameters.FEATURES, getRandomNumber(1, offerParameters.FEATURES.length)),
        description: '',
        photos: shuffleArray(offerParameters.PHOTOS.slice())
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    return ad;
  };

  window.data = {
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    DICTIONARY: DICTIONARY,
    OFFERS_COUNT: OFFERS_COUNT,
    CARD_PHOTOS: CARD_PHOTOS,
    offerParameters: offerParameters,
    getRandomElement: getRandomElement,
    map: map
  };
})();
