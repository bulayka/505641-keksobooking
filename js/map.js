'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var OFFERS_COUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'аленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (array) {
  var index = getRandomNumber(0, array.length - 1);
  return array[index];
};

var ad = {
  'author': {
    'avatar': '0' + getRandomNumber(0, OFFERS_COUNT)
  },
  'offer': {
    'title': getRandomElement(TITLES),
    'address': getRandomNumber(0, 1200) + ', ' + getRandomNumber(130, 630),
    'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
    'type': getRandomElement(TYPES),
    'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
    'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
    'checkin': getRandomElement(TIMES),
    'checkout': getRandomElement(TIMES),
    'features': getRandomElement(FEATURES),
    'description': '',
    'photos': getRandomElement(PHOTOS)
  },
  'location': {
    'x': getRandomNumber(0, 1200),
    'y': getRandomNumber(130, 630)
  }
};
