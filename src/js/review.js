/**
 * Created by Dmitry Bezugly on 30.10.2016.
 */

'use strict';

module.exports = (function() {
  var IMAGE_LOAD_TIMEOUT = 10000;

  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;

  var review = {
    /**
     * Создание отзыва
     * @param {Object} reviewItemData данные по отзыву
     * @returns {Element}
     */
    createReview: function(reviewItemData) {
      var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
      var reviewText = reviewElement.querySelector('.review-text');
      var reviewRating = reviewElement.querySelector('.review-rating');

      this.fillImage(reviewElement, reviewItemData);
      reviewRating.classList.add(this.getRatingClass(reviewItemData.rating));
      reviewText.textContent = reviewItemData.description;

      return reviewElement;
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
     * @param {Element} reviewContainer контейнер с отзывом
     * @param {Object} reviewData данные с сервера
     * @returns {Element}
     */
    fillImage: function(reviewContainer, reviewData) {
      var image = new Image(124, 124);
      var imageTimeout = null;
      var reviewImage = reviewContainer.querySelector('.review-author');

      image.onload = function() {
        clearTimeout(imageTimeout);
        reviewImage.src = reviewData.author.picture;
      };

      image.onerror = function() {
        reviewContainer.classList.add('review-load-failure');
      };

      image.src = reviewData.author.picture;
      reviewImage.alt = reviewData.author.name;
      reviewImage.title = reviewData.author.name;

      imageTimeout = setTimeout(function() {
        image.src = '';
        reviewContainer.classList.add('review-load-failure');
      }, IMAGE_LOAD_TIMEOUT);
    }
  };

  return review;
})();
