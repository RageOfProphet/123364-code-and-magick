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

	'use strict';
	
	window.Game = (function() {
	  /**
	   * @const
	   * @type {number}
	   */
	  var HEIGHT = 300;
	
	  /**
	   * @const
	   * @type {number}
	   */
	  var WIDTH = 700;
	
	  /**
	   * ID уровней.
	   * @enum {number}
	   */
	  var Level = {
	    INTRO: 0,
	    MOVE_LEFT: 1,
	    MOVE_RIGHT: 2,
	    LEVITATE: 3,
	    HIT_THE_MARK: 4
	  };
	
	  /**
	   * Порядок прохождения уровней.
	   * @type {Array.<Level>}
	   */
	  var LevelSequence = [
	    Level.INTRO
	  ];
	
	  /**
	   * Начальный уровень.
	   * @type {Level}
	   */
	  var INITIAL_LEVEL = LevelSequence[0];
	
	  /**
	   * Допустимые виды объектов на карте.
	   * @enum {number}
	   */
	  var ObjectType = {
	    ME: 0,
	    FIREBALL: 1
	  };
	
	  /**
	   * Допустимые состояния объектов.
	   * @enum {number}
	   */
	  var ObjectState = {
	    OK: 0,
	    DISPOSED: 1
	  };
	
	  /**
	   * Коды направлений.
	   * @enum {number}
	   */
	  var Direction = {
	    NULL: 0,
	    LEFT: 1,
	    RIGHT: 2,
	    UP: 4,
	    DOWN: 8
	  };
	
	  /**
	   * Карта спрайтов игры.
	   * @type {Object.<ObjectType, Object>}
	   */
	  var SpriteMap = {};
	  var REVERSED = '-reversed';
	
	  SpriteMap[ObjectType.ME] = {
	    width: 61,
	    height: 84,
	    url: 'img/wizard.gif'
	  };
	
	  //TODO: Find a clever way
	  SpriteMap[ObjectType.ME + REVERSED] = {
	    width: 61,
	    height: 84,
	    url: 'img/wizard-reversed.gif'
	  };
	
	  SpriteMap[ObjectType.FIREBALL] = {
	    width: 24,
	    height: 24,
	    url: 'img/fireball.gif'
	  };
	
	  /**
	   * Правила перерисовки объектов в зависимости от состояния игры.
	   * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	   */
	  var ObjectsBehaviour = {};
	
	  /**
	   * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	   * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	   * На движение мага влияет его пересечение с препятствиями.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	    // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	    // в воздухе на определенной высоте.
	    // NB! Сложность заключается в том, что поведение описано в координатах
	    // канваса, а не координатах, относительно нижней границы игры.
	    if (state.keysPressed.UP && object.y > 0) {
	      object.direction = object.direction & ~Direction.DOWN;
	      object.direction = object.direction | Direction.UP;
	      object.y -= object.speed * timeframe * 2;
	    }
	
	    // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	    // опускается на землю.
	    if (!state.keysPressed.UP) {
	      if (object.y < HEIGHT - object.height) {
	        object.direction = object.direction & ~Direction.UP;
	        object.direction = object.direction | Direction.DOWN;
	        object.y += object.speed * timeframe / 3;
	      }
	    }
	
	    // Если зажата стрелка влево, маг перемещается влево.
	    if (state.keysPressed.LEFT) {
	      object.direction = object.direction & ~Direction.RIGHT;
	      object.direction = object.direction | Direction.LEFT;
	      object.x -= object.speed * timeframe;
	    }
	
	    // Если зажата стрелка вправо, маг перемещается вправо.
	    if (state.keysPressed.RIGHT) {
	      object.direction = object.direction & ~Direction.LEFT;
	      object.direction = object.direction | Direction.RIGHT;
	      object.x += object.speed * timeframe;
	    }
	
	    // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	    if (object.y < 0) {
	      object.y = 0;
	    }
	
	    if (object.y > HEIGHT - object.height) {
	      object.y = HEIGHT - object.height;
	    }
	
	    if (object.x < 0) {
	      object.x = 0;
	    }
	
	    if (object.x > WIDTH - object.width) {
	      object.x = WIDTH - object.width;
	    }
	  };
	
	  /**
	   * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	   * и после этого неуправляемо движется по прямой в заданном направлении. Если
	   * он пролетает весь экран насквозь, он исчезает.
	   * @param {Object} object
	   * @param {Object} _state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.FIREBALL] = function(object, _state, timeframe) {
	    if (object.direction & Direction.LEFT) {
	      object.x -= object.speed * timeframe;
	    }
	
	    if (object.direction & Direction.RIGHT) {
	      object.x += object.speed * timeframe;
	    }
	
	    if (object.x < 0 || object.x > WIDTH) {
	      object.state = ObjectState.DISPOSED;
	    }
	  };
	
	  /**
	   * ID возможных ответов функций, проверяющих успех прохождения уровня.
	   * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	   * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	   * нужно прервать.
	   * @enum {number}
	   */
	  var Verdict = {
	    CONTINUE: 0,
	    WIN: 1,
	    FAIL: 2,
	    PAUSE: 3,
	    INTRO: 4
	  };
	
	  /**
	   * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	   * принимающие на вход состояние уровня и возвращающие true, если раунд
	   * можно завершать или false если нет.
	   * @type {Object.<Level, function(Object):boolean>}
	   */
	  var LevelsRules = {};
	
	  /**
	   * Уровень считается пройденным, если был выпущен файлболл и он улетел
	   * за экран.
	   * @param {Object} state
	   * @return {Verdict}
	   */
	  LevelsRules[Level.INTRO] = function(state) {
	    var fireballs = state.garbage.filter(function(object) {
	      return object.type === ObjectType.FIREBALL;
	    });
	
	    return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	  };
	
	  /**
	   * Начальные условия для уровней.
	   * @enum {Object.<Level, function>}
	   */
	  var LevelsInitialize = {};
	
	  /**
	   * Первый уровень.
	   * @param {Object} state
	   * @return {Object}
	   */
	  LevelsInitialize[Level.INTRO] = function(state) {
	    state.objects.push(
	      // Установка персонажа в начальное положение. Он стоит в крайнем левом
	      // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	      // уровне равна 2px за кадр.
	      {
	        direction: Direction.RIGHT,
	        height: 84,
	        speed: 2,
	        sprite: SpriteMap[ObjectType.ME],
	        state: ObjectState.OK,
	        type: ObjectType.ME,
	        width: 61,
	        x: WIDTH / 3,
	        y: HEIGHT - 100
	      }
	    );
	
	    return state;
	  };
	
	  /**
	   * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	   * и показывает приветственный экран.
	   * @param {Element} container
	   * @constructor
	   */
	  var Game = function(container) {
	    this.container = container;
	    this.canvas = document.createElement('canvas');
	    this.canvas.width = container.clientWidth;
	    this.canvas.height = container.clientHeight;
	    this.container.appendChild(this.canvas);
	
	    this.ctx = this.canvas.getContext('2d');
	
	    this._onKeyDown = this._onKeyDown.bind(this);
	    this._onKeyUp = this._onKeyUp.bind(this);
	    this._pauseListener = this._pauseListener.bind(this);
	
	    this.setDeactivated(false);
	  };
	
	  Game.prototype = {
	    /**
	     * Текущий уровень игры.
	     * @type {Level}
	     */
	    level: INITIAL_LEVEL,
	
	    /** @param {boolean} deactivated */
	    setDeactivated: function(deactivated) {
	      if (this._deactivated === deactivated) {
	        return;
	      }
	
	      this._deactivated = deactivated;
	
	      if (deactivated) {
	        this._removeGameListeners();
	      } else {
	        this._initializeGameListeners();
	      }
	    },
	
	    /**
	     * Состояние игры. Описывает местоположение всех объектов на игровой карте
	     * и время проведенное на уровне и в игре.
	     * @return {Object}
	     */
	    getInitialState: function() {
	      return {
	        // Статус игры. Если CONTINUE, то игра продолжается.
	        currentStatus: Verdict.CONTINUE,
	
	        // Объекты, удаленные на последнем кадре.
	        garbage: [],
	
	        // Время с момента отрисовки предыдущего кадра.
	        lastUpdated: null,
	
	        // Состояние нажатых клавиш.
	        keysPressed: {
	          ESC: false,
	          LEFT: false,
	          RIGHT: false,
	          SPACE: false,
	          UP: false
	        },
	
	        // Время начала прохождения уровня.
	        levelStartTime: null,
	
	        // Все объекты на карте.
	        objects: [],
	
	        // Время начала прохождения игры.
	        startTime: null
	      };
	    },
	
	    /**
	     * Начальные проверки и запуск текущего уровня.
	     * @param {boolean=} restart
	     */
	    initializeLevelAndStart: function(restart) {
	      restart = typeof restart === 'undefined' ? true : restart;
	
	      if (restart || !this.state) {
	        // При перезапуске уровня, происходит полная перезапись состояния
	        // игры из изначального состояния.
	        this.state = this.getInitialState();
	        this.state = LevelsInitialize[this.level](this.state);
	      } else {
	        // При продолжении уровня состояние сохраняется, кроме записи о том,
	        // что состояние уровня изменилось с паузы на продолжение игры.
	        this.state.currentStatus = Verdict.CONTINUE;
	      }
	
	      // Запись времени начала игры и времени начала уровня.
	      this.state.levelStartTime = Date.now();
	      if (!this.state.startTime) {
	        this.state.startTime = this.state.levelStartTime;
	      }
	
	      this._preloadImagesForLevel(function() {
	        // Предварительная отрисовка игрового экрана.
	        this.render();
	
	        // Установка обработчиков событий.
	        this._initializeGameListeners();
	
	        // Запуск игрового цикла.
	        this.update();
	      }.bind(this));
	    },
	
	    /**
	     * Временная остановка игры.
	     * @param {Verdict=} verdict
	     */
	    pauseLevel: function(verdict) {
	      if (verdict) {
	        this.state.currentStatus = verdict;
	      }
	
	      this.state.keysPressed.ESC = false;
	      this.state.lastUpdated = null;
	
	      this._removeGameListeners();
	      window.addEventListener('keydown', this._pauseListener);
	
	      this._drawPauseScreen();
	    },
	
	    /**
	     * Обработчик событий клавиатуры во время паузы.
	     * @param {KeyboardsEvent} evt
	     * @private
	     * @private
	     */
	    _pauseListener: function(evt) {
	      if (evt.keyCode === 32 && !this._deactivated) {
	        evt.preventDefault();
	        var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	            this.state.currentStatus === Verdict.FAIL;
	        this.initializeLevelAndStart(needToRestartTheGame);
	
	        window.removeEventListener('keydown', this._pauseListener);
	      }
	    },
	
	    /**
	     * Выводит текст
	     * @param {String} message
	     * @param {Object} rectanglePosition
	     * @private
	     */
	    _drawRectangleText: function(message, rectanglePosition) {
	      var ctx = this.ctx;
	      var rectangleWidth = rectanglePosition.x3 - rectanglePosition.x2;
	      var str = message;
	      var lineHeight = 22;
	      var positionYStart = 75;
	      var strLimit = rectangleWidth >= 380 ? 33 : Math.floor(rectangleWidth / 11.2);
	      var counter = Math.ceil(str.length / 25);
	      var caretStart = 0;
	      var caretEnd = null;
	      var currentStr = '';
	
	      ctx.font = '16px PT Mono';
	      ctx.textBaseline = 'hanging';
	      ctx.fillStyle = 'black';
	
	      for (var i = 0; i < counter; i++) {
	        caretEnd = str.length - caretStart <= strLimit ? str.length : strLimit;
	        currentStr = str.slice(caretStart, caretEnd);
	
	        caretStart = 0;
	        caretEnd = caretEnd === str.length ? caretEnd : currentStr.lastIndexOf(' ');
	        currentStr = currentStr.slice(caretStart, caretEnd);
	        ctx.fillText(currentStr, rectanglePosition.x2 + 15, positionYStart);
	
	        positionYStart += lineHeight;
	        str = str.slice(caretEnd + 1, str.length);
	      }
	
	      rectanglePosition.y1 = positionYStart + 40;
	      rectanglePosition.y4 = positionYStart + 30;
	
	      ctx.globalCompositeOperation = 'destination-over';
	      this._drawRectangle(rectanglePosition);
	      this._drawRectangleShadow(rectanglePosition);
	    },
	
	    /**
	     * Выводит тень прямоугольника относилтельно координат прямоугольника
	     * @param {Object} rectanglePosition
	     * @private
	     */
	    _drawRectangleShadow: function(rectanglePosition) {
	      var ctx = this.ctx;
	      var shadowPosition = {};
	
	      for (var key in rectanglePosition) {
	        if ({}.hasOwnProperty.call(rectanglePosition, key)) {
	          shadowPosition[key] = rectanglePosition[key] + 10;
	        }
	      }
	
	      ctx.beginPath();
	      ctx.moveTo(shadowPosition.x1, shadowPosition.y1);
	      ctx.lineTo(shadowPosition.x2, shadowPosition.y2);
	      ctx.lineTo(shadowPosition.x3, shadowPosition.y3);
	      ctx.lineTo(shadowPosition.x4, shadowPosition.y4);
	      ctx.closePath();
	      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	      ctx.fill();
	    },
	
	    /**
	     * Выводит прямоугольник относительно полученных координат
	     * @param {Object} rectanglePosition
	     * @private
	     */
	    _drawRectangle: function(rectanglePosition) {
	      var ctx = this.ctx;
	
	      ctx.beginPath();
	      ctx.moveTo(rectanglePosition.x1, rectanglePosition.y1);
	      ctx.lineTo(rectanglePosition.x2, rectanglePosition.y2);
	      ctx.lineTo(rectanglePosition.x3, rectanglePosition.y3);
	      ctx.lineTo(rectanglePosition.x4, rectanglePosition.y4);
	      ctx.closePath();
	      ctx.fillStyle = '#FFFFFF';
	      ctx.fill();
	    },
	
	    /**
	     * Считает координаты
	     * @param {Number} positionX
	     * @param {Number} positionY
	     * @returns {Object}
	     */
	    getPosition: function(positionX, positionY) {
	      var x = positionX || 300;
	      var y = positionY || 230;
	      return {
	        x1: x,
	        y1: y,
	        x2: x + 20,
	        y2: y - 180,
	        x3: x + 300,
	        y3: y - 180,
	        x4: x + 300,
	        y4: y - 20
	      };
	    },
	
	    /**
	     * Отрисовка экрана паузы.
	     */
	    _drawPauseScreen: function() {
	      switch (this.state.currentStatus) {
	        case Verdict.WIN:
	          this._drawRectangleText('Поздравляем! Вы победили!', this.getPosition());
	          break;
	        case Verdict.FAIL:
	          this._drawRectangleText('Вы проиграли. Попробуйте еще', this.getPosition());
	          break;
	        case Verdict.PAUSE:
	          this._drawRectangleText('Игра на паузе', this.getPosition());
	          break;
	        case Verdict.INTRO:
	          this._drawRectangleText('Добро пожаловать в «Код и магию»! Нажмите пробел для старта', this.getPosition());
	          break;
	      }
	    },
	
	    /**
	     * Предзагрузка необходимых изображений для уровня.
	     * @param {function} callback
	     * @private
	     */
	    _preloadImagesForLevel: function(callback) {
	      if (typeof this._imagesArePreloaded === 'undefined') {
	        this._imagesArePreloaded = [];
	      }
	
	      if (this._imagesArePreloaded[this.level]) {
	        callback();
	        return;
	      }
	
	      var keys = Object.keys(SpriteMap);
	      var imagesToGo = keys.length;
	
	      var self = this;
	
	      var loadSprite = function(sprite) {
	        var image = new Image(sprite.width, sprite.height);
	        image.onload = function() {
	          sprite.image = image;
	          if (--imagesToGo === 0) {
	            self._imagesArePreloaded[self.level] = true;
	            callback();
	          }
	        };
	        image.src = sprite.url;
	      };
	
	      for (var i = 0; i < keys.length; i++) {
	        loadSprite(SpriteMap[keys[i]]);
	      }
	    },
	
	    /**
	     * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	     * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	     * должны исчезнуть.
	     * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	     */
	    updateObjects: function(delta) {
	      // Персонаж.
	      var me = this.state.objects.filter(function(object) {
	        return object.type === ObjectType.ME;
	      })[0];
	
	      // Добавляет на карту файрбол по нажатию на Shift.
	      if (this.state.keysPressed.SHIFT) {
	        this.state.objects.push({
	          direction: me.direction,
	          height: 24,
	          speed: 5,
	          sprite: SpriteMap[ObjectType.FIREBALL],
	          type: ObjectType.FIREBALL,
	          width: 24,
	          x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	          y: me.y + me.height / 2
	        });
	
	        this.state.keysPressed.SHIFT = false;
	      }
	
	      this.state.garbage = [];
	
	      // Убирает в garbage не используемые на карте объекты.
	      var remainingObjects = this.state.objects.filter(function(object) {
	        ObjectsBehaviour[object.type](object, this.state, delta);
	
	        if (object.state === ObjectState.DISPOSED) {
	          this.state.garbage.push(object);
	          return false;
	        }
	
	        return true;
	      }, this);
	
	      this.state.objects = remainingObjects;
	    },
	
	    /**
	     * Проверка статуса текущего уровня.
	     */
	    checkStatus: function() {
	      // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	      // заранее известно, что да.
	      if (this.state.currentStatus !== Verdict.CONTINUE) {
	        return;
	      }
	
	      if (!this.commonRules) {
	        /**
	         * Проверки, не зависящие от уровня, но влияющие на его состояние.
	         * @type {Array.<functions(Object):Verdict>}
	         */
	        this.commonRules = [
	          /**
	           * Если персонаж мертв, игра прекращается.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function(state) {
	            var me = state.objects.filter(function(object) {
	              return object.type === ObjectType.ME;
	            })[0];
	
	            return me.state === ObjectState.DISPOSED ?
	                Verdict.FAIL :
	                Verdict.CONTINUE;
	          },
	
	          /**
	           * Если нажата клавиша Esc игра ставится на паузу.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function(state) {
	            return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	          },
	
	          /**
	           * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function(state) {
	            return Date.now() - state.startTime > 3 * 60 * 1000 ?
	                Verdict.FAIL :
	                Verdict.CONTINUE;
	          }
	        ];
	      }
	
	      // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	      // по всем универсальным проверкам и проверкам конкретного уровня.
	      // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	      // любое другое состояние кроме CONTINUE или пока не пройдут все
	      // проверки. После этого состояние сохраняется.
	      var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	      var currentCheck = Verdict.CONTINUE;
	      var currentRule;
	
	      while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	        currentRule = allChecks.shift();
	        currentCheck = currentRule(this.state);
	      }
	
	      this.state.currentStatus = currentCheck;
	    },
	
	    /**
	     * Принудительная установка состояния игры. Используется для изменения
	     * состояния игры от внешних условий, например, когда необходимо остановить
	     * игру, если она находится вне области видимости и установить вводный
	     * экран.
	     * @param {Verdict} status
	     */
	    setGameStatus: function(status) {
	      if (this.state.currentStatus !== status) {
	        this.state.currentStatus = status;
	      }
	    },
	
	    /**
	     * Отрисовка всех объектов на экране.
	     */
	    render: function() {
	      // Удаление всех отрисованных на странице элементов.
	      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	      // Выставление всех элементов, оставшихся в this.state.objects согласно
	      // их координатам и направлению.
	      this.state.objects.forEach(function(object) {
	        if (object.sprite) {
	          var reversed = object.direction & Direction.LEFT;
	          var sprite = SpriteMap[object.type + (reversed ? REVERSED : '')] || SpriteMap[object.type];
	          this.ctx.drawImage(sprite.image, object.x, object.y, object.width, object.height);
	        }
	      }, this);
	    },
	
	    /**
	     * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	     * и обновляет их согласно правилам их поведения, а затем запускает
	     * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	     * проверка не вернет состояние FAIL, WIN или PAUSE.
	     */
	    update: function() {
	      if (!this.state.lastUpdated) {
	        this.state.lastUpdated = Date.now();
	      }
	
	      var delta = (Date.now() - this.state.lastUpdated) / 10;
	      this.updateObjects(delta);
	      this.checkStatus();
	
	      switch (this.state.currentStatus) {
	        case Verdict.CONTINUE:
	          this.state.lastUpdated = Date.now();
	          this.render();
	          requestAnimationFrame(function() {
	            this.update();
	          }.bind(this));
	          break;
	
	        case Verdict.WIN:
	        case Verdict.FAIL:
	        case Verdict.PAUSE:
	        case Verdict.INTRO:
	          this.pauseLevel();
	          break;
	      }
	    },
	
	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyDown: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = true;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = true;
	          break;
	        case 38:
	          this.state.keysPressed.UP = true;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = true;
	          break;
	      }
	
	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = true;
	      }
	    },
	
	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyUp: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = false;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = false;
	          break;
	        case 38:
	          this.state.keysPressed.UP = false;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = false;
	          break;
	      }
	
	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = false;
	      }
	    },
	
	    /** @private */
	    _initializeGameListeners: function() {
	      window.addEventListener('keydown', this._onKeyDown);
	      window.addEventListener('keyup', this._onKeyUp);
	    },
	
	    /** @private */
	    _removeGameListeners: function() {
	      window.removeEventListener('keydown', this._onKeyDown);
	      window.removeEventListener('keyup', this._onKeyUp);
	    }
	  };
	
	  Game.Verdict = Verdict;
	
	  return Game;
	})();


/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map?dropcache