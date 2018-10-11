'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var INIT_X = 570;
  var INIT_Y = 375;
  var ARROWHEIGHT = 22;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainPinWidth = mapPinMain.offsetWidth;
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var fragment = document.createDocumentFragment();

  var HALF = Math.round(mainPinWidth / 2);

  var getActiveCondition = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = false;
    }

    window.getData(function (serverData) {
      window.rawData = serverData.slice();
      window.filter.onFilterFormChange();
    }, window.messageError);
  };

  window.getUnactivateCondition = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = true;
    }

    mainPinToStartPosition();
    window.map.adForm.reset();
    addressInput.value = setAddress(mapPinMain);
    window.deletePins();
    window.closePopup();
  };

  window.onload = function () {
    window.getUnactivateCondition();
  };

  /* Устанавливаем обработчик клика на контейнер с пинами */
  pinsContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== pinsContainer) {
      if (target.tagName === 'BUTTON') {
        var moveCard = window.card.createCard(window.result[target.dataset.id]);
        map.insertBefore(moveCard, mapFilters);

        var cardsAmount = document.querySelectorAll('.map__card');

        if (cardsAmount.length !== 1) {
          window.closePopup();
        }
        document.addEventListener('keydown', onPopupEscPress);
        return;
      }
      target = target.parentNode;
    }
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closePopup();
    }
  };

  window.closePopup = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var mainPinToStartPosition = function () {
    mapPinMain.style.left = INIT_X + 'px';
    mapPinMain.style.top = INIT_Y + 'px';
  };

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

      if (moveY <= MIN_Y - mainPinWidth - ARROWHEIGHT) {
        moveY = MIN_Y - mainPinWidth - ARROWHEIGHT + 'px';
      } else if (moveY >= MAX_Y - mainPinWidth - ARROWHEIGHT) {
        moveY = MAX_Y - mainPinWidth - ARROWHEIGHT + 'px';
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

  window.map = {
    ESC_KEYCODE: ESC_KEYCODE,
    adForm: adForm,
    onPopupEscPress: onPopupEscPress,
    pinsContainer: pinsContainer,
    fragment: fragment,
  };
})();
