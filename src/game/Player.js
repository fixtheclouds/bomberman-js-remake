import Bomb from './Bomb';
import { playerAnimation } from './animations';
import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../constants';
import { gridMethods } from '../utils/gridMethods';
import AnimatedSprite from '../elements/AnimatedSprite';

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

    this.sprites = {
      moveDown: new AnimatedSprite(playerAnimation.down),
      moveUp: new AnimatedSprite(playerAnimation.up),
      moveRight: new AnimatedSprite(playerAnimation.right),
      moveLeft: new AnimatedSprite(playerAnimation.left),
      death: new AnimatedSprite(playerAnimation.death)
    };

    this.sprite = this.sprites.moveDown;
  }

  kill() {
    if (this.isAlive === false) return;
    this.isAlive = false;
    this.sprite = this.sprites.death;
    this.lives -= 1;
    if (this.lives === 0) {
      this.scene.initiateGameOver();
    } else {
      this.scene.initiateRestart();
    }
  }

  reset() {
    this.isAlive = true;
    this.sprite = this.sprites.moveDown;
    this.x = UNIT_WIDTH;
    this.y = MAP_TOP_MARGIN + UNIT_HEIGHT;
  }

  get position() {
    return [this.x, this.y];
  }

  get cellPosition() {
    return [
      gridMethods.getClosestCol(this.x),
      gridMethods.getClosestRow(this.y)
    ];
  }

  detectCollisions(...params) {
    return this.scene.collisionDetector.detect(...params);
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
    if (this.isAlive === false) return;
    if (this._game.keys[39]) {
      this.moveRight();
    } else if (this._game.keys[37]) {
      this.moveLeft();
    } else if (this._game.keys[38]) {
      this.moveUp();
    } else if (this._game.keys[40]) {
      this.moveDown();
    }
    if (this._game.keys[17]) {
      // ctrl
      this.plant();
    }
    if (this._game.keys[32]) {
      //space
      this.detonate();
    }
  }

  stop() {
    this.currentSpeed = 0;
  }

  moveDown() {
    this.currentSpeed = this.speed;
    this.sprite = this.sprites.moveDown;
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
    this.sprite = this.sprites.moveUp;
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
    this.sprite = this.sprites.moveRight;
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
    this.sprite = this.sprites.moveLeft;
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
    if (this.sprite.animated) {
      this.sprite.animate(this._ctx, {
        posX: this.x,
        posY: this.y,
        speed: 0.2
      });
      return;
    }
    this.sprite.draw(this._ctx, this.x, this.y);
  }

  update(frame) {
    this.sprite.animationSpeed = this.currentSpeed;
    this.sprite.frame = frame;
  }

  plant() {
    if (this.bombStack.length >= this.maxBombs) return;
    const col = gridMethods.getClosestCol(this.x);
    const row = gridMethods.getClosestRow(this.y);
    const bomb = new Bomb(
      this.scene,
      col,
      row,
      this.fireRange,
      this.hasDetonator
    );
    bomb.deploy();
    this.bombStack.push(bomb);
    this.scene.blocks[col][row] = bomb;
  }

  detonate() {
    if (!this.hasDetonator || _.isEmpty(this.bombStack)) return;
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
