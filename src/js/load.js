/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

var getPage = require('../../bin/data/get-page');
var filter = require('../../bin/data/filter');

var moreReviewsBtn = document.querySelector('.reviews-controls-more');

/**
 * Отправка XMLHttpRequest запроса
 * @param {String} url адрес запроса
 * @param {Object} params параметры запроса
 * @param {Function} callback
 */
module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url + '?' + JSON.stringify(params));

  xhr.onload = function(e) {
    var request = JSON.parse(e.currentTarget.response);

    // Фильтрация отзыва
    var filteredList = filter(request, params.filter);

    // Если есть еще отзывы, показать кнопку «Ещё отзывы»
    if (filteredList.length > params.to) {
      moreReviewsBtn.classList.remove('invisible');
    } else {
      moreReviewsBtn.classList.add('invisible');
    }

    // Получение нужной страницы
    var data = getPage(filteredList, params.from, params.to);

    callback(data);
  };

  xhr.onerror = function() {
    console.log('Ошибка ' + this.status);
  };

  xhr.send();
};
