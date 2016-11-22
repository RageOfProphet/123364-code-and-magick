/**
 * Created by Dmitry Bezugly on 08.10.2016.
 */

'use strict';

(function(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    }

    return 'Я никуда не попал';
  } else if (typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';

  } else if (Array.isArray(a) && Array.isArray(b)) {
    var distancePath = null;

    for (var k = 0; k < a.length; k++) {
      distancePath += a[k] * b[k];
    }

    return 'Я прошёл ' + distancePath + ' метров';
  } else if (Array.isArray(a)) {
    var numberOfSteps = null;

    for (var i = 0; i < a.length; i++) {
      numberOfSteps += a[i];
    }

    return 'Я прошёл ' + numberOfSteps + ' шагов';
  } else {
    return 'Переданы некорректые данные';
  }
})();
