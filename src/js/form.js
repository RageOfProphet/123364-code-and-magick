'use strict';

module.exports = (function() {
  var form = {
    onClose: null,
    RATING_PRECINCT: 3,

    element: {
      formContainer: document.querySelector('.overlay-container'),
      formCloseButton: document.querySelector('.review-form-close'),
      formOpenButton: document.querySelector('.reviews-controls-new'),
      formElement: document.forms.reviewForm,
      formReviewButtons: this.element.formElement.querySelector('.review-form-group-mark'),
      reviewFields: this.element.formElement.querySelector('.review-fields'),
      reviewFormFields: this.element.formElement.querySelectorAll('.review-form-field'),
      reviewFieldsLabel: document.querySelectorAll('.review-fields-label'),
      submitButton: this.element.formElement.querySelector('.review-submit'),
      rating: this.element.formReviewButtons.querySelector('[name="review-mark"]:checked'),
      reviewField: document.getElementById('review-text')
    },

    /**
     * Иницилизация фунций при загрузке страницы
     */
    initialize: function() {
      this.initCookie('review-mark');
      this.initCookie('review-name');

      this.checkReviewField();
      this.checkRequiredFields();
    },

    /**
     * Устанавливает куки при загрузке страницы
     * @param {String} name название куки
     */
    initCookie: function(name) {
      var cookie = Cookies.get(name); // eslint-disable-line
      if (cookie !== undefined) { // eslint-disable-line
        var input = this.element.formElement.elements[name];

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

    /**
     * Возвращает время куки
     * @returns {Number}
     */
    getCookieExpires: function() {
      var currentDay = new Date();
      var hooperBirthday = new Date(currentDay.getFullYear(), 11, 9);

      if (hooperBirthday.valueOf() <= currentDay.valueOf()) {
        return Math.ceil(new Date(currentDay - hooperBirthday).valueOf() / 86400000);
      }

      var hooperLastBirthDay = new Date(currentDay.getFullYear() - 1, 11, 9);
      return Math.ceil(new Date(currentDay - hooperLastBirthDay).valueOf() / 86400000);
    },

    /**
     * Открытие модального окна
     */
    open: function() {
      this.element.formContainer.classList.remove('invisible');
    },

    /**
     * Закрытие модального окна
     */
    close: function() {
      this.element.formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    /**
     * Добавление пункта в «Осталось заполнить»
     * @param {Element} input
     */
    addLabel: function(input) {
      var inputId = input.id;
      var label = this.element.reviewFields.querySelector('[for="' + inputId + '"]');

      label.classList.remove('invisible');

      this.removeLabelList();
    },

    /**
     * Удаление пункта в поле «Осталось заполнить»
     * @param {Element} input
     */
    removeLabel: function(input) {
      var inputId = input.id;
      var label = this.element.reviewFields.querySelector('[for="' + inputId + '"]');

      label.classList.add('invisible');

      this.removeLabelList();
    },

    /**
     * Скрывает или показывает поле «Осталось заполнить»
     */
    removeLabelList: function() {
      var flag = true;

      for (var i = 0; i < this.element.reviewFieldsLabel.length; i++) {
        if (!this.element.reviewFieldsLabel[i].classList.contains('invisible')) {
          flag = false;

          break;
        }
      }

      if (flag) {
        this.element.reviewFields.classList.add('invisible');
      } else {
        this.element.reviewFields.classList.remove('invisible');
      }
    },

    /**
     * Отключение/включение кнопки отправки данных
     * @param {Boolean} flag
     */
    disableSubmitButton: function(flag) {
      if (flag) {
        this.element.submitButton.setAttribute('disabled', 'true');
      } else {
        this.element.submitButton.removeAttribute('disabled');
      }
    },

    /**
     * Валидация обязательных полей
     * Проверка на заполнение
     */
    checkRequiredFields: function() {
      var flag = false;

      for (var i = 0; i < this.element.reviewFormFields.length; i++) {
        if (this.element.reviewFormFields[i].hasAttribute('required')) {
          if (this.element.reviewFormFields[i].value.length === 0) {
            flag = true;
            this.addLabel(this.element.reviewFormFields[i]);
          } else {
            this.removeLabel(this.element.reviewFormFields[i]);
          }
        }
      }

      if (flag) {
        this.disableSubmitButton(true);
      } else {
        this.disableSubmitButton(false);
      }
    },

    /**
     * Делает поле отзыва обязательным/необязательным,
     * в зависимости от рейтинга
     */
    checkReviewField: function() {
      if (+this.element.rating.value < form.RATING_PRECINCT) {
        this.element.reviewField.setAttribute('required', 'true');
        this.addLabel(this.element.reviewField);
      } else {
        this.element.reviewField.removeAttribute('required');
        this.removeLabel(this.element.reviewField);
      }
    }
  };

  // Закрытие модального окна
  this.element.formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  // Открытие модального окна
  this.element.formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    form.open();
  };

  // Клик на звезды рейтинга
  this.element.formReviewButtons.onclick = function(evt) {
    var target = evt.target || evt.srcElement;
    var reviewRating = null;

    // Если нажал на звездочку
    if (target.getAttribute('name') === 'review-mark') {
      reviewRating = +target.value;

      // Записать в куки
      Cookies.set('review-mark', reviewRating, { expires: form.getCookieExpires() }); // eslint-disable-line

      form.checkReviewField();
      form.checkRequiredFields();
    }
  };

  // Обработчик на инпуты
  Array.prototype.forEach.call(this.element.reviewFormFields, function(item) {
    item.oninput = function() {
      // Если поле имени, записать в куки
      if (item.getAttribute('name') === 'review-name') {
        Cookies.set('review-name', item.value, { expires: form.getCookieExpires() }); // eslint-disable-line
      }

      form.checkRequiredFields();
    };
  });

  // Запуск настроек по-умолчанию
  form.initialize();

  return form;
})();
