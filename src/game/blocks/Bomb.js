import Unit from './Unit';
import AnimatedSprite from '../../canvas/AnimatedSprite';
import Explosion from '../Explosion';
import SoundManager from '../../utils/SoundManager';
import { bombAnimation } from '../animations';

export default class Bomb extends Unit {
  constructor(scene, x, y, { range, isDetonatable }) {
    super(x, y);
    this.scene = scene;
    this.timer = null;
    this.isDetonatable = isDetonatable;
    this.sprite = new AnimatedSprite(bombAnimation);
    this.sprite.animationSpeed = 1;
    this.explosion = new Explosion(scene, x, y, range);
    this.seconds = 2;
    this.passableBy = null;
  }

  destroy() {
    super.destroy();
    clearInterval(this.timer);
    this.scene.player.bombStack = this.scene.player.bombStack.filter(
      bomb => bomb !== this
    );
  }

  deploy() {
    SoundManager.play('plant.wav');
    if (!this.isDetonatable) {
      this.countdown();
    }
  }

  explode() {
    if (this.destroyed) return;
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
