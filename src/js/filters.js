/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

module.exports = (function() {
  var Filters = function() {};

  Filters.prototype = {
    /**
     * Скрытие блока с фильтрами
     */
    hideFilters: function() {
      var filterList = document.querySelector('.reviews-filter');

      filterList.classList.add('invisible');
    },

    /**
     * Появление блока с фильтрами
     */
    showFilters: function() {
      var filterList = document.querySelector('.reviews-filter');

      filterList.classList.remove('invisible');
    },

    setCurrentFilter: function() {
      if (localStorage.getItem('filter')) {
        document.querySelector('#' + localStorage.getItem('filter')).checked = true;
      }
    }
  };

  return Filters;
})();
