/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/sass/main.sass":
/*!*******************************!*\
  !*** ./assets/sass/main.sass ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./assets/sass/main.sass?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _scenes_TitleScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scenes/TitleScreen */ \"./src/scenes/TitleScreen.js\");\n/* harmony import */ var _canvas_Drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas/Drawer */ \"./src/canvas/Drawer.js\");\n/* harmony import */ var _utils_SoundManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/SoundManager */ \"./src/utils/SoundManager.js\");\n/* harmony import */ var _utils_imageLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/imageLoader */ \"./src/utils/imageLoader.js\");\n\n\n\n\n\nclass Game {\n  constructor(canvas) {\n    this.canvas = canvas;\n    this.ctx = this.canvas.getContext('2d');\n    this._scene = new _scenes_TitleScreen__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n    this.keys = [];\n    this.soundManager = new _utils_SoundManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  }\n\n  loadResources() {\n    return _utils_imageLoader__WEBPACK_IMPORTED_MODULE_3__[\"default\"].load('sprite.png');\n  }\n\n  init() {\n    new _canvas_Drawer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx);\n    this._scene.init();\n  }\n\n  set scene(value) {\n    this.soundManager.stop();\n    this._scene = value;\n    this._scene.init();\n  }\n\n  get scene() {\n    return this._scene;\n  }\n\n  draw() {\n    this._scene.draw();\n  }\n\n  update(frame) {\n    this._scene.update(frame);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/Game.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n__webpack_require__(/*! ../assets/sass/main.sass */ \"./assets/sass/main.sass\");\n\n\n\nconst FRAME_RATE = 60.0;\n\nconst canvas = document.getElementById('canvas');\ncanvas.width = 512;\ncanvas.height = 480;\n\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\nlet lastTime;\n\nconst mainLoop = () => {\n  const now = Date.now();\n  const frame = (now - lastTime) / FRAME_RATE;\n  game.update(frame);\n  game.draw();\n  requestAnimationFrame(mainLoop);\n};\n\nasync function launch() {\n  await game.loadResources();\n  lastTime = Date.now();\n  game.init();\n  requestAnimationFrame(mainLoop);\n}\n\nlaunch();\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/canvas/AnimatedSprite.js":
/*!**************************************!*\
  !*** ./src/canvas/AnimatedSprite.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AnimatedSprite; });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/canvas/Sprite.js\");\n\n\nclass AnimatedSprite extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  /**\n   * Animated sprite constructor\n   * @param {String} url sprite url\n   * @param {Array} coords x/y frame of each frame\n   * @param {Array} sequence animation sequence in indices of frames\n   * @param {Number} width\n   * @param {Number} height\n   * @param {Boolean} loop\n   */\n  constructor({\n    coords,\n    sequence,\n    size: [width, height],\n    auto = false,\n    loop = false\n  }) {\n    super({ x: null, y: null, width, height });\n    this.frame = null;\n    this.frameIdx = 0; // default frame index\n    this.coords = coords;\n    this.sequence = sequence;\n    this.loop = loop;\n    this.done = false;\n    this.animationSpeed = 0;\n    this.prevFrame = 0;\n    this.animated = auto;\n    this.setInitialFrame = _.once(frame => (this.initialFrame = frame));\n  }\n\n  draw({ posX, posY }) {\n    this.setInitialFrame(this.frame);\n    if (this.done) return;\n    if (this.animationSpeed) {\n      const max = this.sequence.length;\n      const idx = Math.floor(this.relativeFrame);\n      const frame = Math.floor((idx / this.animationSpeed) % max);\n      if (!this.loop && frame >= max - 1) {\n        this.done = true;\n        return;\n      }\n      this.frameIdx = this.sequence[frame];\n      this.prevFrame = this.frameIdx;\n    } else {\n      this.frameIdx = this.prevFrame;\n    }\n    const [x, y] = this.coords[this.frameIdx];\n    return this.drawer.proxyDrawImage({\n      img: this.img,\n      x,\n      y,\n      width: this.width,\n      height: this.height,\n      imgX: posX,\n      imgY: posY,\n      imgWidth: this.width,\n      imgHeight: this.height\n    });\n  }\n\n  get relativeFrame() {\n    return this.frame - this.initialFrame;\n  }\n\n  animate({ posX, posY, speed }) {\n    this.animationSpeed = speed ? 1 / speed : 0;\n    this.draw({ posX, posY });\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\")))\n\n//# sourceURL=webpack:///./src/canvas/AnimatedSprite.js?");

/***/ }),

/***/ "./src/canvas/Drawer.js":
/*!******************************!*\
  !*** ./src/canvas/Drawer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Drawer; });\nlet instance = null;\n\nclass Drawer {\n  constructor(ctx) {\n    if (!instance) {\n      this.ctx = ctx;\n      this.offsetX = 0;\n      instance = this;\n    }\n    return instance;\n  }\n\n  reset() {\n    this.offsetX = 0;\n  }\n\n  changeOffset(x) {\n    this.offsetX += x;\n  }\n\n  proxyDrawImage({\n    img,\n    x,\n    y,\n    width,\n    height,\n    imgX,\n    imgY,\n    imgWidth,\n    imgHeight\n  }) {\n    return this.ctx.drawImage(\n      img,\n      x,\n      y,\n      width,\n      height,\n      (imgX + this.offsetX) * 2,\n      imgY * 2,\n      imgWidth * 2,\n      imgHeight * 2\n    );\n  }\n}\n\n\n//# sourceURL=webpack:///./src/canvas/Drawer.js?");

/***/ }),

/***/ "./src/canvas/Sprite.js":
/*!******************************!*\
  !*** ./src/canvas/Sprite.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sprite; });\n/* harmony import */ var _utils_imageLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/imageLoader */ \"./src/utils/imageLoader.js\");\n/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Drawer */ \"./src/canvas/Drawer.js\");\n\n\n\nconst SPRITE_URL = 'sprite.png';\n\nclass Sprite {\n  constructor({ x, y, width, height }) {\n    this.img = _utils_imageLoader__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(SPRITE_URL);\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.drawer = new _Drawer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  }\n\n  draw({ posX, posY }) {\n    return this.drawer.proxyDrawImage({\n      img: this.img,\n      x: this.x,\n      y: this.y,\n      width: this.width,\n      height: this.height,\n      imgX: posX,\n      imgY: posY,\n      imgWidth: this.width,\n      imgHeight: this.height\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/canvas/Sprite.js?");

/***/ }),

