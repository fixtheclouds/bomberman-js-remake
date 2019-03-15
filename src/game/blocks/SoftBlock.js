import Sprite from '../../canvas/Sprite';
import Unit from './Unit';
import AnimatedSprite from '../../canvas/AnimatedSprite';
import { blockAnimation } from '../animations';

export default class SoftBlock extends Unit {
  constructor(x, y) {
    super(x, y);
    this.sprite = new Sprite({
      x: 17,
      y: 241,
      width: 16,
      height: 16
    });
  }

  update(frame) {
    super.update(frame);
    if (this.sprite.done) this.destroy();
  }

  burn() {
    this.sprite = new AnimatedSprite(blockAnimation.burn);
  }
}
