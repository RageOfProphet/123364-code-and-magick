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
   * Возвращает рейтинг отзыва
   * @returns {String}
   */
  getRating: function() {
    return this.data.rating;
  },

  /**
   * Переключение рейтингаx
   * @param {String} [switcher = plus|minus] - переключатель
   * @param callback
   */
  switchRating: function(switcher, callback) {
    var check = false;

    switch (switcher) {
      case 'plus': {
        if (this.getRating() < 5) {
          this.data.rating += 1;

          check = true;
        }
        break;
      }
      case 'minus': {
        if (this.getRating() > 1) {
          this.data.rating -= 1;

          check = true;
        }
        break;
      }
      default:
        break;
    }

    if (check) {
      callback();
    }
  },

  /**
   * Возвращает контент отзыва
   * @returns {String}
   */
  getDescription: function() {
    return this.data.description;
  },

  /**
   * Возвращает аватар автора отзыва
   * @returns {String}
   */
  getAuthorAvatar: function() {
    return this.data.author.picture;
  },

  /**
   * Возвращает имя автора отзыва
   * @returns {String}
   */
  getAuthorName: function() {
    return this.data.author.name;
  }
};

module.exports = ReviewData;
