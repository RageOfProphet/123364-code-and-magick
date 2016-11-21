/**
 * Created by Dmitry Bezugly on 30.10.2016.
 */

'use strict';

var ReviewsData = require('./reviewData');
var assign = require('./assign');

module.exports = (function() {
  var IMAGE_LOAD_TIMEOUT = 10000;

  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;

  var Review = function(reviewItemData) {
    this.element = templateContainer.querySelector('.review').cloneNode(true);

    this.answerList = this.element.querySelectorAll('.review-quiz-answer');

    ReviewsData.call(this, reviewItemData);
  };

  assign(Review, ReviewsData);

  Review.prototype.render = function() {
    var reviewText = this.element.querySelector('.review-text');
    var reviewRating = this.element.querySelector('.review-rating');

    this.fillImage();
    reviewRating.classList.add(this.getRatingClass(this.getContent('rating')));
    reviewText.textContent = this.getContent('description');

    this.setEvaluationListener();

    return this.element;
  };

  /**
   * Установка обработчиков на варианты ответа
   */
  Review.prototype.setEvaluationListener = function() {
    Array.prototype.forEach.call(this.answerList, function(answer) {
      answer.addEventListener('click', this._onClick.bind(this));
    }.bind(this));
  };

  /**
   * Обработчик клика
   * @param e - нажатый элемент
   * @private
   */
  Review.prototype._onClick = function(e) {
    Array.prototype.forEach.call(this.answerList, function(item) {
      item.classList.remove('review-quiz-answer-active');
    });

    e.target.classList.add('review-quiz-answer-active');
  };

  /**
   * Удаление обработчиков
   */
  Review.prototype.remove = function() {
    var answerList = this.element.querySelectorAll('.review-quiz-answer');

    Array.prototype.forEach.call(answerList, function(answer) {
      answer.onclick = null;
    });
  };

  /**
   * Получение класса для рейтинга
   * @param {Number} stars
   * @returns {String}
   */
  Review.prototype.getRatingClass = function(stars) {
    var className = '';

    switch (stars) {
      case 1:
        className = 'review-rating-one';
        break;
      case 2:
        className = 'review-rating-two';
        break;
      case 3:
        className = 'review-rating-three';
        break;
      case 4:
        className = 'review-rating-four';
        break;
      case 5:
        className = 'review-rating-five';
        break;
      default:
        break;
    }

    return className;
  };

  /**
   * Заполнение картинки
   */
  Review.prototype.fillImage = function() {
    var image = new Image(124, 124);
    var imageTimeout = null;
    var reviewImage = this.element.querySelector('.review-author');

    image.onload = function() {
      clearTimeout(imageTimeout);
      reviewImage.src = this.getContent(['author', 'picture']);
    }.bind(this);

    image.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);

    image.src = this.getContent(['author', 'picture']);
    reviewImage.alt = this.getContent(['author', 'name']);
    reviewImage.title = this.getContent(['author', 'name']);

    imageTimeout = setTimeout(function() {
      image.src = '';
      this.element.classList.add('review-load-failure');
    }.bind(this), IMAGE_LOAD_TIMEOUT);
  };

  return Review;
})();
