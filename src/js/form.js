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

  formReviewButtons.onclick = function(evt) {
    var target = evt.target || evt.srcElement;
    var reviewRating = null;
    var reviewText = document.getElementById('review-text');

    // Если нажал на звездочку
    if (target.getAttribute('name') === 'review-mark') {
      reviewRating = +target.value;

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

  return form;
})();
