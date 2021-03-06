'use strict';

(function() {
  var Game = require('./game');
  var Form = require('./form');
  var Reviews = require('./reviews');
  var Gallery = require('./gallery');

  var form = new Form();
  var game = new Game(document.querySelector('.demo'));

  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);
  game.parallax();

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  form.onClose = function() {
    game.setDeactivated(false);
  };

  /**
   * Отзывы
   */
  var reviews = new Reviews();
  reviews.loadReviews();

  /**
   * Галерея
   */
  var imagesContainers = document.querySelectorAll('.photogallery-image');
  var pictures = [];

  // В массив pictures записываем ссылки на картинки
  Array.prototype.forEach.call(imagesContainers, function(container) {
    pictures.push(container.querySelector('img').src);
  });

  var gallery = new Gallery(pictures);

  // Проверка хэша. Открытие фотографии, если есть ссылка на фото.
  gallery.checkHash(location.hash.match(/#photo\/(\S+)/));

  // Обработчик на каждый контейнер с картинкой
  for (var i = 0; i < imagesContainers.length; i++) {
    imagesContainers[i].onclick = function() {
      var currentImage = this.querySelector('img');
      location.hash = 'photo' + currentImage.src.replace(location.origin, '');
    };
  }
})();
