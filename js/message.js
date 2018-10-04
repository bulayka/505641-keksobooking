'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  function onMessageSuccessClose(evt) {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      var success = mainContainer.querySelector('.success');
      mainContainer.removeChild(success);
      mainContainer.removeEventListener('keydown', onMessageSuccessClose);
    }
  }

  function onMessageErrorClose(evt) {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      var error = mainContainer.querySelector('.error');
      mainContainer.removeChild(error);
      mainContainer.removeEventListener('keydown', onMessageErrorClose);
    }
  }

  window.messageSuccess = function () {
    var formSuccess = document.querySelector('#success').content.querySelector('.success');
    var cloneForm = formSuccess.cloneNode(true);
    mainContainer.appendChild(cloneForm);
    var elementSuccess = mainContainer.querySelector('.success');
    elementSuccess.addEventListener('click', function () {
      mainContainer.removeChild(elementSuccess);
    });

    mainContainer.addEventListener('keydown', onMessageSuccessClose);
  };

  window.messageError = function (errMess) {
    var formError = document.querySelector('#error').content.querySelector('.error');
    var cloneForm = formError.cloneNode(true);
    mainContainer.appendChild(cloneForm);
    var elemError = document.querySelector('.error');
    elemError.querySelector('.error__message').textContent = errMess;
    elemError.addEventListener('click', function () {
      mainContainer.removeChild(elemError);
    });
    mainContainer.addEventListener('keydown', onMessageErrorClose);
  };
})();
