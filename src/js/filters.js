/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

var BaseComponent = require('./baseComponent');
var inherit = require('./inherit');

module.exports = (function() {
  var Filters = function() {
    var filterList = document.querySelector('.reviews-filter');

    BaseComponent.call(this, filterList);
  };

  inherit(Filters, BaseComponent);

  /**
   * Скрытие блока с фильтрами
   */
  Filters.prototype.hideFilters = function() {
    this.el.classList.add('invisible');
  };

  /**
   * Появление блока с фильтрами
   */
  Filters.prototype.showFilters = function() {
    this.el.classList.remove('invisible');
  };

  /**
   * Установка фильтра из localStorage
   */
  Filters.prototype.setCurrentFilter = function() {
    if (localStorage.getItem('filter')) {
      document.querySelector('#' + localStorage.getItem('filter')).checked = true;
    }
  };

  return Filters;
})();
