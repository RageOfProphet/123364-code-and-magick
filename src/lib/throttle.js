/**
 * Created by Dmitry Bezugly on 15.11.2016.
 */
'use strict';

module.exports = function(fn, time) {
  var canCall = true;

  return function() {
    if (canCall) {
      fn();

      canCall = false;

      setTimeout(function() {
        canCall = true;
      }, time);
    }
  };
};