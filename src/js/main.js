'use strict';

(function() {
  var Game = require('./game');
  var form = require('./form');
  var reviews = require('./reviews');
  var Gallery = require('./gallery');

  var game = new Game(document.querySelector('.demo'));

  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

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
  reviews.loadReviews();

  /**
   * Запуск рендера отзывов
   * @param {Array} data
   */
  window.renderReviews = function(data) {
    reviews.render(data);
  };

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

  // Обработчик на каждый контейнер с картинкой
  for (var i = 0; i < imagesContainers.length; i++) {
    imagesContainers[i].onclick = function() {
      var currentImage = this.querySelector('img');
      var pictureNumber = null;

      pictures.forEach(function(imageSrc, index) {
        if (imageSrc === currentImage.src) {
          pictureNumber = index;
        }
      });

      gallery.show(pictureNumber);
    };
  }
})();
