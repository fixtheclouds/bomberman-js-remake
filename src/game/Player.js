import Bomb from './Bomb';
import {
  movingUpSprite,
  movingDownSprite,
  movingLeftSprite,
  movingRightSprite,
  deathSprite
} from './playerSprites';
import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../constants';
import { gridMethods } from '../utils/gridMethods';

const LIVES_COUNT = 3;

export default class Player {
  constructor(game, scene, x, y) {
    this.x = x;
    this.y = y;
    this.lives = LIVES_COUNT;
    this.speed = 1;
    this.currentSpeed = 0;
    this._game = game;
    this.scene = scene;
    this._ctx = game.ctx;
    this.isAlive = true;
    this.bombStack = [];

    // Abilities
    this.bombPass = false;
    this.wallPass = false;
    this.flamePass = false;
    this.fireRange = 1;
    this.maxBombs = 1;
    this.hasDetonator = false;

    this.sprite = movingDownSprite;
  }

  kill() {
    this.isAlive = false;
    this.sprite = deathSprite;
  }

  detectCollisions(...params) {
    this.scene.collisionDetector.detect(...params);
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
    switch (this._game.keys) {
    case 39:
      this.moveRight();
      break;
    case 37:
      this.moveLeft();
      break;
    case 38:
      this.moveUp();
      break;
    case 40:
      this.moveDown();
      break;
    case 17:
      this.plant();
      break;
    case 32:
      this.detonate();
      break;
    default:
      return;
    }
  }

  stop() {
    this.currentSpeed = 0;
  }

  moveDown() {
    this.currentSpeed = this.speed;
    this.sprite = movingDownSprite;
    if (
      !this.detectCollisions(
        this.x,
        this.y,
        'down',
        this.bombPass,
        this.wallPass
      )
    ) {
      this.y += this.currentSpeed;
    } else {
      this.smoothTurn(this.x, this.y, 'down');
    }
  }

  moveUp() {
    this.currentSpeed = this.speed;
    this.sprite = movingUpSprite;
    if (
      !this.detectCollisions(this.x, this.y, 'up', this.bombPass, this.wallPass)
    ) {
      this.y -= this.currentSpeed;
    } else {
      this.smoothTurn(this.x, this.y, 'up');
    }
  }

  moveRight() {
    this.currentSpeed = this.speed;
    this.sprite = movingRightSprite;
    if (
      !this.detectCollisions(
        this.x,
        this.y,
        'right',
        this.bombPass,
        this.wallPass
      )
    ) {
      this.x += this.currentSpeed;
    } else {
      this.smoothTurn(this.x, this.y, 'right');
    }
  }

  moveLeft() {
    this.currentSpeed = this.speed;
    this.sprite = movingLeftSprite;
    if (
      !this.detectCollisions(
        this.x,
        this.y,
        'left',
        this.bombPass,
        this.wallPass
      )
    ) {
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
      const col = gridMethods.getClosestCol(this.x);
      const row = gridMethods.getClosestRow(this.y);
      const bomb = new Bomb(this.scene, col, row, this.hasDetonator);
      bomb.deploy();
      this.bombStack.push(bomb);
      this.scene.blocks[col][row] = bomb;
    }
  }

  detonate() {
    if (!this.hasDetonator) return;
    _.first(this.bombStack).explode();
  }

  smoothTurn(x, y, direction) {
    if (direction === 'right' || direction === 'left') {
      const smoothDistanceHigh = Math.floor(UNIT_WIDTH / 3);
      const smoothDistanceLow = Math.floor((UNIT_WIDTH * 2) / 3);
      const offset = (y - MAP_TOP_MARGIN) % UNIT_WIDTH;
      if (offset >= smoothDistanceLow) {
        this.y += this.currentSpeed;
      } else if (offset > 0 && offset <= smoothDistanceHigh) {
        this.y -= this.currentSpeed;
      }
    } else if (direction === 'up' || direction === 'down') {
      const smoothDistanceHigh = Math.floor(UNIT_HEIGHT / 3);
      const smoothDistanceLow = Math.floor((UNIT_HEIGHT * 2) / 3);
      const offset = x % UNIT_HEIGHT;
      if (offset >= smoothDistanceLow) {
        this.x += this.currentSpeed;
      } else if (offset > 0 && offset <= smoothDistanceHigh) {
        this.x -= this.currentSpeed;
      }
    }
  }
}
