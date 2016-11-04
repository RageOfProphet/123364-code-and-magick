'use strict';

(function() {
  var Game = require('./game');
  var form = require('./form');
  var reviewList = require('./review');

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
   * Запуск рендера отзывов
   * @param {Array} data
   */
  window.renderReviews = function(data) {
    reviewList.render(data);
  };
})();
