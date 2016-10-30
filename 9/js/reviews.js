/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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
	        var reviewListElement = document.querySelector('.reviews-list');
	
	        this.hideFilters();
	
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
	     * Создание отзыва
	     * @param {Object} reviewItemData данные по отзыву
	     * @returns {Element}
	     */
	    createReview: function(reviewItemData) {
	      var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
	      var reviewRating = reviewElement.querySelector('.review-rating');
	      var reviewText = reviewElement.querySelector('.review-text');
	
	      this.fillImage(reviewElement, reviewItemData);
	      reviewRating.textContent = reviewItemData.rating;
	      reviewText.textContent = reviewItemData.description;
	
	      return reviewElement;
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
	        reviewContainer.classList.add('review-load-failure');
	      }, IMAGE_LOAD_TIMEOUT);
	    }
	  };
	
	  reviewList.getReviewsData(DATA_URL, JSONP_FUNCTION_NAME);
	
	  return reviewList;
	})();


/***/ }
/******/ ]);
//# sourceMappingURL=reviews.js.map?dropcache