/***/ "./src/canvas/TextString.js":
/*!**********************************!*\
  !*** ./src/canvas/TextString.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextString; });\n/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Drawer */ \"./src/canvas/Drawer.js\");\n\n\nclass TextString {\n  constructor(text, x, y, color, shadowColor, size) {\n    this.text = text.toUpperCase();\n    this.x = x;\n    this.y = y;\n    this.size = size;\n    this.color = color;\n    this.shadowColor = shadowColor || null;\n    this.drawer = new _Drawer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  draw() {\n    const { ctx } = this.drawer;\n    const size = this.size || '16px';\n    ctx.font = `${size} PrStart`;\n    if (this.shadowColor) {\n      ctx.fillStyle = this.shadowColor;\n      ctx.fillText(this.text, this.x * 2 + 2, this.y * 2 + 2);\n    }\n    ctx.fillStyle = this.color || '#ffffff';\n    ctx.fillText(this.text, this.x * 2, this.y * 2);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/canvas/TextString.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: MAP_LEFT_MARGIN, MAP_TOP_MARGIN, UNIT_WIDTH, UNIT_HEIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAP_LEFT_MARGIN\", function() { return MAP_LEFT_MARGIN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAP_TOP_MARGIN\", function() { return MAP_TOP_MARGIN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UNIT_WIDTH\", function() { return UNIT_WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UNIT_HEIGHT\", function() { return UNIT_HEIGHT; });\nconst MAP_TOP_MARGIN = 32;\nconst MAP_LEFT_MARGIN = 0;\nconst UNIT_WIDTH = 16; // unit size in pixels\nconst UNIT_HEIGHT = 16; // unit size in pixels\n\n\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/game/Explosion.js":
/*!*******************************!*\
  !*** ./src/game/Explosion.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Explosion; });\n/* harmony import */ var _blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/SoftBlock */ \"./src/game/blocks/SoftBlock.js\");\n/* harmony import */ var _blocks_HardBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/HardBlock */ \"./src/game/blocks/HardBlock.js\");\n/* harmony import */ var _blocks_FireBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/FireBlock */ \"./src/game/blocks/FireBlock.js\");\n/* harmony import */ var _utils_SoundManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/SoundManager */ \"./src/utils/SoundManager.js\");\n\n\n\n\n\nclass Explosion {\n  constructor(scene, col, row, range) {\n    this.scene = scene;\n    this.col = col;\n    this.row = row;\n    this.range = range;\n  }\n\n  fire() {\n    _utils_SoundManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"].play('explosion.wav');\n    ['up', 'right', 'down', 'left'].forEach(direction => {\n      let x = this.col;\n      let y = this.row;\n      let i = 0;\n      // Draw core\n      this.dropFire(x, y, 'center');\n      while (i < this.range) {\n        if (direction === 'up') {\n          y--;\n        } else if (direction === 'down') {\n          y++;\n        } else if (direction === 'left') {\n          x--;\n        } else if (direction === 'right') {\n          x++;\n        }\n\n        if (this.scene.blocks[x][y] instanceof _blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n          this.scene.burnSoftBlock(x, y);\n          return;\n        } else if (this.scene.blocks[x][y] instanceof _blocks_HardBlock__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n          return;\n        } else {\n          const edgeBlock = i === this.range - 1;\n          this.dropFire(\n            x,\n            y,\n            this.constructor.computeFireType(edgeBlock, direction)\n          );\n        }\n        i++;\n      }\n    });\n  }\n\n  dropFire(x, y, fireType) {\n    this.scene.blocks[x][y] = new _blocks_FireBlock__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.scene, x, y, fireType);\n  }\n\n  static computeFireType(isEdge, direction) {\n    if (isEdge) {\n      return `${direction}Edge`;\n    } else {\n      return ['left', 'right'].includes(direction) ? 'horizontal' : 'vertical';\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/Explosion.js?");

/***/ }),

/***/ "./src/game/Timer.js":
/*!***************************!*\
  !*** ./src/game/Timer.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Timer; });\nclass Timer {\n  constructor(seconds) {\n    this.seconds = seconds;\n    this.timer = null;\n  }\n\n  countdown() {\n    this.timer = setInterval(() => {\n      if (this.seconds > 0) {\n        this.seconds--;\n      } else {\n        //this.publish('Timer.timeOver');\n        this.stop();\n      }\n    }, 1000);\n  }\n\n  stop() {\n    clearInterval(this.timer);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/Timer.js?");

/***/ }),

/***/ "./src/game/animations.js":
/*!********************************!*\
  !*** ./src/game/animations.js ***!
  \********************************/
/*! exports provided: playerAnimation, bombAnimation, fireAnimation, blockAnimation, enemyAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playerAnimation\", function() { return playerAnimation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bombAnimation\", function() { return bombAnimation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fireAnimation\", function() { return fireAnimation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blockAnimation\", function() { return blockAnimation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enemyAnimation\", function() { return enemyAnimation; });\n// --\n// PLAYER\n// ---\nconst playerAnimation = {\n  up: {\n    coords: [[2, 21], [16, 21], [30, 21]],\n    sequence: [0, 1, 2],\n    size: [12, 16],\n    loop: true\n  },\n  down: {\n    coords: [[2, 3], [16, 3], [30, 3]],\n    sequence: [0, 1, 2],\n    size: [12, 16],\n    loop: true\n  },\n  left: {\n    coords: [[43, 21], [56, 21], [70, 21]],\n    sequence: [0, 1, 2],\n    size: [12, 16],\n    loop: true\n  },\n  right: {\n    coords: [[43, 3], [55, 3], [69, 3]],\n    sequence: [0, 1, 2],\n    size: [12, 16],\n    loop: true\n  },\n  death: {\n    coords: [[83, 3], [97, 3], [111, 3], [125, 3], [139, 3], [159, 3]],\n    sequence: [0, 1, 2, 3, 4, 5],\n    size: [12, 16],\n    auto: true\n  }\n};\n\n// ---\n// ENEMIES\n// ---\nconst enemyAnimation = {\n  Baloom: {\n    left: {\n      coords: [[-1, 39], [16, 39], [33, 39]],\n      sequence: [0, 1, 2],\n      size: [16, 16],\n      auto: true,\n      loop: true\n    },\n    right: {\n      coords: [[49, 39], [66, 39], [83, 39]],\n      sequence: [0, 1, 2],\n      size: [16, 16],\n      auto: true,\n      loop: true\n    },\n    death: {\n      coords: [[99, 39], [115, 39], [127, 39], [136, 39], [143, 39]],\n      sequence: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4],\n      size: [14, 16],\n      auto: true\n    }\n  }\n};\n\n// --\n// BOMB\n// ---\nconst bombAnimation = {\n  coords: [[83, 21], [100, 21], [119, 21]],\n  size: [16, 16],\n  sequence: [0, 1, 2],\n  auto: true,\n  loop: true\n};\n\n// ---\n// FIRE\n// ---\nconst fireAnimation = {\n  leftEdge: {\n    coords: [[2, 205], [53, 205], [107, 205], [161, 205]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 1, 0],\n    auto: true\n  },\n  rightEdge: {\n    coords: [[35, 205], [89, 205], [143, 205], [197, 205]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 1, 0],\n    auto: true\n  },\n  upEdge: {\n    coords: [[17, 187], [71, 187], [125, 187], [179, 187]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 1, 0],\n    auto: true\n  },\n  downEdge: {\n    coords: [[17, 223], [71, 223], [125, 223], [179, 223]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 1, 0],\n    auto: true\n  },\n  center: {\n    coords: [[17, 205], [71, 204], [125, 205], [179, 205]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 1, 0],\n    auto: true\n  },\n  vertical: {\n    coords: [[35, 187], [53, 222], [107, 223], [161, 223]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 1, 0],\n    auto: true\n  },\n  horizontal: {\n    coords: [[35, 223], [89, 223], [143, 223], [197, 223]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 1, 0],\n    auto: true\n  }\n};\n\n// ---\n// BLOCKS\n// ---\nconst blockAnimation = {\n  burn: {\n    coords: [[35, 241], [53, 241], [71, 241], [107, 241], [125, 241]],\n    size: [16, 16],\n    sequence: [0, 1, 2, 3, 4],\n    auto: true\n  }\n};\n\n\n\n\n//# sourceURL=webpack:///./src/game/animations.js?");

/***/ }),

