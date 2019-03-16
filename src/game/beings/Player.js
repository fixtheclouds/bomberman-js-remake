import Being from './Being';
import Bomb from '../blocks/Bomb';
import { playerAnimation } from '../animations';
import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../../constants';
import { gridMethods } from '../../utils/gridMethods';
import AnimatedSprite from '../../canvas/AnimatedSprite';
import SoundManager from '../../utils/SoundManager';

const LIVES_COUNT = 3;
const ACTION_WAIT = 400;
const DEFAULT_POSITION = [UNIT_WIDTH, MAP_TOP_MARGIN + UNIT_HEIGHT];

export default class Player extends Being {
  constructor(game, scene) {
    super(scene);
    this._game = game;
    [this.x, this.y] = DEFAULT_POSITION;
    this.lives = LIVES_COUNT;
    this.speed = 1;
    this.currentSpeed = 0;
    this.direction = 'down';
    this.bombStack = [];

    // Abilities
    this.bombPass = false;
    this.wallPass = false;
    this.flamePass = false;
    this.fireRange = 1;
    this.maxBombs = 1;
    this.hasDetonator = false;
    this.throttledPlant = _.throttle(this.plant, ACTION_WAIT, {
      trailing: false
    });
    this.throttledDetonate = _.throttle(this.detonate, ACTION_WAIT, {
      trailing: false
    });
    this.throttledSound = _.throttle(SoundManager.play, 250, {
      trailing: false
    });

    this.sprites = {
      down: new AnimatedSprite(playerAnimation.down),
      up: new AnimatedSprite(playerAnimation.up),
      right: new AnimatedSprite(playerAnimation.right),
      left: new AnimatedSprite(playerAnimation.left),
      death: new AnimatedSprite(playerAnimation.death)
    };

    this.sprite = this.sprites.down;
  }

  kill() {
    if (this.isAlive === false) return;
    SoundManager.play('death.wav');
    this.isAlive = false;
    this.sprite = this.sprites.death;
    this.lives -= 1;
    if (this.lives === 0) {
      this._scene.initiateGameOver();
    } else {
      this._scene.initiateRestart();
    }
  }

  update(frame) {
    super.update(frame);
    this.sprite.animationSpeed = this.currentSpeed;
  }

  reset() {
    this.isAlive = true;
    this.sprite = this.sprites.down;
    [this.x, this.y] = DEFAULT_POSITION;
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
    return this._scene.collisionDetector.detect(...params);
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
      this.move('right');
    } else if (this._game.keys[37]) {
      this.move('left');
    } else if (this._game.keys[38]) {
      this.move('up');
    } else if (this._game.keys[40]) {
      this.move('down');
    }
    if (this._game.keys[17]) {
      // ctrl
      this.throttledPlant();
    }
    if (this._game.keys[32]) {
      //space
      this.throttledDetonate();
    }
  }

  stop() {
    this.currentSpeed = 0;
  }

  move(direction) {
    this.throttledSound('walk.wav');
    this.currentSpeed = this.speed;
    this.direction = direction;
    this.sprite = this.sprites[direction];
    if (
      !this.detectCollisions(
        this.x,
        this.y,
        direction,
        this.bombPass,
        this.wallPass
      )
    ) {
      switch (direction) {
        case 'up':
          this.y -= this.currentSpeed;
          break;
        case 'down':
          this.y += this.currentSpeed;
          break;
        case 'right':
          this.x += this.currentSpeed;
          break;
        case 'left':
          this.x -= this.currentSpeed;
          break;
      }
      this._scene.setPointOfView();
    } else {
      this.smoothTurn(this.x, this.y, direction);
    }
    if (this.collidesWithEnemy()) {
      this.kill();
    }
  }

  plant() {
    if (this.bombStack.length >= this.maxBombs) return;
    let col = gridMethods.getClosestCol(this.x);
    let row = gridMethods.getClosestRow(this.y);
    if (this.currentSpeed) {
      switch (this.direction) {
        case 'right':
          [col] = gridMethods.getCloseCols(this.x);
          break;
        case 'left':
          [, col] = gridMethods.getCloseCols(this.x);
          break;
        case 'up':
          [, row] = gridMethods.getCloseRows(this.y);
          break;
        case 'down':
          [row] = gridMethods.getCloseRows(this.y);
      }
    }
    if (this._scene.blocks[col][row] instanceof Bomb) return;
    const bomb = new Bomb(this._scene, col, row, {
      range: this.fireRange,
      isDetonatable: this.hasDetonator
    });
    bomb.deploy();
    this.bombStack.push(bomb);
    this._scene.blocks[col][row] = bomb;
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

  collidesWithEnemy() {
    return this._scene.enemies.some(
      enemy =>
        enemy.isAlive && gridMethods.hasOverlap(enemy.position, this.position)
    );
  }
}
