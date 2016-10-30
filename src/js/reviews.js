/**
 * Created by Dmitry Bezugly on 30.10.2016.
 */

'use strict';

window.reviewList = (function() {
  var data = [{
    'author': {
      'name': 'Иванов Иван',
      'picture': 'img/user-1.jpg'
    },
    'review_usefulness': 10,
    'rating': 2,
    'description': 'Плохая игра: слишком сильно затягивает и невозможно оторваться. Я потерял работу, учебу, девушку и дар речи, но продолжаю играть. Это призыв о помощи: спасите.'
  }, {
    'author': {
      'name': 'Ксения Собчак',
      'picture': 'img/user-3.png'
    },
    'review_usefulness': 6,
    'rating': 5,
    'description': 'Все хорошо, мне нравится.'
  }, {
    'author': {
      'name': 'Ксюша Бородина',
      'picture': 'img/user-2.png'
    },
    'review_usefulness': 3,
    'rating': 1,
    'description': 'Все плохо, мне не нравится'
  }, {
    'author': {
      'name': 'Мария Антуанетта',
      'picture': 'img/user-1.jpg'
    },
    'review_usefulness': 4,
    'rating': 3,
    'description': 'Невероятно чумовая игра. Пендальф-синий — мой герой)))) Он такой милашка. Благодаря ему я наконец нацчилась отвлекаться от работы и учёбы.'
  }, {
    'author': {
      'name': 'Дмитрий Карпов',
      'picture': 'img/user-3.png'
    },
    'review_usefulness': 20,
    'rating': 4,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Максим Шаровары',
      'picture': 'img/user-1.jpg'
    },
    'review_usefulness': 115,
    'rating': 2,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Зулейха Валиева',
      'picture': 'img/user-3.png'
    },
    'review_usefulness': 10,
    'rating': 4,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Федор Непомнящих',
      'picture': 'img/user-2.png'
    },
    'review_usefulness': 10,
    'rating': 3,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Макаронный Монстр',
      'picture': 'img/user-1.jpg'
    },
    'review_usefulness': -3,
    'rating': 5,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Миклухо Маклай',
      'picture': 'img/user-3.png'
    },
    'review_usefulness': 0,
    'rating': 2,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Муравьев Апостол',
      'picture': 'img/user-2.png'
    },
    'review_usefulness': 0,
    'rating': 1,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Максим Горький',
      'picture': 'img/user-3.png'
    },
    'review_usefulness': 8,
    'rating': 3,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Аноним',
      'picture': 'img/ijwdoq'
    },
    'review_usefulness': 102,
    'rating': 3,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Иван Иванов',
      'picture': 'img/user-1.jpg'
    },
    'review_usefulness': 5,
    'rating': 4,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Василиса Васильева',
      'picture': 'img/user-2.png'
    },
    'review_usefulness': 0,
    'rating': 4,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Хороший Человек',
      'picture': 'img/user-2.png'
    },
    'review_usefulness': 24,
    'rating': 3,
    'description': 'Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди.'
  }, {
    'author': {
      'name': 'Гейб Ньюэлл',
      'picture': 'img/dwjiqo9'
    },
    'review_usefulness': 10,
    'rating': 5,
    'description': 'Игра очень интересная. Нравится возможность выбирать между героями, а самое крутое, что есть альтернативные концовки в игре. Она точно стоит своих денег.'
  }];

  var IMAGE_LOAD_TIMEOUT = 10000;

  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;

  var reviewList = {
    /**
     * Рендер отзывов
     */
    render: function() {
      var reviews = reviewList.getReviewsData();

      if (reviews.length > 0) {
        var reviewListElement = document.querySelector('.reviews-list');

        reviewList.hideFilters();

        reviews.forEach(function(item) {
          reviewListElement.appendChild(reviewList.createReview(item));
        });
      }
    },

    /**
     * Получание массива отзывов
     * @returns {Array}
     */
    getReviewsData: function() {
      var reviews = [];

      Object.keys(data).forEach(function(item) {
        reviews.push(data[item]);
      });

      return reviews;
    },

    /**
     * Скрытие блока с фильтрами
     */
    hideFilters: function() {
      var filters = document.querySelector('.reviews-filter');

      filters.classList.add('invisible');
    },

    /**
     * Создание отзыва
     * @param {Object} reviewItemData данные по отзыву
     * @returns {Element}
     */
    createReview: function(reviewItemData) {
      var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
      var reviewRating = reviewElement.querySelector('.review-rating');
      var reviewText = reviewElement.querySelector('.review-text');

      this.fillImage(reviewElement, reviewItemData);
      reviewRating.textContent = reviewItemData.rating;
      reviewText.textContent = reviewItemData.description;

      return reviewElement;
    },

    /**
     * Заполнение картинки
     * @param {Element} reviewContainer контейнер с отзывом
     * @param {Object} reviewData данные с сервера
     * @returns {Element}
     */
    fillImage: function(reviewContainer, reviewData) {
      var image = new Image(124, 124);
      var imageTimeout = null;
      var reviewImage = reviewContainer.querySelector('.review-author');

      image.onload = function() {
        clearTimeout(imageTimeout);
        reviewImage.src = reviewData.author.picture;
      };

      image.onerror = function() {
        reviewContainer.classList.add('review-load-failure');
      };

      image.src = reviewData.author.picture;
      reviewImage.alt = reviewData.author.name;
      reviewImage.title = reviewData.author.name;

      imageTimeout = setTimeout(function() {
        reviewContainer.classList.add('review-load-failure');
      }, IMAGE_LOAD_TIMEOUT);
    }
  };

  reviewList.render();

  return reviewList;
})();
