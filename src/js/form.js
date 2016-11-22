'use strict';

module.exports = (function() {
  var Form = function() {
    this.onClose = null;
    this.RATING_PRECINCT = 3;

    this.formContainer = document.querySelector('.overlay-container');
    this.formCloseButton = document.querySelector('.review-form-close');
    this.formOpenButton = document.querySelector('.reviews-controls-new');
    this.formElement = document.forms.reviewForm;
    this.formReviewButtons = this.formElement.querySelector('.review-form-group-mark');
    this.reviewFields = this.formElement.querySelector('.review-fields');
    this.reviewFormFields = this.formElement.querySelectorAll('.review-form-field');
    this.reviewFieldsLabel = document.querySelectorAll('.review-fields-label');
    this.submitButton = this.formElement.querySelector('.review-submit');
    this.rating = this.formReviewButtons.querySelector('[name="review-mark"]:checked');
    this.reviewField = document.getElementById('review-text');

    this.setListeners();

    // Запуск настроек по-умолчанию
    this.initialize();
  };

  Form.prototype = {
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
        var input = this.formElement.elements[name];

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
      this.formContainer.classList.remove('invisible');
    },

    /**
     * Закрытие модального окна
     */
    close: function() {
      this.formContainer.classList.add('invisible');

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
      var label = this.reviewFields.querySelector('[for="' + inputId + '"]');

      label.classList.remove('invisible');

      this.removeLabelList();
    },

    /**
     * Удаление пункта в поле «Осталось заполнить»
     * @param {Element} input
     */
    removeLabel: function(input) {
      var inputId = input.id;
      var label = this.reviewFields.querySelector('[for="' + inputId + '"]');

      label.classList.add('invisible');

      this.removeLabelList();
    },

    /**
     * Скрывает или показывает поле «Осталось заполнить»
     */
    removeLabelList: function() {
      var flag = true;

      for (var i = 0; i < this.reviewFieldsLabel.length; i++) {
        if (!this.reviewFieldsLabel[i].classList.contains('invisible')) {
          flag = false;

          break;
        }
      }

      if (flag) {
        this.reviewFields.classList.add('invisible');
      } else {
        this.reviewFields.classList.remove('invisible');
      }
    },

    /**
     * Отключение/включение кнопки отправки данных
     * @param {Boolean} flag
     */
    disableSubmitButton: function(flag) {
      if (flag) {
        this.submitButton.setAttribute('disabled', 'true');
      } else {
        this.submitButton.removeAttribute('disabled');
      }
    },

    /**
     * Валидация обязательных полей
     * Проверка на заполнение
     */
    checkRequiredFields: function() {
      var flag = false;

      for (var i = 0; i < this.reviewFormFields.length; i++) {
        if (this.reviewFormFields[i].hasAttribute('required')) {
          if (this.reviewFormFields[i].value.length === 0) {
            flag = true;
            this.addLabel(this.reviewFormFields[i]);
          } else {
            this.removeLabel(this.reviewFormFields[i]);
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
      if (+this.rating.value < this.RATING_PRECINCT) {
        this.reviewField.setAttribute('required', 'true');
        this.addLabel(this.reviewField);
      } else {
        this.reviewField.removeAttribute('required');
        this.removeLabel(this.reviewField);
      }
    },

    setListeners: function() {
      // Обработчик на инпуты
      Array.prototype.forEach.call(this.reviewFormFields, function(item) {
        item.oninput = function() {
          // Если поле имени, записать в куки
          if (item.getAttribute('name') === 'review-name') {
            Cookies.set('review-name', item.value, {expires: this.getCookieExpires()}); // eslint-disable-line
          }

          this.checkRequiredFields();
        }.bind(this);
      }.bind(this));

      // Закрытие модального окна
      this.formCloseButton.onclick = function(evt) {
        evt.preventDefault();
        this.close();
      }.bind(this);

      // Открытие модального окна
      this.formOpenButton.onclick = function(evt) {
        evt.preventDefault();
        this.open();
      }.bind(this);

      // Клик на звезды рейтинга
      this.formReviewButtons.onclick = function(evt) {
        var target = evt.target || evt.srcElement;
        var reviewRating = null;

        // Если нажал на звездочку
        if (target.getAttribute('name') === 'review-mark') {
          reviewRating = +target.value;

          // Записать в куки
          Cookies.set('review-mark', reviewRating, {expires: this.getCookieExpires()}); // eslint-disable-line

          this.checkReviewField();
          this.checkRequiredFields();
        }
      }.bind(this);
    }
  };

  return Form;
})();
