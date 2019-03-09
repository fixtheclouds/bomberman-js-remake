import OldAnimatedSprite from '../elements/OldAnimatedSprite';
import Explosion from './Explosion';
import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../constants';

export default class Bomb {
  constructor(scene, x, y, range, isDetonatable) {
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.timer = null;
    this.isDetonatable = isDetonatable;
    this.sprite = new OldAnimatedSprite(
      'sprite.png',
      83,
      21,
      16,
      16,
      [0, 1, 2],
      [0, 1, 3]
    );
    this.sprite.speed = 1;
    this.explosion = new Explosion(scene, x, y, range);
    this.seconds = 2;
  }

  get animated() {
    return true;
  }

  draw(ctx) {
    this.sprite.animate(
      ctx,
      this.x * UNIT_WIDTH,
      MAP_TOP_MARGIN + this.y * UNIT_HEIGHT,
      0.2
    );
  }

  destroy() {
    this.scene.player.bombStack = this.scene.player.bombStack.slice(1);
  }

  update(frame) {
    this.sprite.frame = frame;
  }

  deploy() {
    if (!this.isDetonatable) {
      this.countdown();
    }
  }

  explode() {
    this.destroy();
    this.explosion.fire();
  }

  countdown() {
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        clearInterval(this.timer);
        this.explode();
      }
    }, 1000);
  }
}
