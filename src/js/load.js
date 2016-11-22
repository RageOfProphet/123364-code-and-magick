/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

/**
 * Отправка XMLHttpRequest запроса
 * @param {String} url адрес запроса
 * @param {Object} params параметры запроса
 * @param {Function} callback
 */
module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();
  var urlArray = [];

  Object.keys(params).forEach(function(key) {
    urlArray.push([key + '=' + params[key]]);
  });

  xhr.open('GET', url + '?' + urlArray.join('&'));

  xhr.onload = function(e) {
    callback(JSON.parse(e.currentTarget.response));
  };

  xhr.onerror = function() {
    throw new Error(this.status);
  };

  xhr.send();
};
