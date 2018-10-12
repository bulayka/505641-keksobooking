'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  function onMessageSuccessClose(evt) {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      var success = mainContainer.querySelector('.success');
      mainContainer.removeChild(success);
      document.removeEventListener('keydown', onMessageSuccessClose);
    }
  }

  function onMessageErrorClose(evt) {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      var error = mainContainer.querySelector('.error');
      mainContainer.removeChild(error);
      document.removeEventListener('keydown', onMessageErrorClose);
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

    document.addEventListener('keydown', onMessageSuccessClose);
  };

  window.messageError = function (errMess) {
    var formError = document.querySelector('#error').content.querySelector('.error');
    var cloneForm = formError.cloneNode(true);
    mainContainer.appendChild(cloneForm);
    var elementError = document.querySelector('.error');
    elementError.querySelector('.error__message').textContent = errMess;
    elementError.addEventListener('click', function () {
      mainContainer.removeChild(elementError);
    });
    document.addEventListener('keydown', onMessageErrorClose);
  };
})();
