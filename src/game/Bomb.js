import AnimatedSprite from '../elements/AnimatedSprite';
import Explosion from './Explosion';
import SoundManager from '../utils/SoundManager';
import { bombAnimation } from './animations';
import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../constants';

export default class Bomb {
  constructor(scene, x, y, range, isDetonatable) {
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.timer = null;
    this.isDetonatable = isDetonatable;
    this.sprite = new AnimatedSprite(bombAnimation);
    this.sprite.speed = 1;
    this.explosion = new Explosion(scene, x, y, range);
    this.seconds = 2;
  }

  get animated() {
    return true;
  }

  draw(ctx) {
    this.sprite.animate(ctx, {
      posX: this.x * UNIT_WIDTH,
      posY: MAP_TOP_MARGIN + this.y * UNIT_HEIGHT,
      speed: 0.2
    });
  }

  destroy() {
    this.scene.player.bombStack = this.scene.player.bombStack.slice(1);
  }

  update(frame) {
    this.sprite.frame = frame;
  }

  deploy() {
    SoundManager.play('plant.wav');
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
