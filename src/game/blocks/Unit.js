import AnimatedSprite from '../../canvas/AnimatedSprite';
import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../../constants';

export default class Unit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this._destroyed = false;
  }

  get animated() {
    return this.sprite instanceof AnimatedSprite && this.sprite.animated;
  }

  draw() {
    const params = {
      posX: this.x * UNIT_WIDTH,
      posY: MAP_TOP_MARGIN + this.y * UNIT_HEIGHT
    };
    if (this.animated) {
      return this.sprite.animate({
        ...params,
        speed: 0.4
      });
    }
    return this.sprite.draw(params);
  }

  destroy() {
    this._destroyed = true;
  }

  update(frame) {
    this.sprite.frame = frame;
  }

  get destroyed() {
    return this._destroyed;
  }
}
