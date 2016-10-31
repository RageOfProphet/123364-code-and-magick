/**
 * Created by Dmitry Bezugly on 30.10.2016.
 */

'use strict';

window.reviewList = (function() {
  var DATA_URL = 'http://localhost:1507/api/reviews';
  var JSONP_FUNCTION_NAME = 'getData';
  var IMAGE_LOAD_TIMEOUT = 10000;

  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;

  var reviewList = {
    /**
     * Рендер отзывов
     * @param {Array} data массив полученных с сервера данных
     */
    render: function(data) {
      var reviews = data;

      if (reviews.length > 0) {
        this.showFilters();

        var reviewListElement = document.querySelector('.reviews-list');

        reviews.forEach(function(item) {
          reviewListElement.appendChild(reviewList.createReview(item));
        });
      }
    },

    /**
     * Отправка запроса на сервер и получание массива отзывов
     * @param {String} url адрес запроса
     * @param {String} callbackName название функции
     */
    getReviewsData: function(url, callbackName) {
      window[callbackName] = function(data) {
        reviewList.render(data);
      };

      var script = document.createElement('script');
      script.src = url + '?callback=' + callbackName;
      document.body.appendChild(script);
    },

    /**
     * Скрытие блока с фильтрами
     */
    hideFilters: function() {
      var filters = document.querySelector('.reviews-filter');

      filters.classList.add('invisible');
    },

    /**
     * Появление блока с фильтрами
     */
    showFilters: function() {
      var filters = document.querySelector('.reviews-filter');

      filters.classList.remove('invisible');
    },

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

  reviewList.hideFilters();
  reviewList.getReviewsData(DATA_URL, JSONP_FUNCTION_NAME);

  return reviewList;
})();
