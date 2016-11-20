/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

var BaseComponent = require('./baseComponent');
var assign = require('./assign');

module.exports = (function() {
  var Filters = function() {
    var filterList = document.querySelector('.reviews-filter');

    BaseComponent.call(this, filterList);
    assign(Filters, BaseComponent);
  };

  Filters.prototype = {
    /**
     * Скрытие блока с фильтрами
     */
    hideFilters: function() {
      this.el.classList.add('invisible');
    },

    /**
     * Появление блока с фильтрами
     */
    showFilters: function() {
      this.el.classList.remove('invisible');
    },

    /**
     * Установка фильтра из localStorage
     */
    setCurrentFilter: function() {
      if (localStorage.getItem('filter')) {
        document.querySelector('#' + localStorage.getItem('filter')).checked = true;
      }
    }
  };

  return Filters;
})();
