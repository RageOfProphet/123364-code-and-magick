/**
 * Created by Dmitry Bezugly on 04.11.2016.
 */

'use strict';

module.exports = (function() {
  /**
   * Конструктор галереи
   *
   * @param {Array} pictures - src картинкок
   * @constructor
   */
  var Gallery = function(pictures) {
    this.pictures = pictures;

    this.activePicture = null;

    this.element = {
      gallery: document.querySelector('.overlay-gallery'),
      controlLeft: document.querySelector('.overlay-gallery-control-left'),
      controlRight: document.querySelector('.overlay-gallery-control-right'),
      close: document.querySelector('.overlay-gallery-close'),
      preview: document.querySelector('.overlay-gallery-preview'),
      previewNumberCurrent: document.querySelector('.preview-number-current'),
      previewNumberTotal: document.querySelector('.preview-number-total')
    };
  };

  Gallery.prototype = {
    /**
     * Запуск галереи
     *
     * @param {Number} picture - номер отображаемой картинки
     */
    show: function(picture) {
      var self = this;

      // Запуск обработчиков
      this.element.close.onclick = function() {
        self.hide();
      };

      this.element.controlLeft.onclick = function() {
        var prevPicture = self.activePicture - 1;

        if (prevPicture >= 0) {
          self.setActivePicture(prevPicture);
        }
      };

      this.element.controlRight.onclick = function() {
        var nextPicture = self.activePicture + 1;

        if (nextPicture < self.pictures.length) {
          self.setActivePicture(nextPicture);
        }
      };

      // Установка количества картинок в счетчик
      this.element.previewNumberTotal.textContent = this.pictures.length;

      // Показ галереи
      this.element.gallery.classList.remove('invisible');

      // Установка активной картинки в превью
      this.setActivePicture(picture);
    },

    /**
     * Выключение галереи
     */
    hide: function() {
      // Скрытие галереи
      this.element.gallery.classList.add('invisible');

      // Удаление обработчиков
      this.element.close.onclick = null;
      this.element.controlLeft.onclick = null;
      this.element.controlRight.onclick = null;
    },

    /**
     * Установка активной картинки
     * @param {Number} picture - номер отображаемой картинки
     */
    setActivePicture: function(picture) {
      // Запись активной картинки в конструктор
      this.activePicture = picture;

      // Создание новой картинки
      var image = new Image();
      image.src = this.pictures[this.activePicture];

      // Замена превью на новую картинку
      var oldPreviewImage = this.element.preview.querySelector('img');

      if (oldPreviewImage !== null) {
        this.element.preview.replaceChild(image, oldPreviewImage);
      } else {
        this.element.preview.appendChild(image);
      }

      // Запись номера картинки в счетчик
      this.element.previewNumberCurrent.textContent = picture + 1;
    }
  };

  return Gallery;
})();
