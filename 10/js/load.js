/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

/**
 * Отправка JSONP запроса
 * @param {String} url адрес запроса
 */
module.exports = function(url) {
  var script = document.createElement('script');
  script.src = url + '?callback=renderReviews';
  document.body.appendChild(script);
};
