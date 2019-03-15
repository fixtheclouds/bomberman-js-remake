import Sprite from '../elements/Sprite';
import AnimatedSprite from '../elements/AnimatedSprite';
import { blockAnimation } from './animations';
import { UNIT_WIDTH, UNIT_HEIGHT, MAP_TOP_MARGIN } from '../constants';

export default class SoftBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = new Sprite('sprite.png', 17, 241, 16, 16);
    this.animated = false;
    this._destroyed = false;
  }

  draw(ctx, offsetX = 0) {
    if (this.sprite instanceof AnimatedSprite) {
      this.sprite.animate(ctx, {
        posX: this.x * UNIT_WIDTH + offsetX,
        posY: MAP_TOP_MARGIN + this.y * UNIT_HEIGHT,
        speed: 0.2
      });
      return;
    }
    this.sprite.draw(
      ctx,
      this.x * UNIT_WIDTH + offsetX,
      MAP_TOP_MARGIN + this.y * UNIT_HEIGHT
    );
  }

  update(frame) {
    this.sprite.frame = frame;
    if (this.sprite.done) this.destroy();
  }

  get destroyed() {
    return this._destroyed;
  }

  burn() {
    this.sprite = new AnimatedSprite(blockAnimation.burn);
    this.animated = true;
  }

  destroy() {
    this._destroyed = true;
  }
}
