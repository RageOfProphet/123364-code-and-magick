/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

var load = require('./load');
var Review = require('./review');
var filters = require('./filters');

module.exports = (function() {
  var DATA_URL = 'http://localhost:1507/api/reviews';

  var reviews = {
    /**
     * Загрузка данных по отзывам
     */
    loadReviews: function() {
      filters.hideFilters();
      load(DATA_URL);
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
    }
  };

  return reviews;
})();
