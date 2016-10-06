/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * Created by Dmitry Bezugly on 06.10.2016.
	 */
	
	'use strict';
	
	function getMessage(a, b) {
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
	}


/***/ }
/******/ ]);
//# sourceMappingURL=check.js.map?dropcache