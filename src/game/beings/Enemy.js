import Being from './Being';
import types from '../enemies';
import { enemyAnimation } from '../animations';
import { gridMethods } from '../../utils/gridMethods';
import AnimatedSprite from '../../canvas/AnimatedSprite';

export default class Enemy extends Being {
  constructor(scene, type) {
    super(scene);
    _.extend(this, types[type]);
    _.extend(this, this._randomizePosition());
    this.animations = enemyAnimation[type];
    this.sprite = new AnimatedSprite(this.animations.left);

    const [col, row] = this._randomizePosition();
    this.x = gridMethods.getX(col);
    this.y = gridMethods.getY(row);
  }

  kill() {
    if (this.isAlive === false) return;
    this.isAlive = false;
    this.sprite = new AnimatedSprite(this.animations.death);
  }

  moveRandomly() {
    // TODO implement
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

  _randomizePosition() {
    const freeCells = this._scene.freeCells(this.wallPass);
    const index = Math.round(Math.random() * (freeCells.length - 1));
    return freeCells[index];
  }
}