/***/ "./src/game/beings/Being.js":
/*!**********************************!*\
  !*** ./src/game/beings/Being.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Being; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ \"./src/constants.js\");\n/* harmony import */ var _utils_gridMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/gridMethods */ \"./src/utils/gridMethods.js\");\n\n\n\nclass Being {\n  constructor(scene) {\n    this._scene = scene;\n    this.isAlive = true;\n    this.x = null;\n    this.y = null;\n    this.sprite = null;\n  }\n\n  update(frame) {\n    this.sprite.frame = frame;\n  }\n\n  draw() {\n    const params = {\n      posX: this.x,\n      posY: this.y\n    };\n    if (this.sprite.animated) {\n      return this.sprite.animate({\n        ...params,\n        speed: 0.2\n      });\n    }\n    return this.sprite.draw(params);\n  }\n\n  get position() {\n    return [this.x, this.y];\n  }\n\n  get cellPosition() {\n    return [\n      _utils_gridMethods__WEBPACK_IMPORTED_MODULE_1__[\"gridMethods\"].getClosestCol(this.x),\n      _utils_gridMethods__WEBPACK_IMPORTED_MODULE_1__[\"gridMethods\"].getClosestRow(this.y)\n    ];\n  }\n\n  /** COMMON MOVEMENT MECHANICS **/\n  detectCollisions(...params) {\n    return this._scene.collisionDetector.detect(...params);\n  }\n\n  stop() {\n    this.currentSpeed = 0;\n  }\n\n  smoothTurn(x, y, direction) {\n    if (direction === 'right' || direction === 'left') {\n      const smoothDistanceHigh = Math.floor(_constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"] / 3);\n      const smoothDistanceLow = Math.floor((_constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"] * 2) / 3);\n      const offset = (y - _constants__WEBPACK_IMPORTED_MODULE_0__[\"MAP_TOP_MARGIN\"]) % _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"];\n      if (offset >= smoothDistanceLow) {\n        this.y += this.currentSpeed;\n      } else if (offset > 0 && offset <= smoothDistanceHigh) {\n        this.y -= this.currentSpeed;\n      } else {\n        this.whenStuck();\n      }\n    } else if (direction === 'up' || direction === 'down') {\n      const smoothDistanceHigh = Math.floor(_constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"] / 3);\n      const smoothDistanceLow = Math.floor((_constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"] * 2) / 3);\n      const offset = x % _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"];\n      if (offset >= smoothDistanceLow) {\n        this.x += this.currentSpeed;\n      } else if (offset > 0 && offset <= smoothDistanceHigh) {\n        this.x -= this.currentSpeed;\n      } else {\n        this.whenStuck();\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/beings/Being.js?");

/***/ }),

/***/ "./src/game/beings/Enemy.js":
/*!**********************************!*\
  !*** ./src/game/beings/Enemy.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Enemy; });\n/* harmony import */ var _Being__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Being */ \"./src/game/beings/Being.js\");\n/* harmony import */ var _enemies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enemies */ \"./src/game/enemies.js\");\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animations */ \"./src/game/animations.js\");\n/* harmony import */ var _utils_gridMethods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/gridMethods */ \"./src/utils/gridMethods.js\");\n/* harmony import */ var _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../canvas/AnimatedSprite */ \"./src/canvas/AnimatedSprite.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ \"./src/constants.js\");\n\n\n\n\n\n\n\nconst MOVES_UNTIL_TURN = _constants__WEBPACK_IMPORTED_MODULE_5__[\"UNIT_WIDTH\"] * 2;\nconst DIRECTIONS = ['left', 'right', 'up', 'down', 'none'];\n\nclass Enemy extends _Being__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(scene, type) {\n    super(scene);\n    _.extend(this, _enemies__WEBPACK_IMPORTED_MODULE_1__[\"default\"][type]);\n    this.currentSpeed = this.speed;\n    this.direction = 'down';\n    this.bombPass = false;\n    this.animations = _animations__WEBPACK_IMPORTED_MODULE_2__[\"enemyAnimation\"][type];\n    this.sprite = new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.animations.left);\n\n    const [col, row] = this._randomizePosition();\n    this.x = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_3__[\"gridMethods\"].getX(col);\n    this.y = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_3__[\"gridMethods\"].getY(row);\n    this.lastDirection = null;\n    this.lastDirectionCounter = 0;\n    this.doTurn();\n  }\n\n  kill() {\n    if (this.isAlive === false) return;\n    this.stop();\n    this.isAlive = false;\n    this.sprite = new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.animations.death);\n  }\n\n  moveRandomly() {\n    if (!this.isAlive) return;\n\n    this.lastDirectionCounter++;\n\n    if (this.lastDirectionCounter === MOVES_UNTIL_TURN) {\n      this.doTurn();\n    }\n    if (this.lastDirection === 'none') return;\n    this.move(this.lastDirection);\n  }\n\n  doTurn() {\n    this.lastDirectionCounter = 0;\n    this.lastDirection = _.sample(\n      _.difference(DIRECTIONS, [this.lastDirection])\n    );\n    if (this.lastDirection === 'right') {\n      this.sprite = new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.animations.right);\n    } else if (this.lastDirection === 'left') {\n      this.sprite = new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.animations.left);\n    }\n  }\n\n  moveTowardsPlayer() {\n    // TODO implement\n  }\n\n  moveAwayFromBomb() {\n    // TODO implement\n  }\n\n  availableDirections() {\n    // TODO implement\n  }\n\n  whenStuck() {\n    return this.doTurn();\n  }\n\n  move(direction) {\n    this.direction = direction;\n    if (\n      !this.detectCollisions(\n        this.x,\n        this.y,\n        direction,\n        this.bombPass,\n        this.wallPass\n      )\n    ) {\n      switch (direction) {\n        case 'up':\n          this.y -= this.currentSpeed;\n          break;\n        case 'down':\n          this.y += this.currentSpeed;\n          break;\n        case 'right':\n          this.x += this.currentSpeed;\n          break;\n        case 'left':\n          this.x -= this.currentSpeed;\n          break;\n      }\n    } else {\n      this.smoothTurn(this.x, this.y, direction);\n    }\n  }\n\n  update(frame) {\n    super.update(frame);\n    this.moveRandomly();\n  }\n\n  _randomizePosition() {\n    const freeCells = this._scene.freeCells(this.wallPass);\n    return _.sample(freeCells);\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\")))\n\n//# sourceURL=webpack:///./src/game/beings/Enemy.js?");

/***/ }),

