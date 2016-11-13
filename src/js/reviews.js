/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

var load = require('./load');
var Review = require('./review');
var filters = require('./filters');

module.exports = (function() {
  var DATA_URL = 'http://localhost:1507/api/reviews';

  var paramsToLoad = {
    from: 0,
    to: 3,
    filter: 'reviews-all'
  };

  var reviews = {
    /**
     * Загрузка данных по отзывам
     */
    loadReviews: function() {
      filters.hideFilters();

      load(DATA_URL, paramsToLoad, this.render);
    },

    /**
     * Рендер отзывов
     * @param {Array} data массив полученных с сервера данных
     */
    render: function(data) {
      if (data.length > 0) {
        filters.showFilters();

        var reviewListElement = document.querySelector('.reviews-list');

        data.forEach(function(item) {
          var review = new Review(item);
          reviewListElement.appendChild(review);
        });
      }
    },

    /**
     * Удаление списка отзывов
     */
    remove: function() {
      var reviewListElement = document.querySelector('.reviews-list');

      reviewListElement.innerHTML = '';

      paramsToLoad.from = 0;
    }
  };

  /**
   * Событие загрузки отзывов
   * @type {Element}
   */
  var moreReviewsBtn = document.querySelector('.reviews-controls-more');

  moreReviewsBtn.addEventListener('click', function() {
    var pageDifference = paramsToLoad.to - paramsToLoad.from;

    paramsToLoad.from += pageDifference;
    paramsToLoad.to += pageDifference;

    load('/api/reviews', paramsToLoad, reviews.render);
  });

  /**
   * Событие фильтрации
   * @type {Element}
   */
  var filterList = document.querySelector('.reviews-filter');

  filterList.addEventListener('change', function(e) {
    var target = e.target;

    if (target.name === 'reviews') {
      reviews.remove();

      paramsToLoad.filter = target.id;
      load('/api/reviews', paramsToLoad, reviews.render);
    }
  }, true);

  return reviews;
})();
