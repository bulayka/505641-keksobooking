'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var PHOTO_ALT = 'Фотография жилья';

  var Dictionary = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
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

  var getCardImages = function (photos) {
    var imageList = [];

    photos.forEach(function (item) {
      var imageItem = document.createElement('img');

      imageItem.src = item;
      imageItem.classList.add('popup__photo');
      imageItem.width = PHOTO_WIDTH;
      imageItem.height = PHOTO_HEIGHT;
      imageItem.alt = PHOTO_ALT;
      imageList.push(imageItem);
    });

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
    var popupCloseButton = card.querySelector('.popup__close');

    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = Dictionary[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей ';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__avatar').src = ad.author.avatar;

    appendElements(getCardFeatures(ad.offer.features), cardFeatures);
    appendElements(getCardImages(ad.offer.photos), cardPhotos);

    popupCloseButton.addEventListener('click', function () {
      window.closePopup();
    });

    document.addEventListener('keydown', window.map.onPopupEscPress);

    return card;
  };

  window.card = {
    createCard: createCard
  };
})();
