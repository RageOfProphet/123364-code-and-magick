/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

var load = require('./load');
var Review = require('./review');
var Filters = require('./filters');

var filters = new Filters();

module.exports = (function() {
  var Reviews = function() {
    this.DATA_URL = '/api/reviews';
    this.PAGE_LIMIT = 3;

    this.moreReviewsBtn = document.querySelector('.reviews-controls-more');
    this.filterList = document.querySelector('.reviews-filter');

    this.paramsToLoad = {
      from: 0,
      to: this.PAGE_LIMIT,
      filter: 'reviews-all'
    };
  };

  Reviews.prototype = {
    /**
     * Загрузка данных по отзывам
     */
    loadReviews: function() {
      filters.hideFilters();

      // Если в localStorage записан фильтр, применяем
      if (localStorage.getItem('filter')) {
        this.paramsToLoad.filter = localStorage.getItem('filter');
      }

      load(this.DATA_URL, this.paramsToLoad, this.render.bind(this));

      this._initializeReviewsListeners();
    },

    /**
     * Рендер отзывов
     * @param {Array} data массив полученных с сервера данных
     */
    render: function(data) {
      if (data.length === this.PAGE_LIMIT) {
        this.moreReviewsBtn.classList.remove('invisible');
      } else {
        this.moreReviewsBtn.classList.add('invisible');
      }

      if (data.length > 0) {
        filters.showFilters();

        filters.setCurrentFilter();

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

      this.paramsToLoad.from = 0;
    },

    /**
     * Загрузка отзывов
     * @type {Element}
     */
    _onClick: function() {
      var pageDifference = this.paramsToLoad.to - this.paramsToLoad.from;

      this.paramsToLoad.from += pageDifference;
      this.paramsToLoad.to += pageDifference;

      load('/api/reviews', this.paramsToLoad, this.render.bind(this));
    },

    /**
     * Фильтрация
     * @type {Element}
     */
    _onChange: function(e) {
      var target = e.target;

      if (target.name === 'reviews') {
        this.remove();

        this.paramsToLoad.from = 0;
        this.paramsToLoad.to = this.PAGE_LIMIT;
        this.paramsToLoad.filter = target.id;

        // Запись фильтра в localStorage
        localStorage.setItem('filter', target.id);
        load('/api/reviews', this.paramsToLoad, this.render.bind(this));
      }
    },

    /** @private */
    _initializeReviewsListeners: function() {
      this.moreReviewsBtn.addEventListener('click', this._onClick.bind(this));
      this.filterList.addEventListener('change', this._onChange.bind(this), true);
    }
  };

  return Reviews;
})();
