'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins) {
      pins.forEach(function (item) {
        item.remove();
      });
    }
  };

  window.pin = {
    createPin: createPin,
    deletePins: deletePins
  };
})();