/***/ "./src/game/beings/Player.js":
/*!***********************************!*\
  !*** ./src/game/beings/Player.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _Being__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Being */ \"./src/game/beings/Being.js\");\n/* harmony import */ var _blocks_Bomb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blocks/Bomb */ \"./src/game/blocks/Bomb.js\");\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animations */ \"./src/game/animations.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ \"./src/constants.js\");\n/* harmony import */ var _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/gridMethods */ \"./src/utils/gridMethods.js\");\n/* harmony import */ var _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../canvas/AnimatedSprite */ \"./src/canvas/AnimatedSprite.js\");\n/* harmony import */ var _utils_SoundManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/SoundManager */ \"./src/utils/SoundManager.js\");\n\n\n\n\n\n\n\n\nconst LIVES_COUNT = 3;\nconst ACTION_WAIT = 400;\nconst DEFAULT_POSITION = [_constants__WEBPACK_IMPORTED_MODULE_3__[\"UNIT_WIDTH\"], _constants__WEBPACK_IMPORTED_MODULE_3__[\"MAP_TOP_MARGIN\"] + _constants__WEBPACK_IMPORTED_MODULE_3__[\"UNIT_HEIGHT\"]];\n\nclass Player extends _Being__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(game, scene) {\n    super(scene);\n    this._game = game;\n    [this.x, this.y] = DEFAULT_POSITION;\n    this.lives = LIVES_COUNT;\n    this.speed = 1;\n    this.currentSpeed = 0;\n    this.direction = 'down';\n    this.bombStack = [];\n\n    // Abilities\n    this.bombPass = false;\n    this.wallPass = false;\n    this.flamePass = false;\n    this.fireRange = 1;\n    this.maxBombs = 1;\n    this.hasDetonator = false;\n    this.throttledPlant = _.throttle(this.plant, ACTION_WAIT, {\n      trailing: false\n    });\n    this.throttledDetonate = _.throttle(this.detonate, ACTION_WAIT, {\n      trailing: false\n    });\n    this.throttledSound = _.throttle(_utils_SoundManager__WEBPACK_IMPORTED_MODULE_6__[\"default\"].play, 250, {\n      trailing: false\n    });\n\n    this.sprites = {\n      down: new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_2__[\"playerAnimation\"].down),\n      up: new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_2__[\"playerAnimation\"].up),\n      right: new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_2__[\"playerAnimation\"].right),\n      left: new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_2__[\"playerAnimation\"].left),\n      death: new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_2__[\"playerAnimation\"].death)\n    };\n\n    this.sprite = this.sprites.down;\n  }\n\n  kill() {\n    if (this.isAlive === false) return;\n    _utils_SoundManager__WEBPACK_IMPORTED_MODULE_6__[\"default\"].play('death.wav');\n    this.isAlive = false;\n    this.sprite = this.sprites.death;\n    this.lives -= 1;\n    this._scene.initiateEndGame();\n  }\n\n  update(frame) {\n    super.update(frame);\n    this.sprite.animationSpeed = this.currentSpeed;\n  }\n\n  reset() {\n    this.isAlive = true;\n    this.sprite = this.sprites.down;\n    [this.x, this.y] = DEFAULT_POSITION;\n  }\n\n  bindKeyboard() {\n    document.addEventListener('keydown', e => {\n      this._game.keys[e.keyCode] = true;\n    });\n\n    document.addEventListener('keyup', e => {\n      this._game.keys[e.keyCode] = false;\n    });\n  }\n\n  keyPressCheck() {\n    this.stop();\n    if (this.isAlive === false) return;\n    if (this._game.keys[39]) {\n      this.move('right');\n    } else if (this._game.keys[37]) {\n      this.move('left');\n    } else if (this._game.keys[38]) {\n      this.move('up');\n    } else if (this._game.keys[40]) {\n      this.move('down');\n    }\n    if (this._game.keys[17]) {\n      // ctrl\n      this.throttledPlant();\n    }\n    if (this._game.keys[32]) {\n      //space\n      this.throttledDetonate();\n    }\n  }\n\n  move(direction) {\n    this.throttledSound('walk.wav');\n    this.currentSpeed = this.speed;\n    this.direction = direction;\n    this.sprite = this.sprites[direction];\n    if (\n      !this.detectCollisions(\n        this.x,\n        this.y,\n        direction,\n        this.bombPass,\n        this.wallPass\n      )\n    ) {\n      switch (direction) {\n        case 'up':\n          this.y -= this.currentSpeed;\n          break;\n        case 'down':\n          this.y += this.currentSpeed;\n          break;\n        case 'right':\n          this.x += this.currentSpeed;\n          break;\n        case 'left':\n          this.x -= this.currentSpeed;\n          break;\n      }\n      this._scene.setPointOfView();\n    } else {\n      this.smoothTurn(this.x, this.y, direction);\n    }\n    if (this.collidesWithEnemy()) {\n      this.kill();\n    }\n  }\n\n  plant() {\n    if (this.bombStack.length >= this.maxBombs) return;\n    let col = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__[\"gridMethods\"].getClosestCol(this.x);\n    let row = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__[\"gridMethods\"].getClosestRow(this.y);\n    if (this.currentSpeed) {\n      switch (this.direction) {\n        case 'right':\n          [col] = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__[\"gridMethods\"].getCloseCols(this.x);\n          break;\n        case 'left':\n          [, col] = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__[\"gridMethods\"].getCloseCols(this.x);\n          break;\n        case 'up':\n          [, row] = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__[\"gridMethods\"].getCloseRows(this.y);\n          break;\n        case 'down':\n          [row] = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__[\"gridMethods\"].getCloseRows(this.y);\n      }\n    }\n    if (this._scene.blocks[col][row] instanceof _blocks_Bomb__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) return;\n    const bomb = new _blocks_Bomb__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this._scene, col, row, {\n      range: this.fireRange,\n      isDetonatable: this.hasDetonator\n    });\n    bomb.deploy();\n    this.bombStack.push(bomb);\n    this._scene.blocks[col][row] = bomb;\n  }\n\n  detonate() {\n    if (!this.hasDetonator || _.isEmpty(this.bombStack)) return;\n    _.first(this.bombStack).explode();\n  }\n\n  whenStuck() {}\n\n  collidesWithEnemy() {\n    return this._scene.enemies.some(\n      enemy =>\n        enemy.isAlive && _utils_gridMethods__WEBPACK_IMPORTED_MODULE_4__[\"gridMethods\"].hasOverlap(enemy.position, this.position)\n    );\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\")))\n\n//# sourceURL=webpack:///./src/game/beings/Player.js?");

/***/ }),

