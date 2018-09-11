'use strict';

var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var OFFERS_COUNT = 8;

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

var getAvatarUrl = function (index) {
  return 'img/avatars/user0' + index + '.png';
};

var createAd = function (number) {
  var locationX = getRandomNumber(0, 1200);
  var locationY = getRandomNumber(130, 630);

  var ad = {
    author: {
      avatar: getAvatarUrl(number)
    },
    offer: {
      title: offerParameters.TITLES[number],
      address: locationX + ', ' + locationY,
      price: getRandomNumber(offerParameters.MIN_PRICE, offerParameters.MAX_PRICE),
      type: getRandomElement(offerParameters.TYPES),
      rooms: getRandomNumber(offerParameters.MIN_ROOMS, offerParameters.MAX_ROOMS),
      guests: getRandomNumber(offerParameters.MIN_GUESTS, offerParameters.MAX_GUESTS),
      checkin: getRandomElement(offerParameters.CHECKIN_TIMES),
      checkout: getRandomElement(offerParameters.CHECKOUT_TIMES),
      features: getRandomArrayList(offerParameters.FEATURES, getRandomNumber(1, offerParameters.FEATURES.length)),
      description: '',
      photos: getRandomElement(offerParameters.PHOTOS)
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
  for (var i = 1; i <= OFFERS_COUNT; i++) {
    ads.push(createAd(i));
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

var getCardFeatures = function (features) {
  var featuresItems = [];

  features.forEach(function (item) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', 'popup__feature--' + item);
    featuresItems.push(featuresItem);
  });

  return featuresItems;
};

var getCardImages = function () {
  var imageList = [];

  for (var i = 0; i < offerParameters.PHOTOS.length; i++) {
    var imageItem = document.createElement('img');
    imageItem.src = 'http://o0.github.io/assets/images/tokyo/hotel1.jpg';
    imageItem.classList.add('popup__photo');
    imageItem.width = CARD_PHOTOS.width;
    imageItem.height = CARD_PHOTOS.height;
    imageItem.alt = 'Фотография жилья';
    imageList.push(imageItem);
  }

  return imageList;
};

var appendElements = function (elements, parent) {
  elements.forEach(function (el) {
    parent.appendChild(el);
  });
};

var createCard = function (ad) {
  var card = cardTemplate.cloneNode(true);

  var cardFeatures = card.querySelector('.popup__features');
  var cardPhotos = card.querySelector('.popup__photos');

  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = DICTIONARY[getRandomElement(offerParameters.TYPES)];
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей ';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__avatar').src = ad.author.avatar;

  appendElements(getCardFeatures(ad.offer.features), cardFeatures);
  appendElements(getCardImages(ad.offer.photos), cardPhotos);

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

map.classList.remove('map--faded');
