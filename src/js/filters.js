/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

module.exports = (function() {
  var filters = {
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
    }
  };

  return filters;
})();
