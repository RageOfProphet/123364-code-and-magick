/**
 * Created by Dmitry Bezugly on 30.10.2016.
 */

'use strict';

module.exports = (function() {
  var IMAGE_LOAD_TIMEOUT = 10000;

  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;

  var Review = function(reviewItemData) {
    this.data = reviewItemData;
    this.element = templateContainer.querySelector('.review').cloneNode(true);

    var reviewText = this.element.querySelector('.review-text');
    var reviewRating = this.element.querySelector('.review-rating');

    this.fillImage();
    reviewRating.classList.add(this.getRatingClass(this.data.rating));
    reviewText.textContent = this.data.description;

    /**
     * Установка обработчиков на варианты ответа
     */
    var setEvaluationListener = function() {
      var answerList = this.element.querySelectorAll('.review-quiz-answer');

      Array.prototype.forEach.call(answerList, function(answer) {
        answer.onclick = function() {
          Array.prototype.forEach.call(answerList, function(item) {
            item.classList.remove('review-quiz-answer-active');
          });

          this.classList.add('review-quiz-answer-active');
        };
      });
    }.bind(this);

    setEvaluationListener();

    return this.element;
  };

  Review.prototype = {
    /**
     * Удаление обработчиков
     */
    remove: function() {
      var answerList = this.element.querySelectorAll('.review-quiz-answer');

      Array.prototype.forEach.call(answerList, function(answer) {
        answer.onclick = null;
      });
    },

    /**
     * Получение класса для рейтинга
     * @param {Number} stars
     * @returns {String}
     */
    getRatingClass: function(stars) {
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
    },

    /**
     * Заполнение картинки
     */
    fillImage: function() {
      var image = new Image(124, 124);
      var imageTimeout = null;
      var reviewImage = this.element.querySelector('.review-author');
      var self = this;

      image.onload = function() {
        clearTimeout(imageTimeout);
        reviewImage.src = self.data.author.picture;
      };

      image.onerror = function() {
        self.element.classList.add('review-load-failure');
      };

      image.src = this.data.author.picture;
      reviewImage.alt = this.data.author.name;
      reviewImage.title = this.data.author.name;

      imageTimeout = setTimeout(function() {
        image.src = '';
        self.element.classList.add('review-load-failure');
      }, IMAGE_LOAD_TIMEOUT);
    }
  };

  return Review;
})();
