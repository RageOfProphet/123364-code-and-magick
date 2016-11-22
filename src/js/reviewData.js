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
   * Добавляет в данные полезность отзыва
   * @param {Boolean} mark - полезный/неполезный отзыв
   * @param callback
   */
  usefullness: function(mark, callback) {
    this.data.usefullness = mark;

    callback();
  },

  /**
   * Возвращает значение полезности отзыва
   * @returns {Boolean}
   */
  getUsefullness: function() {
    return this.data.usefullness;
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
