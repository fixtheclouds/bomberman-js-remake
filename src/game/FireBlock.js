import AnimatedSprite from '../elements/AnimatedSprite';
import { fireAnimation } from './animations';
import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../constants';

export default class FireBlock {
  constructor(x, y, fireType) {
    this.x = x;
    this.y = y;

    this._destroyed = false;
    this.sprite = new AnimatedSprite(fireAnimation[fireType]);
  }

  get animated() {
    return true;
  }

  get destroyed() {
    return this._destroyed;
  }

  draw(ctx) {
    this.sprite.animate(ctx, {
      posX: this.x * UNIT_WIDTH,
      posY: MAP_TOP_MARGIN + this.y * UNIT_HEIGHT,
      speed: 0.2
    });
  }

  destroy() {
    this._destroyed = true;
  }

  update(frame) {
    this.sprite.frame = frame;
    if (this.sprite.done) this.destroy();
  }
}
