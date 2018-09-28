'use strict';

(function () {


  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');

  window.map = {
    adForm: adForm
  };

  var getAdsList = function () {
    var ads = [];
    for (var i = 1; i <= window.data.OFFERS_COUNT; i++) {
      ads.push(window.createAd(i));
    }
    return ads;
  };

  var fragment = document.createDocumentFragment();
  var adsList = getAdsList(window.data.OFFERS_COUNT);
  for (var i = 0; i < window.data.OFFERS_COUNT; i++) {
    fragment.appendChild(window.createPin(adsList[i], i));
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
    var target = evt.target;
    while (target !== pinsContainer) {
      if (target.tagName === 'BUTTON') {
        var moveCard = window.card.createCard(window.data.adsList[target.dataset.id]);
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

  var closePopup = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.remove();

    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.map = {
    closePopup: closePopup,
    onPopupEscPress: onPopupEscPress
  };

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

      if (moveX <= window.data.MIN_X - HALF) {
        moveX = window.data.MIN_X - HALF + 'px';
      } else if (moveX >= window.data.MAX_X - HALF) {
        moveX = window.data.MAX_X - HALF + 'px';
      } else {
        moveX = moveX + 'px';
      }
      mapPinMain.style.left = moveX;

      if (moveY <= window.data.MIN_Y - MAIN_PIN_WIDTH - ARROWHEIGHT) {
        moveY = window.data.MIN_Y - MAIN_PIN_WIDTH - ARROWHEIGHT + 'px';
      } else if (moveY >= window.data.MAX_Y - MAIN_PIN_WIDTH - ARROWHEIGHT) {
        moveY = window.data.MAX_Y - MAIN_PIN_WIDTH - ARROWHEIGHT + 'px';
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
})();
