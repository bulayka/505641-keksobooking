'use strict';

(function () {
  window.getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.getRandomElement = function (array) {
    var index = window.getRandomNumber(0, array.length - 1);
    return array[index];
  };

  window.getRandomArrayItem = function (array) {
    return window.getRandomNumber(0, array.length - 1);
  };

  window.getRandomArrayList = function (array, length) {
    var list = [];

    for (var i = 0; i < length; i++) {
      var item = array[window.getRandomArrayItem(array)];
      if (list.indexOf(item) === -1) {
        list.push(item);
      }
    }

    return list;
  };

  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  window.getAvatarUrl = function (index) {
    return 'img/avatars/user0' + index + '.png';
  };
})();
