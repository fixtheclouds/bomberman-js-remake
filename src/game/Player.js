import AnimatedSprite from '../AnimatedSprite';
import Bomb from './Bomb';
import * as constants from '../constants';
import {
  utils
} from '../utils';

const LIVES_COUNT = 3;

export default class Player {

  constructor(game, scene, x, y) {
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 16;
    this.lives = LIVES_COUNT;
    this.speed = 1;
    this.currentSpeed = 0;
    this._game = game;
    this.scene = scene;
    this.detectCollisions = scene.collisionDetector.detect;
    this._ctx = game.ctx;
    this.isAlive = true;
    this.isMoving = false;
    this.bombStack = [];

    // Abilities
    this.bombpass = false;
    this.wallpass = false;
    this.flamepass = false;
    this.fireRange = 1;
    this.maxBombs = 1;
    this.hasDetonator = false;

    // Sprites
    this.movingUpSprite = new AnimatedSprite('sprite.png', 2, 21, 12, 16, [0, 1, 2], [0, 2, 4]);
    this.movingDownSprite = new AnimatedSprite('sprite.png', 2, 3, 12, 16, [0, 1, 2], [0, 2, 4]);
    this.movingLeftSprite = new AnimatedSprite('sprite.png', 43, 21, 12, 16, [0, 1, 2], [0, 0, 2]);
    this.movingRightSprite = new AnimatedSprite('sprite.png', 43, 3, 12, 16, [0, 1, 2], [0, 0, 2]);
    this.deathSprite = new AnimatedSprite('sprite.png', 83, 3, 12, 16, [0, 1, 2, 3, 4, 5], 2, false);

    this.sprite = this.movingDownSprite;

  }

  get centerX() {
    return this.x + (this.width / 2);
  }

  get centerY() {
    return this.y + (this.height / 2);
  }

  kill() {
    this.isAlive = false;
    this.sprite = this.deathSprite;
  }

  bindKeyboard() {
    document.addEventListener('keydown', e => {
      this._game.keys[e.keyCode] = true;
    });

    document.addEventListener('keyup', e => {
      this._game.keys[e.keyCode] = false;
    });
  }

  keyPressCheck() {
    this.stop();
    if (this._game.keys[39]) {
      this.moveRight();
    } else if (this._game.keys[37]) {
      this.moveLeft();
    } else if (this._game.keys[38]) {
      this.moveUp();
    } else if (this._game.keys[40]) {
      this.moveDown();
    } else if (this._game.keys[17]) { // ctrl
      this.plant();
    } else if (this._game.keys[32]) { //space
      this.detonate();
    }
  }

  stop() {
    this.currentSpeed = 0;
  }

  moveDown() {
    this.currentSpeed = this.speed;
    this.sprite = this.movingDownSprite;
    if (!this.detectCollisions(this.x, this.y, 'down', this.bombpass, this.wallpass)) {
      this.y += this.currentSpeed;
    } else {
      this.smoothTurn(this.x, this.y, 'down');
    }
  }

  moveUp() {
    this.currentSpeed = this.speed;
    this.sprite = this.movingUpSprite;
    if (!this.detectCollisions(this.x, this.y, 'up', this.bombpass, this.wallpass)) {
      this.y -= this.currentSpeed;
    } else {
      this.smoothTurn(this.x, this.y, 'up');
    }
  }

  moveRight() {
    this.currentSpeed = this.speed;
    this.sprite = this.movingRightSprite;
    if (!this.detectCollisions(this.x, this.y, 'right', this.bombpass, this.wallpass)) {
      this.x += this.currentSpeed;
    } else {
      this.smoothTurn(this.x, this.y, 'right');
    }
  }

  moveLeft() {
    this.currentSpeed = this.speed;
    this.sprite = this.movingLeftSprite;
    if (!this.detectCollisions(this.x, this.y, 'left', this.bombpass, this.wallpass)) {
      this.x -= this.currentSpeed;
    } else {
      this.smoothTurn(this.x, this.y, 'left');
    }
  }

  draw() {
    this.sprite.draw(this._ctx, this.x, this.y);
  }

  update(frame) {
    this.sprite.animationSpeed = this.currentSpeed;
    this.sprite.frame = frame;
  }

  plant() {
    if (this.bombStack.length <= this.maxBombs) {
      let col = utils.getClosestCol(this.x);
      let row = utils.getClosestRow(this.y);
      let bomb = new Bomb(this.scene, col, row, this.hasDetonator);
      bomb.deploy();
      this.bombStack.push(bomb);
      this.scene.blocks[col][row] = bomb;
    }
  }

  detonate() {
    if (this.hasDetonator) {
      _.first(this.bombStack).explode();
    }
  }

  smoothTurn(x, y, direction) {
    if (direction == 'right' || direction == 'left') {
      let smoothDistanceHigh = Math.floor(constants.UNIT_WIDTH / 3);
      let smoothDistanceLow = Math.floor(constants.UNIT_WIDTH * 2 / 3);
      let offset = (y - constants.MAP_TOP_MARGIN) % constants.UNIT_WIDTH;
      if (offset >= smoothDistanceLow) {
        this.y += this.currentSpeed;
      } else if (offset > 0 && offset <= smoothDistanceHigh) {
        this.y -= this.currentSpeed;
      }
    } else if (direction == 'up' || direction == 'down') {
      let smoothDistanceHigh = Math.floor(constants.UNIT_HEIGHT / 3);
      let smoothDistanceLow = Math.floor(constants.UNIT_HEIGHT * 2 / 3);
      let offset = x % constants.UNIT_HEIGHT;
      if (offset >= smoothDistanceLow) {
        this.x += this.currentSpeed;
      } else if (offset > 0 && offset <= smoothDistanceHigh) {
        this.x -= this.currentSpeed;
      }
    }
  }

}
