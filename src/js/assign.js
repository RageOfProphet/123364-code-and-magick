/**
 * Created by Dmitry Bezugly on 20.11.2016.
 */

'use strict';

module.exports = function(ChildClass, ParentClass) {
  var TempConstructor = function() {};
  TempConstructor.prototype = ParentClass.prototype;

  ChildClass.prototype = new TempConstructor();
  ChildClass.prototype.constructor = ChildClass;
};
