'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pin');

var OFFERS_COUNT = 8;
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;

var pins = document.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var dictionary = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (array) {
  var index = getRandomNumber(0, array.length - 1);
  return array[index];
};

var getAd = function () {
  var locationX = getRandomNumber(0, 1200);
  var locationY = getRandomNumber(130, 630);

  var ad = {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomNumber(1, OFFERS_COUNT) + '.png'
    },
    offer: {
      title: getRandomElement(TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN_TIMES),
      checkout: getRandomElement(CHECKOUT_TIMES),
      features: getRandomElement(FEATURES),
      description: '',
      photos: getRandomElement(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  return ad;
};

var getAdsList = function () {
  var ads = [];
  for (var i = 0; i < OFFERS_COUNT; i++) {
    ads.push(getAd(i));
  }
  return ads;
};

var createPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  var mapPinWidth = mapPin.offsetWidth;
  var mapPinHeight = mapPin.offsetHeight;
  var pinImage = pin.querySelector('img');

  pin.style.left = (ad.location.x - mapPinWidth / 2) + 'px';
  pin.style.top = (ad.location.y - mapPinHeight) + 'px';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;

  return pin;
};

var createCard = function (ad) {
  var card = cardTemplate.cloneNode(true);

  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  // var cardFeatures = card.querySelector('.popup__features');
  var cardDescription = card.querySelector('.popup__description');
  // var cardPhotos = card.querySelector('.popup__photos');
  var cardAvatar = card.querySelector('.popup__avatar');

  cardTitle.textContent = ad.offer.title;
  cardAddress.textContent = ad.offer.address;
  cardPrice.textContent = ad.offer.price + '₽/ночь';
  cardType.textContent = dictionary[getRandomElement(TYPES)];
  cardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей ';
  cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  cardDescription.textContent = ad.offer.description;
  cardAvatar.src = ad.author.avatar;

  return card;
};

var fragment = document.createDocumentFragment();
var adsList = getAdsList(OFFERS_COUNT);
for (var i = 0; i < OFFERS_COUNT; i++) {
  fragment.appendChild(createPin(adsList[i]));
}

pins.appendChild(fragment);
fragment.appendChild(createCard(adsList[0]));
map.insertBefore(fragment, mapFilters);
