'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formElement = document.forms.reviewForm;
  var formReviewButtons = formElement.querySelector('.review-form-group-mark');
  var reviewFormFields = formElement.querySelectorAll('.review-form-field');
  var reviewFields = formElement.querySelector('.review-fields');
  var submitButton = formElement.querySelector('.review-submit');

  var form = {
    onClose: null,
    RATING_PRECINCT: 3,

    initialize: function() {
      this.setCookie('review-mark');
      this.setCookie('review-name');

      console.log(this.getCookieExpires());
    },

    // Устанавливает куки при загрузке страницы
    setCookie: function(name) {
      var cookie = Cookies.get(name); // eslint-disable-line
      if (cookie !== undefined) { // eslint-disable-line
        var input = formElement.elements[name];

        if (input.length > 1) {
          input = input[0];
        }

        switch (input.getAttribute('type')) {
          case 'text':
            input.value = cookie;
            break;
          case 'radio':
            document.querySelector('#' + name + '-' + cookie).setAttribute('checked', 'true');
        }
      }
    },

    getCookieExpires: function() {
      var currentDay = new Date().valueOf();
      var hooperBirthday = new Date(1992, 11, 9).valueOf();

      return Math.ceil(new Date(currentDay - hooperBirthday).valueOf() / 86400000);
    },

    open: function() {
      formContainer.classList.remove('invisible');
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    removeLabel: function(input) {
      var inputId = input.id;
      var label = reviewFields.querySelector('[for="' + inputId + '"]');

      if (input.value.length > 0) {
        label.classList.add('invisible');
      } else {
        label.classList.remove('invisible');
      }

      this.removeLabelList();
    },

    removeLabelList: function() {
      var flag = true;

      for (var i = 0; i < reviewFormFields.length; i++) {
        if (reviewFormFields[i].value.length === 0) {
          flag = false;

          break;
        }
      }

      if (flag) {
        reviewFields.classList.add('invisible');
      } else {
        reviewFields.classList.remove('invisible');
      }
    },

    /*
    * Проверяет, есть ли в строке числа.
    * Использую для валидации имени
     */
    hasNumber: function(str) {
      return str.split('').some(function(ch) {
        return +(ch);
      });
    },

    // Если поле имени, проверить на числа в строке
    checkName: function(item) {
      if (item.getAttribute('name') === 'review-name') {
        // Записать в куки
        Cookies.set('review-name', item.value, { expires: form.getCookieExpires() }); // eslint-disable-line

        if (form.hasNumber(item.value)) {
          submitButton.setAttribute('disabled', 'true');
        } else {
          submitButton.removeAttribute('disabled');
        }
      }
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    form.open();
  };

  // Обработчик отзывов
  formReviewButtons.onclick = function(evt) {
    var target = evt.target || evt.srcElement;
    var reviewRating = null;
    var reviewText = document.getElementById('review-text');

    // Если нажал на звездочку
    if (target.getAttribute('name') === 'review-mark') {
      reviewRating = +target.value;

      // Записать в куки
      Cookies.set('review-mark', reviewRating, { expires: form.getCookieExpires() }); // eslint-disable-line

      // Если оценка отзыва меньше заданной, сделать поле отзыва обязательным
      if (reviewRating < form.RATING_PRECINCT) {
        reviewText.setAttribute('required', 'true');
      } else {
        reviewText.removeAttribute('required');
      }
    }
  };

  // Вешаю обработчик на каждое текстовое поле
  reviewFormFields.forEach(function(item) {
    item.oninput = function(evt) {
      var target = evt.target;

      // Если поле имени, запустить валидацию на числа в строке
      form.checkName(item);

      form.removeLabel(target);
    };
  });

  form.initialize();

  return form;
})();
