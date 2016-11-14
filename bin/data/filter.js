'use strict';

/**
 * В зависимости от значения параметра filterID
 * возвращает список отзывов
 * @param {Array} list - список отзывов
 * @param {String} filterID - айди фильтра
 * @returns {Array}
 */
module.exports = function(list, filterID) {
  switch (filterID) {
    /*
    * reviews-all, все отзывы — список отзывов,
    * показываемый пользователю по умолчанию
    * */
    case 'reviews-all':
      return list;
    /*
    * reviews-recent, недавние — список отзывов, сделанных
    * за последние три дня, отсортированный по убыванию даты (поле created)
     */
    case 'reviews-recent':
      var threeDaysValue = 1000 * 60 * 60 * 24 * 3;
      var threeDaysAgo = (new Date() - threeDaysValue).valueOf();

      return list.filter(function(review) {
        return review.created >= threeDaysAgo;
      }).sort(function(a, b) {
        return b.created - a.created;
      });
    /*
    * reviews-good, хорошие — список отзывов с оценкой не ниже 3,
    * отсортированный по убыванию оценки (поле rating)
     */
    case 'reviews-good':
      return list.filter(function(review) {
        return review.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
    /*
    * reviews-bad, плохие — список отзывов с оценкой ниже 3,
    * отсортированный по возрастанию оценки (поле rating)
     */
    case 'reviews-bad':
      return list.filter(function(review) {
        return review.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
    /*
    * reviews-popular, популярные — список отзывов, отсортированный
    * по убыванию полезности отзыва (поле review_usefulness)
     */
    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
    default:
      break;
  }
};