/***/ "./src/game/blocks/Bomb.js":
/*!*********************************!*\
  !*** ./src/game/blocks/Bomb.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bomb; });\n/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Unit */ \"./src/game/blocks/Unit.js\");\n/* harmony import */ var _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../canvas/AnimatedSprite */ \"./src/canvas/AnimatedSprite.js\");\n/* harmony import */ var _Explosion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Explosion */ \"./src/game/Explosion.js\");\n/* harmony import */ var _utils_SoundManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/SoundManager */ \"./src/utils/SoundManager.js\");\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../animations */ \"./src/game/animations.js\");\n\n\n\n\n\n\nclass Bomb extends _Unit__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(scene, x, y, { range, isDetonatable }) {\n    super(x, y);\n    this.scene = scene;\n    this.timer = null;\n    this.isDetonatable = isDetonatable;\n    this.sprite = new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_4__[\"bombAnimation\"]);\n    this.sprite.animationSpeed = 1;\n    this.explosion = new _Explosion__WEBPACK_IMPORTED_MODULE_2__[\"default\"](scene, x, y, range);\n    this.seconds = 2;\n  }\n\n  destroy() {\n    this.scene.player.bombStack = this.scene.player.bombStack.slice(1);\n  }\n\n  deploy() {\n    _utils_SoundManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"].play('plant.wav');\n    if (!this.isDetonatable) {\n      this.countdown();\n    }\n  }\n\n  explode() {\n    this.destroy();\n    this.explosion.fire();\n  }\n\n  countdown() {\n    this.timer = setInterval(() => {\n      if (this.seconds > 0) {\n        this.seconds--;\n      } else {\n        clearInterval(this.timer);\n        this.explode();\n      }\n    }, 1000);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/blocks/Bomb.js?");

/***/ }),

/***/ "./src/game/blocks/FireBlock.js":
/*!**************************************!*\
  !*** ./src/game/blocks/FireBlock.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FireBlock; });\n/* harmony import */ var _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../canvas/AnimatedSprite */ \"./src/canvas/AnimatedSprite.js\");\n/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Unit */ \"./src/game/blocks/Unit.js\");\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animations */ \"./src/game/animations.js\");\n\n\n\n\nclass FireBlock extends _Unit__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(scene, x, y, fireType) {\n    super(x, y);\n    this.scene = scene;\n    this.sprite = new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_2__[\"fireAnimation\"][fireType]);\n  }\n\n  update(frame) {\n    super.update(frame);\n    this.scene.damage(this.x, this.y);\n    if (this.sprite.done) this.destroy();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/blocks/FireBlock.js?");

/***/ }),

/***/ "./src/game/blocks/HardBlock.js":
/*!**************************************!*\
  !*** ./src/game/blocks/HardBlock.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HardBlock; });\n/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Unit */ \"./src/game/blocks/Unit.js\");\n/* harmony import */ var _canvas_Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../canvas/Sprite */ \"./src/canvas/Sprite.js\");\n\n\n\nclass HardBlock extends _Unit__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y) {\n    super(x, y);\n    this.sprite = new _canvas_Sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      x: 0,\n      y: 241,\n      width: 16,\n      height: 16\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/blocks/HardBlock.js?");

/***/ }),

/***/ "./src/game/blocks/SoftBlock.js":
/*!**************************************!*\
  !*** ./src/game/blocks/SoftBlock.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SoftBlock; });\n/* harmony import */ var _canvas_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../canvas/Sprite */ \"./src/canvas/Sprite.js\");\n/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Unit */ \"./src/game/blocks/Unit.js\");\n/* harmony import */ var _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../canvas/AnimatedSprite */ \"./src/canvas/AnimatedSprite.js\");\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animations */ \"./src/game/animations.js\");\n\n\n\n\n\nclass SoftBlock extends _Unit__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(x, y) {\n    super(x, y);\n    this.sprite = new _canvas_Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      x: 17,\n      y: 241,\n      width: 16,\n      height: 16\n    });\n  }\n\n  update(frame) {\n    super.update(frame);\n    if (this.sprite.done) this.destroy();\n  }\n\n  burn() {\n    this.sprite = new _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_animations__WEBPACK_IMPORTED_MODULE_3__[\"blockAnimation\"].burn);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/blocks/SoftBlock.js?");

/***/ }),

/***/ "./src/game/blocks/Unit.js":
/*!*********************************!*\
  !*** ./src/game/blocks/Unit.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Unit; });\n/* harmony import */ var _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../canvas/AnimatedSprite */ \"./src/canvas/AnimatedSprite.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ \"./src/constants.js\");\n\n\n\nclass Unit {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n    this.sprite = null;\n    this._destroyed = false;\n  }\n\n  get animated() {\n    return this.sprite instanceof _canvas_AnimatedSprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] && this.sprite.animated;\n  }\n\n  draw() {\n    const params = {\n      posX: this.x * _constants__WEBPACK_IMPORTED_MODULE_1__[\"UNIT_WIDTH\"],\n      posY: _constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_TOP_MARGIN\"] + this.y * _constants__WEBPACK_IMPORTED_MODULE_1__[\"UNIT_HEIGHT\"]\n    };\n    if (this.animated) {\n      return this.sprite.animate({\n        ...params,\n        speed: 0.4\n      });\n    }\n    return this.sprite.draw(params);\n  }\n\n  destroy() {\n    this._destroyed = true;\n  }\n\n  update(frame) {\n    this.sprite.frame = frame;\n  }\n\n  get destroyed() {\n    return this._destroyed;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game/blocks/Unit.js?");

/***/ }),

/***/ "./src/game/enemies.js":
/*!*****************************!*\
  !*** ./src/game/enemies.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst types = {\n  Baloom: {\n    points: 100,\n    wallPass: false,\n    speed: 0.5,\n    intelligence: 1\n  },\n  Oneal: {\n    points: 200,\n    wallPass: false,\n    speed: 0.75,\n    intelligence: 2\n  },\n  Doll: {\n    points: 400,\n    wallPass: false,\n    speed: 0.75,\n    intelligence: 1\n  },\n  Minvo: {\n    points: 800,\n    wallPass: false,\n    speed: 1,\n    intelligence: 2\n  },\n  Kondoria: {\n    points: 1000,\n    wallPass: true,\n    speed: 0.25,\n    intelligence: 3\n  },\n  Ovapi: {\n    points: 2000,\n    wallPass: true,\n    speed: 0.5,\n    intelligence: 2\n  },\n  Pass: {\n    points: 4000,\n    wallPass: false,\n    speed: 1,\n    intelligence: 3\n  },\n  Pontan: {\n    points: 8000,\n    wallPass: true,\n    speed: 1,\n    intelligence: 3\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (types);\n\n\n//# sourceURL=webpack:///./src/game/enemies.js?");

/***/ }),

/***/ "./src/scenes/GameOverScreen.js":
/*!**************************************!*\
  !*** ./src/scenes/GameOverScreen.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameOverScreen; });\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scene */ \"./src/scenes/Scene.js\");\n/* harmony import */ var _canvas_TextString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../canvas/TextString */ \"./src/canvas/TextString.js\");\n/* harmony import */ var _TitleScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TitleScreen */ \"./src/scenes/TitleScreen.js\");\n\n\n\n\nconst TIMEOUT = 240;\n\nclass GameOverScreen extends _Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(game) {\n    super(game);\n    this._timeout = TIMEOUT;\n  }\n\n  restartGame() {\n    this._game.scene = new _TitleScreen__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this._game);\n  }\n\n  get active() {\n    return this._timeout > 0;\n  }\n\n  init() {\n    this._game.soundManager.start('game-over');\n  }\n\n  update() {\n    if (this.active) {\n      this._timeout--;\n    } else {\n      this.restartGame();\n    }\n  }\n\n  draw() {\n    if (!this.active) {\n      return;\n    }\n    this._drawBG();\n    this._drawText();\n  }\n\n  _drawBG() {\n    this._ctx.fillStyle = '#000000';\n    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);\n  }\n\n  _drawText() {\n    const text = new _canvas_TextString__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('GAME OVER', 100, 170);\n    text.draw(this._ctx);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/GameOverScreen.js?");

