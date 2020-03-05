import Being from './Being';
import types from '../enemies';
import { enemyAnimation } from '../animations';
import { gridMethods } from '../../utils/gridMethods';
import AnimatedSprite from '../../canvas/AnimatedSprite';
import { UNIT_WIDTH } from '../../constants';

const MOVES_UNTIL_TURN = UNIT_WIDTH * 2;
const DIRECTIONS = ['left', 'right', 'up', 'down', 'none'];

export default class Enemy extends Being {
  constructor(scene, type) {
    super(scene);
    _.extend(this, types[type]);
    this.currentSpeed = this.speed;
    this.direction = 'down';
    this.bombPass = false;
    this.animations = enemyAnimation[type];
    this.sprite = new AnimatedSprite(this.animations.left);

    const [col, row] = this._randomizePosition();
    this.x = gridMethods.getX(col);
    this.y = gridMethods.getY(row);
    this.lastDirection = null;
    this.lastDirectionCounter = 0;
    this.doTurn();
  }

  kill() {
    if (this.isAlive === false) return;
    this.stop();
    this.isAlive = false;
    this.sprite = new AnimatedSprite(this.animations.death);
  }

  moveRandomly() {
    if (!this.isAlive) return;

    this.lastDirectionCounter++;

    if (this.lastDirectionCounter === MOVES_UNTIL_TURN) {
      this.doTurn();
    }
    if (this.lastDirection === 'none') return;
    this.move(this.lastDirection);
  }

  doTurn() {
    this.lastDirectionCounter = 0;
    this.lastDirection = _.sample(
      _.difference(DIRECTIONS, [this.lastDirection])
    );
    if (this.lastDirection === 'right') {
      this.sprite = new AnimatedSprite(this.animations.right);
    } else if (this.lastDirection === 'left') {
      this.sprite = new AnimatedSprite(this.animations.left);
    }
  }

  moveTowardsPlayer() {
    // TODO implement
  }

  moveAwayFromBomb() {
    // TODO implement
  }

  availableDirections() {
    // TODO implement
  }

  whenStuck() {
    return this.doTurn();
  }

  move(direction) {
    this.direction = direction;
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
    } else {
      this.smoothTurn(this.x, this.y, direction);
    }
  }

  update(frame) {
    super.update(frame);
    this.moveRandomly();
  }

  _randomizePosition() {
    const freeCells = this._scene.freeCells(this.wallPass);
    return _.sample(freeCells);
  }
}
