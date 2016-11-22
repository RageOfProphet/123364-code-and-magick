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

    window.addEventListener('hashchange', function(e) {
      var hash = e.newURL.match(/#photo\/(\S+)/);

      this.checkHash(hash);
    }.bind(this));
  };

  Gallery.prototype = {
    checkHash: function(hash) {
      if (hash) {
        this.show(hash[1]);
      } else {
        this.hide();
      }
    },

    /**
     * Запуск галереи
     * @param {Number|String} picture - номер отображаемой картинки или путь к картинке
     */
    show: function(picture) {
      // Запуск обработчиков
      this.element.close.onclick = function() {
        this.hide();
      }.bind(this);

      this.element.controlLeft.onclick = function() {
        var prevPicture = this.activePicture - 1;

        if (prevPicture >= 0) {
          location.hash = 'photo' + this.pictures[prevPicture].replace(location.origin, '');
        }
      }.bind(this);

      this.element.controlRight.onclick = function() {
        var nextPicture = this.activePicture + 1;

        if (nextPicture < this.pictures.length) {
          location.hash = 'photo' + this.pictures[nextPicture].replace(location.origin, '');
        }
      }.bind(this);

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
      location.hash = '';
      // Скрытие галереи
      this.element.gallery.classList.add('invisible');

      // Удаление обработчиков
      this.element.close.onclick = null;
      this.element.controlLeft.onclick = null;
      this.element.controlRight.onclick = null;
    },

    /**
     * Установка активной картинки
     * @param {Number|String} picture - номер отображаемой картинки или путь к картинке
     */
    setActivePicture: function(picture) {
      switch (typeof picture) {
        case 'number': {
          this.activePicture = picture;
          break;
        }
        case 'string': {
          this.pictures.forEach(function(image, index) {
            if (image.indexOf(picture) !== -1) {
              this.activePicture = index;
            }
          }.bind(this));
          break;
        }
        default: {
          break;
        }
      }

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
      this.element.previewNumberCurrent.textContent = this.activePicture + 1;
    }
  };

  return Gallery;
})();
