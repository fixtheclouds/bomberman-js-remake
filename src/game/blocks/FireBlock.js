import AnimatedSprite from '../../canvas/AnimatedSprite';
import Unit from './Unit';
import { fireAnimation } from '../animations';

export default class FireBlock extends Unit {
  constructor(scene, x, y, fireType) {
    super(x, y);
    this.scene = scene;
    this.sprite = new AnimatedSprite(fireAnimation[fireType]);
  }

  update(frame) {
    super.update(frame);
    this.scene.damage(this.x, this.y);
    if (this.sprite.done) this.destroy();
  }
}
