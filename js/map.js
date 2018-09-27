'use strict';

var OFFERS_COUNT = 8;
var ESC_KEYCODE = 27;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var pinsContainer = document.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var addressInput = adForm.querySelector('#address');

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

var createAd = function (number) {
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

var getAdsList = function () {
  var ads = [];
  for (var i = 1; i <= OFFERS_COUNT; i++) {
    ads.push(createAd(i));
  }
  return ads;
};

var createPin = function (ad, adIndex) {
  var pin = pinTemplate.cloneNode(true);
  var mapPinWidth = mapPin.offsetWidth;
  var mapPinHeight = mapPin.offsetHeight;
  var pinImage = pin.querySelector('img');

  pin.style.left = (ad.location.x - mapPinWidth / 2) + 'px';
  pin.style.top = (ad.location.y - mapPinHeight) + 'px';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;
  pin.dataset.id = adIndex;

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
    imageItem.src = offerParameters.PHOTOS[i];
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

  var popupCloseButton = card.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', function () {
    closePopup();
  });
  document.addEventListener('keydown', onPopupEscPress);

  return card;
};

var fragment = document.createDocumentFragment();
var adsList = getAdsList(OFFERS_COUNT);
for (var i = 0; i < OFFERS_COUNT; i++) {
  fragment.appendChild(createPin(adsList[i], i));
}

var getActiveCondition = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var j = 0; j < adFormFieldsets.length; j++) {
    adFormFieldsets[j].disabled = false;
  }
};

var getUnactivateCondition = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');

  for (var j = 0; j < adFormFieldsets.length; j++) {
    adFormFieldsets[j].disabled = true;
  }
};

window.onload = function () {
  getUnactivateCondition();
};

/* Устанавливаем обработчик клика на контейнер с пинами */
pinsContainer.addEventListener('click', function (evt) {
  var target = evt.target; /* Записываем в переменную target элемент, на который кликнули*/

  while (target !== pinsContainer) { /* Условие выполнения дальнейшего тела цикла while - если попадаем внутрь контейнера pinsContainer, то все ок - код выполняется, если нет - то внутрь while даже не зайдем */
    if (target.tagName === 'BUTTON') { /* Проверяем попали кликом на элемент с тегом button (как раз наш пин) или нет. Если попали - то выполняем код тела цикла, если нет - переопределяем target (поднимаемся до родителя). Если дошли до контейнера pinsContainer, то элемент, нужный нам - не найдем, и цикл while останавливается */
      var moveCard = createCard(adsList[target.dataset.id]);
      map.insertBefore(moveCard, mapFilters);

      var cardsAmount = document.querySelectorAll('.map__card');

      if (cardsAmount.length !== 1) {
        closePopup();
      }
      document.addEventListener('keydown', onPopupEscPress);
      return;
    }
    target = target.parentNode;
  }
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// var openPopup = function () {
//   document.addEventListener('keydown', onPopupEscPress);
// };

var closePopup = function () {
  var mapCard = document.querySelector('.map__card');
  mapCard.remove();

  document.removeEventListener('keydown', onPopupEscPress);
};

// module4-task2

// 2.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
var houseType = document.querySelector('#type');
var inputPrice = adForm.querySelector('#price');
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

// 2.5. Поля «Время заезда» и «Время выезда» синхронизированы
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

// 2.6. Поле «Количество комнат» синхронизировано с полем «Количество мест»

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

var submitForm = adForm.querySelector('.ad-form__submit');

submitForm.addEventListener('click', onRoomsSelect);

// Module5-task1
var MAIN_PIN_WIDTH = mapPinMain.offsetWidth;
var HALF = Math.round(MAIN_PIN_WIDTH / 2);
var ARROWHEIGHT = 22;

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var moveX = mapPinMain.offsetLeft - shift.x;
    var moveY = mapPinMain.offsetTop - shift.y;

    if (moveX <= MIN_X - HALF) {
      moveX = MIN_X - HALF + 'px';
    } else if (moveX >= MAX_X - HALF) {
      moveX = MAX_X - HALF + 'px';
    } else {
      moveX = moveX + 'px';
    }
    mapPinMain.style.left = moveX;

    if (moveY <= MIN_Y - MAIN_PIN_WIDTH - ARROWHEIGHT) {
      moveY = MIN_Y - MAIN_PIN_WIDTH - ARROWHEIGHT + 'px';
    } else if (moveY >= MAX_Y - MAIN_PIN_WIDTH - ARROWHEIGHT) {
      moveY = MAX_Y - MAIN_PIN_WIDTH - ARROWHEIGHT + 'px';
    } else {
      moveY = moveY + 'px';
    }
    mapPinMain.style.top = moveY;
    addressInput.value = setAddress(mapPinMain);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evtDragged) {
        evtDragged.preventDefault();
        mapPinMain.removeEventListener('click', onClickPreventDefault);
      };
      mapPinMain.addEventListener('click', onClickPreventDefault);
    }

    pinsContainer.appendChild(fragment);
    getActiveCondition();
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var setAddress = function (element) {
  var locationX = Math.round(parseInt(element.style.left, 10) + element.offsetWidth / 2);
  var locationY = Math.round(parseInt(element.style.top, 10) + element.offsetHeight + ARROWHEIGHT);

  return locationX + ', ' + locationY;
};