/***/ }),

/***/ "./src/scenes/GameScreen.js":
/*!**********************************!*\
  !*** ./src/scenes/GameScreen.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameScreen; });\n/* harmony import */ var _canvas_Drawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas/Drawer */ \"./src/canvas/Drawer.js\");\n/* harmony import */ var _game_beings_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/beings/Player */ \"./src/game/beings/Player.js\");\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Scene */ \"./src/scenes/Scene.js\");\n/* harmony import */ var _game_Timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game/Timer */ \"./src/game/Timer.js\");\n/* harmony import */ var _canvas_TextString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../canvas/TextString */ \"./src/canvas/TextString.js\");\n/* harmony import */ var _game_blocks_HardBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../game/blocks/HardBlock */ \"./src/game/blocks/HardBlock.js\");\n/* harmony import */ var _game_blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../game/blocks/SoftBlock */ \"./src/game/blocks/SoftBlock.js\");\n/* harmony import */ var _utils_CollisionDetector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/CollisionDetector */ \"./src/utils/CollisionDetector.js\");\n/* harmony import */ var _stages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../stages */ \"./src/stages.js\");\n/* harmony import */ var _utils_gridMethods__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/gridMethods */ \"./src/utils/gridMethods.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n/* harmony import */ var _game_beings_Enemy__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../game/beings/Enemy */ \"./src/game/beings/Enemy.js\");\n/* harmony import */ var _StageLoadingScreen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./StageLoadingScreen */ \"./src/scenes/StageLoadingScreen.js\");\n/* harmony import */ var _GameOverScreen__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./GameOverScreen */ \"./src/scenes/GameOverScreen.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst BG_COLOR = '#388400';\nconst SAFE_ZONE = [[1, 1], [2, 1], [1, 2]];\n\nclass GameScreen extends _Scene__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  constructor(game, stage) {\n    super(game);\n    this.stage = _stages__WEBPACK_IMPORTED_MODULE_8__[\"default\"][stage];\n    this.collisionDetector = new _utils_CollisionDetector__WEBPACK_IMPORTED_MODULE_7__[\"default\"](this);\n    this.player = new _game_beings_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game, this);\n    this.player.bindKeyboard();\n    this.enemies = [];\n    this.blocks = [];\n    _.times(this.stageCols, () => {\n      this.blocks.push(new Array(this.stageRows).fill(null));\n    });\n    this.timer = new _game_Timer__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.stage.time);\n    this.secondsLeft = null;\n    this.endGameAt = 0;\n    this.drawer = new _canvas_Drawer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx);\n  }\n\n  init() {\n    this._game.soundManager.start('stage-theme', true);\n    this._buildBlocks();\n    this.spawnEnemies();\n    this.timer.countdown();\n  }\n\n  end() {\n    this._game.scene = new _StageLoadingScreen__WEBPACK_IMPORTED_MODULE_12__[\"default\"](this._game, this);\n  }\n\n  gameOver() {\n    this._game.scene = new _GameOverScreen__WEBPACK_IMPORTED_MODULE_13__[\"default\"](this._game);\n  }\n\n  restart() {\n    this.drawer.reset();\n    this.player.reset();\n    this.spawnEnemies();\n    this.blocks = [];\n    _.times(this.stageCols, () => {\n      this.blocks.push(new Array(this.stageRows).fill(null));\n    });\n    this.timer = new _game_Timer__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.stage.time);\n    this.endGameAt = 0;\n    this.init();\n  }\n\n  draw() {\n    this._drawBG();\n    this._drawHeader();\n    this._drawBlocks();\n    this.player.draw();\n    _.invokeMap(this.enemies, 'draw');\n  }\n\n  update(frame) {\n    this.player.update(frame);\n    _.invokeMap(this.enemies, 'update', frame);\n    this.player.keyPressCheck();\n    this.updateBlocks(frame);\n    this.secondsLeft = this.timer.seconds;\n    if (this.secondsLeft <= this.endGameAt) {\n      if (this.player.lives === 0) {\n        this.gameOver();\n      } else {\n        this.end();\n      }\n    }\n  }\n\n  setPointOfView() {\n    const { x } = this.player;\n    const needShift = x > 512 / 4 && x < this.stageWidth - 512 / 4;\n    if (needShift && this.player.direction === 'right') {\n      this.drawer.changeOffset(-1);\n    } else if (needShift && this.player.direction === 'left') {\n      this.drawer.changeOffset(1);\n    }\n  }\n\n  spawnEnemies() {\n    this.enemies = [];\n    _.forEach(this.stage.enemies, (count, type) => {\n      _.times(count, () => this.enemies.push(new _game_beings_Enemy__WEBPACK_IMPORTED_MODULE_11__[\"default\"](this, type)));\n    });\n  }\n\n  overlaps([col, row], [x, y]) {\n    const cols = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_9__[\"gridMethods\"].getCloseCols(x);\n    const rows = _utils_gridMethods__WEBPACK_IMPORTED_MODULE_9__[\"gridMethods\"].getCloseRows(y);\n    return !!(rows.includes(row) && cols.includes(col));\n  }\n\n  get stageCols() {\n    return this.stage.size[0];\n  }\n\n  get stageRows() {\n    return this.stage.size[1];\n  }\n\n  get stageWidth() {\n    return this.stageCols * _constants__WEBPACK_IMPORTED_MODULE_10__[\"UNIT_WIDTH\"];\n  }\n\n  _drawBG() {\n    this._ctx.fillStyle = BG_COLOR;\n    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);\n  }\n\n  // Build field layout\n  _buildBlocks() {\n    _.times(this.stageCols, i => {\n      _.times(this.stageRows, j => {\n        if (\n          i === 0 ||\n          i === this.stageCols - 1 ||\n          j === 0 ||\n          j === this.stageRows - 1 ||\n          (i % 2 === 0 && j % 2 === 0)\n        ) {\n          this.blocks[i][j] = new _game_blocks_HardBlock__WEBPACK_IMPORTED_MODULE_5__[\"default\"](i, j);\n        } else if (\n          Math.random() < this.stage.blockDensity &&\n          i !== 1 &&\n          j !== 1 &&\n          !_.includes(SAFE_ZONE, [i, j])\n        ) {\n          this.blocks[i][j] = new _game_blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_6__[\"default\"](i, j);\n        }\n      });\n    });\n  }\n\n  _drawHeader() {\n    this._ctx.fillStyle = '#BCBCBC';\n    this._ctx.fillRect(0, 0, this._game.canvas.width, _constants__WEBPACK_IMPORTED_MODULE_10__[\"MAP_TOP_MARGIN\"] * 2);\n\n    const timeText = new _canvas_TextString__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\n      `time ${this.secondsLeft}`,\n      7,\n      23,\n      '#ffffff',\n      '#000000'\n    );\n    timeText.draw();\n    const { lives } = this.player;\n    const leftText = new _canvas_TextString__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\n      `left ${lives}`,\n      192,\n      23,\n      '#ffffff',\n      '#000000'\n    );\n    leftText.draw();\n  }\n\n  _drawBlocks() {\n    this.blocks.forEach(row => {\n      row.forEach(block => {\n        if (block) {\n          block.draw();\n        }\n      });\n    });\n  }\n\n  freeCells(wallPass = false) {\n    const cells = [];\n    this.blocks.forEach((cols, col) => {\n      cols.forEach((block, row) => {\n        if (_.isNil(block) || (wallPass && block instanceof _game_blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_6__[\"default\"])) {\n          cells.push([col, row]);\n        }\n      });\n    });\n    _.remove(cells, ([x, y]) =>\n      _.some(SAFE_ZONE, ([safeX, safeY]) => safeX === x && safeY === y)\n    );\n    return cells;\n  }\n\n  burnSoftBlock(col, row) {\n    if (this.blocks[col][row] instanceof _game_blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_6__[\"default\"]) {\n      this.blocks[col][row].burn();\n    }\n  }\n\n  updateBlocks(frame) {\n    this.blocks.forEach((cols, col) => {\n      cols.forEach((block, row) => {\n        if (!block) return false;\n        if (block.animated) {\n          block.update(frame);\n        }\n        if (block.destroyed) {\n          this.blocks[col][row] = null;\n        }\n      });\n    });\n  }\n\n  damage(col, row) {\n    if (\n      this.overlaps([col, row], this.player.position) &&\n      !this.player.flamePass\n    ) {\n      this.player.kill();\n    }\n    _.forEach(this.enemies, enemy => {\n      if (this.overlaps([col, row], enemy.position)) {\n        enemy.kill();\n      }\n    });\n  }\n\n  initiateEndGame() {\n    this.endGameAt = this.secondsLeft - 3;\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\")))\n\n//# sourceURL=webpack:///./src/scenes/GameScreen.js?");

