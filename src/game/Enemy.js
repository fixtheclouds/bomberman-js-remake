import types from './enemies';
import { enemyAnimation } from './animations';
import { gridMethods } from '../utils/gridMethods';
import AnimatedSprite from '../elements/AnimatedSprite';

export default class Enemy {
  constructor(ctx, scene, type) {
    this.isAlive = true;
    this._ctx = ctx;
    this._scene = scene;
    _.extend(this, types[type]);
    _.extend(this, this._randomizePosition());
    this.sprite = new AnimatedSprite(enemyAnimation[type].left);

    const [col, row] = this._randomizePosition();
    this.x = gridMethods.getX(col);
    this.y = gridMethods.getY(row);
  }

  die() {
    // TODO implement
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
    this.sprite.frame = frame;
  }

  _randomizePosition() {
    const freeCells = this._scene.freeCells(this.wallPass);
    const index = Math.round(Math.random() * (freeCells.length - 1));
    return freeCells[index];
  }
}
