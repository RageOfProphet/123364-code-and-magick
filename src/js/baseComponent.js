/**
 * Created by Dmitry Bezugly on 20.11.2016.
 */

'use strict';

var BaseComponent = function(element) {
  this.el = element;
};

BaseComponent.prototype = {
  append: function(insertElement) {
    var appendElement = insertElement || document.body;

    appendElement.appendChild(this.el);
  },

  initializeListeners: function() {
    this.el.addEventListener('click', this.onClick);
  },

  removeListeners: function() {
    this.el.removeEventListener('click', this.onClick);
  },

  onClick: function() {
    console.log('Clicked!');
  },

  remove: function() {
    this.el.parentNode.removeChild(this.el);

    this.removeListeners();
  }
};

module.exports = BaseComponent;