/***/ }),

/***/ "./src/scenes/Scene.js":
/*!*****************************!*\
  !*** ./src/scenes/Scene.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Scene; });\nclass Scene {\n  constructor(game) {\n    this._game = game;\n    this._ctx = this._game.ctx;\n  }\n\n  get ctx() {\n    return this._game.ctx;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/Scene.js?");

/***/ }),

/***/ "./src/scenes/StageLoadingScreen.js":
/*!******************************************!*\
  !*** ./src/scenes/StageLoadingScreen.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StageLoadingScreen; });\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scene */ \"./src/scenes/Scene.js\");\n/* harmony import */ var _canvas_TextString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../canvas/TextString */ \"./src/canvas/TextString.js\");\n/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameScreen */ \"./src/scenes/GameScreen.js\");\n\n\n\n\nconst STAGE_LOADING_TIMEOUT = 210;\n\nclass StageLoadingScreen extends _Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(game, prevScene = null) {\n    super(game);\n    this._stage = 1;\n    this.prevScene = prevScene;\n    this._timeout = STAGE_LOADING_TIMEOUT;\n  }\n\n  startStage() {\n    if (this.prevScene) {\n      this.prevScene.restart();\n      this._game.scene = this.prevScene;\n      return;\n    }\n    this._game.scene = new _GameScreen__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this._game, this._stage);\n  }\n\n  get active() {\n    return this._timeout > 0;\n  }\n\n  init() {\n    this._game.soundManager.start('stage-start');\n  }\n\n  update() {\n    if (this.active) {\n      this._timeout--;\n    } else {\n      this.startStage();\n    }\n  }\n\n  draw() {\n    if (!this.active) {\n      return;\n    }\n    this._drawBG();\n    this._drawText();\n  }\n\n  _drawBG() {\n    this._ctx.fillStyle = '#000000';\n    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);\n  }\n\n  _drawText() {\n    const num = '00'.substr((this._stage + '').length) + this._stage;\n    const text = new _canvas_TextString__WEBPACK_IMPORTED_MODULE_1__[\"default\"](`Stage ${num}`, 100, 170);\n    text.draw(this._ctx);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/StageLoadingScreen.js?");

/***/ }),

/***/ "./src/scenes/TitleScreen.js":
/*!***********************************!*\
  !*** ./src/scenes/TitleScreen.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TitleScreen; });\n/* harmony import */ var _canvas_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas/Sprite */ \"./src/canvas/Sprite.js\");\n/* harmony import */ var _canvas_TextString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../canvas/TextString */ \"./src/canvas/TextString.js\");\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Scene */ \"./src/scenes/Scene.js\");\n/* harmony import */ var _StageLoadingScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StageLoadingScreen */ \"./src/scenes/StageLoadingScreen.js\");\n\n\n\n\n\nclass TitleScreen extends _Scene__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  constructor(game) {\n    super(game);\n  }\n\n  init() {\n    this._game.soundManager.start('title-screen', true);\n    this._bindKeyboard();\n  }\n\n  draw() {\n    this._drawBG();\n    this._drawSplash();\n    this._drawMenu();\n  }\n\n  _bindKeyboard() {\n    const keydown = e => {\n      if (e.keyCode === 13) {\n        document.removeEventListener('keydown', keydown);\n        this._game.soundManager.stop();\n        this._game.scene = new _StageLoadingScreen__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this._game);\n      }\n    };\n    document.addEventListener('keydown', keydown);\n  }\n\n  update() {\n    // TODO implement\n  }\n\n  _drawBG() {\n    this._ctx.fillStyle = '#000000';\n    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);\n  }\n\n  _drawSplash() {\n    const splash = new _canvas_Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      x: 4,\n      y: 259,\n      width: 227,\n      height: 139\n    });\n    return splash.draw({ posX: 14, posY: 7 });\n  }\n\n  _drawMenu() {\n    const text = new _canvas_TextString__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Start', 100, 170, '#ffffff', '#858585');\n    text.draw(this._ctx);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/TitleScreen.js?");

/***/ }),

/***/ "./src/stages.js":
/*!***********************!*\
  !*** ./src/stages.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst stages = {\n  1: {\n    size: [26, 13],\n    enemies: {\n      Baloom: 4\n    },\n    time: 200,\n    powerUp: 'Flames',\n    blockDensity: 0.2\n  },\n  2: {\n    size: [16, 13],\n    enemies: {\n      Baloom: 4,\n      Oneal: 1\n    },\n    time: 200,\n    powerUp: 'Bombs',\n    blockDensity: 0.25\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (stages);\n\n\n//# sourceURL=webpack:///./src/stages.js?");

/***/ }),

