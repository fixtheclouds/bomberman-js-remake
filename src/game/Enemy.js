import types from './enemies';

export default class Enemy {
  constructor(scene, type) {
    this.isAlive = true;
    this._scene = scene;
    _.extend(this, types[type]);
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
}
