'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

    for (var i = 0; i < window.data.offerParameters.PHOTOS.length; i++) {
      var imageItem = document.createElement('img');
      imageItem.src = window.data.offerParameters.PHOTOS[i];
      imageItem.classList.add('popup__photo');
      imageItem.width = window.data.CARD_PHOTOS.width;
      imageItem.height = window.data.CARD_PHOTOS.height;
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
    card.querySelector('.popup__type').textContent = window.data.DICTIONARY[window.data.getRandomElement(window.data.offerParameters.TYPES)];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей ';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__avatar').src = ad.author.avatar;

    appendElements(getCardFeatures(ad.offer.features), cardFeatures);
    appendElements(getCardImages(ad.offer.photos), cardPhotos);

    var popupCloseButton = card.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', function () {
      window.map.closePopup();
    });
    document.addEventListener('keydown', window.map.onPopupEscPress);

    return card;
  };

  window.card = {
    createCard: createCard
  };
})();
