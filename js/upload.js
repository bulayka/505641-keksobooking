'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var Preview = {
    WIDTH: 70,
    HEIGHT: 70
  };
  var form = document.querySelector('.ad-form');
  var formHeader = form.querySelector('.ad-form-header__upload');
  var avatar = formHeader.querySelector('#avatar');
  var headerImg = formHeader.querySelector('img');
  var formPhoto = form.querySelector('.ad-form__photo-container');
  var images = formPhoto.querySelector('#images');
  var formImage = formPhoto.querySelectorAll('.ad-form__photo');

  var matches = function (name) {
    return FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
  };

  var render = function (file, fileReaderCB) {
    var fileName = file.name.toLowerCase();

    if (matches(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', fileReaderCB);
      reader.readAsDataURL(file);
      if (reader.readyState === 2) {
        reader.removeEventListener('load', fileReaderCB);
      }
    }
  };

  var createPreview = function (file) {
    var preview = document.createElement('div');
    var pic = new Image(Preview.WIDTH, Preview.HEIGHT);
    pic.src = file;
    preview.classList.add('ad-form__photo');
    preview.draggable = true;
    preview.appendChild(pic);
    return preview;
  };

  var showAvatar = function (evt) {
    headerImg.src = evt.currentTarget.result;
  };

  var showImages = function (evt) {
    var file = evt.currentTarget.result;
    var card = createPreview(file);
    card.id = 'draggable-' + evt.loaded;
    card.addEventListener('dragstart', onDragStart);
    formPhoto.appendChild(card);
  };

  var onAvatarLoad = function () {
    var file = avatar.files[0];
    render(file, showAvatar);
  };

  var onImagesLoad = function () {
    var files = Array.from(images.files);
    images.multiple = true;
    formImage[0].classList.add('visually-hidden');
    files.forEach(function (file) {
      render(file, showImages);
    });
  };

  var toggleUpload = function (item) {
    item.classList.remove('visually-hidden');
  };

  var setActived = function () {
    toggleUpload(avatar);
    toggleUpload(images);
    images.multiple = true;
    avatar.addEventListener('change', onAvatarLoad);
    images.addEventListener('change', onImagesLoad);
  };

  var setDisabled = function () {
    var cards = Array.from(formImage);
    avatar.removeEventListener('change', onAvatarLoad);
    images.removeEventListener('change', onImagesLoad);
    cards.forEach(function (card) {
      card.removeEventListener('dragstart', onDragStart);
    });
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
  };

  var onDrop = function (evt) {
    var dragged = evt.dataTransfer.getData('id', evt.currentTarget.id);
    evt.preventDefault();
    formPhoto.appendChild(document.querySelector('#' + dragged));
    formPhoto.removeEventListener('dragover', onDragOver);
    evt.currentTarget.removeEventListener('drop', onDrop);
  };

  var onDragStart = function (evt) {
    evt.dataTransfer.setData('id', evt.currentTarget.id);
    formPhoto.addEventListener('dragover', onDragOver);
    formPhoto.addEventListener('drop', onDrop);
  };

  window.upload = {
    setActived: setActived,
    setDisabled: setDisabled
  };
})();
