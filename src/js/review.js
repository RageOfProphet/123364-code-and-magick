/**
 * Created by Dmitry Bezugly on 30.10.2016.
 */

'use strict';

var ReviewsData = require('./reviewData');

module.exports = (function() {
  var IMAGE_LOAD_TIMEOUT = 10000;

  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;

  var Review = function(reviewItemData) {
    this.element = templateContainer.querySelector('.review').cloneNode(true);

    this.answerList = this.element.querySelectorAll('.review-quiz-answer');

    this.reviewRating = this.element.querySelector('.review-rating');

    this.data = new ReviewsData(reviewItemData);

    this.setEvaluationListener();
  };

  Review.prototype.render = function() {
    var reviewText = this.element.querySelector('.review-text');

    this.fillImage();
    this.setCurrentRating();
    reviewText.textContent = this.data.getDescription();

    return this.element;
  };

  /**
   * Устанавливает нужный класс
   */
  Review.prototype.setCurrentRating = function() {
    this.reviewRating.classList.remove(this.reviewRating.classList[1]);
    this.reviewRating.classList.add(this.getRatingClass());
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
    if (e.target.classList.contains('review-quiz-answer-yes')) {
      this.data.usefullness(true, this.setUsefullness.bind(this));
    } else {
      this.data.usefullness(false, this.setUsefullness.bind(this));
    }
  };

  /**
   * Обновление интерфейса объектов голосования
   */
  Review.prototype.setUsefullness = function() {
    Array.prototype.forEach.call(this.answerList, function(item) {
      item.classList.remove('review-quiz-answer-active');
    });

    // Если отзыв полезный, выделяем «Да», иначе «Нет»
    if (this.data.getUsefullness()) {
      this.answerList[0].parentNode.querySelector('.review-quiz-answer-yes')
        .classList.add('review-quiz-answer-active');
    } else {
      this.answerList[0].parentNode.querySelector('.review-quiz-answer-no')
        .classList.add('review-quiz-answer-active');
    }
  };

  /**
   * Удаление обработчиков
   */
  Review.prototype.removeListeners = function() {
    Array.prototype.forEach.call(this.answerList, function(answer) {
      answer.removeEventListener('click', this._onClick.bind(this));
    }.bind(this));
  };

  /**
   * Получение класса для рейтинга
   * @returns {String}
   */
  Review.prototype.getRatingClass = function() {
    var classNames = [
      'review-rating-one',
      'review-rating-two',
      'review-rating-three',
      'review-rating-four',
      'review-rating-five'
    ];

    return classNames[this.data.getRating() - 1];
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
      reviewImage.src = this.data.getAuthorAvatar();
    }.bind(this);

    image.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);

    image.src = this.data.getAuthorAvatar();
    reviewImage.alt = this.data.getAuthorName();
    reviewImage.title = this.data.getAuthorName();

    imageTimeout = setTimeout(function() {
      image.src = '';
      this.element.classList.add('review-load-failure');
    }.bind(this), IMAGE_LOAD_TIMEOUT);
  };

  return Review;
})();