/***/ "./src/utils/CollisionDetector.js":
/*!****************************************!*\
  !*** ./src/utils/CollisionDetector.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CollisionDetector; });\n/* harmony import */ var _game_blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game/blocks/SoftBlock */ \"./src/game/blocks/SoftBlock.js\");\n/* harmony import */ var _game_blocks_HardBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/blocks/HardBlock */ \"./src/game/blocks/HardBlock.js\");\n/* harmony import */ var _game_blocks_Bomb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/blocks/Bomb */ \"./src/game/blocks/Bomb.js\");\n/* harmony import */ var _gridMethods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gridMethods */ \"./src/utils/gridMethods.js\");\n\n\n\n\n\nclass CollisionDetector {\n  constructor(scene) {\n    this.scene = scene;\n  }\n\n  detect(x, y, direction, bombPass, wallPass) {\n    // TODO this should not happen at all\n    if (_.isNaN(x) || _.isNaN(y)) return;\n\n    const { blocks } = this.scene;\n    const col = _gridMethods__WEBPACK_IMPORTED_MODULE_3__[\"gridMethods\"].getCol(x);\n    const row = _gridMethods__WEBPACK_IMPORTED_MODULE_3__[\"gridMethods\"].getRow(y);\n    const nextCol = _gridMethods__WEBPACK_IMPORTED_MODULE_3__[\"gridMethods\"].getNextCol(x) || col;\n    const nextRow = _gridMethods__WEBPACK_IMPORTED_MODULE_3__[\"gridMethods\"].getNextRow(y) || row;\n\n    const checkBlocking = function(x, y) {\n      const block = blocks[x][y];\n      if (block instanceof _game_blocks_HardBlock__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n        return true;\n      } else if (!wallPass && block instanceof _game_blocks_SoftBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n        return true;\n      } else if (!bombPass && block instanceof _game_blocks_Bomb__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n        return true;\n      }\n      return false;\n    };\n\n    switch (direction) {\n      case 'left':\n        return checkBlocking(col, row) || checkBlocking(col, nextRow);\n      case 'right':\n        return checkBlocking(col + 1, row) || checkBlocking(col + 1, nextRow);\n      case 'up':\n        return checkBlocking(col, row) || checkBlocking(nextCol, row);\n      case 'down':\n        return checkBlocking(col, row + 1) || checkBlocking(nextCol, row + 1);\n      default:\n        return false;\n    }\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\")))\n\n//# sourceURL=webpack:///./src/utils/CollisionDetector.js?");

/***/ }),

/***/ "./src/utils/SoundManager.js":
/*!***********************************!*\
  !*** ./src/utils/SoundManager.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SoundManager; });\nclass SoundManager {\n  constructor() {\n    this.handler = null;\n  }\n\n  // Play audio once without initializing\n  static async play(fileName) {\n    const [, extension] = fileName.split('.');\n    const path = !extension ? `${fileName}.mp3` : fileName;\n    const audio = new Audio(`assets/sounds/${path}`);\n    await audio.play();\n  }\n\n  start(sound, looped) {\n    this.handler = new Audio(`assets/sounds/${sound}.mp3`);\n    this.handler.loop = looped || false;\n    this.handler.play();\n  }\n\n  stop() {\n    this.handler.pause();\n    this.handler.currentTime = 0;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/utils/SoundManager.js?");

/***/ }),

/***/ "./src/utils/gridMethods.js":
/*!**********************************!*\
  !*** ./src/utils/gridMethods.js ***!
  \**********************************/
/*! exports provided: gridMethods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(_) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gridMethods\", function() { return gridMethods; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\n\nconst gridMethods = {\n  getClosestCol(x) {\n    const width = _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"] / 2;\n    return Math.floor((x + width) / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"]);\n  },\n\n  getClosestRow(y) {\n    const height = _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"] / 2;\n    return Math.floor((y + height - _constants__WEBPACK_IMPORTED_MODULE_0__[\"MAP_TOP_MARGIN\"]) / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"]);\n  },\n\n  getCloseCols(x) {\n    return [Math.floor(x / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"]), Math.ceil(x / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"])];\n  },\n\n  getCloseRows(y) {\n    return [\n      Math.floor((y - _constants__WEBPACK_IMPORTED_MODULE_0__[\"MAP_TOP_MARGIN\"]) / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"]),\n      Math.ceil((y - _constants__WEBPACK_IMPORTED_MODULE_0__[\"MAP_TOP_MARGIN\"]) / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"])\n    ];\n  },\n\n  getCloseCells(x, y) {\n    const [col1, col2] = this.getCloseCols(x);\n    const [row1, row2] = this.getCloseRows(y);\n    return [[col1, row1], [col2, row2]];\n  },\n\n  getNearbyCells(x, y) {\n    const col = this.getClosestCol(x);\n    const row = this.getClosestRow(y);\n\n    return [[col - 1, row], [col, row - 1], [col + 1, row], [col, row + 1]];\n  },\n\n  getX(col) {\n    return col * _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"];\n  },\n\n  getY(row) {\n    return row * _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"] + _constants__WEBPACK_IMPORTED_MODULE_0__[\"MAP_TOP_MARGIN\"];\n  },\n\n  getCol(x) {\n    return Math.floor(x / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"]);\n  },\n\n  getRow(y) {\n    return Math.floor((y - _constants__WEBPACK_IMPORTED_MODULE_0__[\"MAP_TOP_MARGIN\"]) / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"]);\n  },\n\n  getNextCol(x) {\n    return Math.floor((x + _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"] - 1) / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_WIDTH\"]);\n  },\n\n  getNextRow(y) {\n    return Math.floor((y + _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"] - 1 - _constants__WEBPACK_IMPORTED_MODULE_0__[\"MAP_TOP_MARGIN\"]) / _constants__WEBPACK_IMPORTED_MODULE_0__[\"UNIT_HEIGHT\"]);\n  },\n\n  hasOverlap([x1, y1], [x2, y2]) {\n    const cells1 = this.getCloseCells(x1, y1);\n    const cells2 = this.getCloseCells(x2, y2);\n\n    return _.some(cells1, ([x3, y3]) =>\n      _.some(cells2, ([x4, y4]) => x3 === x4 && y3 === y4)\n    );\n  }\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\")))\n\n//# sourceURL=webpack:///./src/utils/gridMethods.js?");

/***/ }),

/***/ "./src/utils/imageLoader.js":
/*!**********************************!*\
  !*** ./src/utils/imageLoader.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet instance = null;\n\nclass ImageLoader {\n  constructor() {\n    if (!instance) {\n      instance = this;\n    }\n    this.cache = {};\n    return instance;\n  }\n\n  load(...urls) {\n    return new Promise(resolve => {\n      urls.forEach(url => {\n        if (this.cache[url]) {\n          return this.cache[url];\n        } else {\n          const img = new Image();\n          img.src = `./assets/images/${url}`;\n          this.cache[url] = false;\n          img.onload = () => {\n            this.cache[url] = img;\n            if (this.isReady()) {\n              resolve();\n            }\n          };\n        }\n      });\n    });\n  }\n\n  get(url) {\n    return this.cache[url];\n  }\n\n  isReady() {\n    let ready = true;\n    for (const k in this.cache) {\n      if (this.cache.hasOwnProperty(k) && !this.cache[k]) {\n        ready = false;\n      }\n    }\n    return ready;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new ImageLoader());\n\n\n//# sourceURL=webpack:///./src/utils/imageLoader.js?");

/***/ })

/******/ });