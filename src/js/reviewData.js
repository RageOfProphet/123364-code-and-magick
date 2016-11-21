/**
 * Created by Dmitry Bezugly on 21.11.2016.
 */

'use strict';

/**
 * Обрабатывает данные с сервера
 * @param {Object} data
 * @constructor
 */
var ReviewData = function(data) {
  this.data = data;
};

ReviewData.prototype = {
  /**
   * Возвращает строку запрашиваемых данных
   * @param {String|Object} item - запрашиваемые данные
   * @returns {String}
   */
  getContent: function(item) {
    var result = this.data;

    switch (typeof item) {
      case 'string':
      case 'number': {
        result = this.data[item];

        break;
      }
      case 'object': {
        if (Array.isArray(item)) {
          item.forEach(function(key) {
            result = result[key];
          });
        }

        break;
      }
      default: {
        break;
      }
    }

    return result;
  }
};

module.exports = ReviewData;
