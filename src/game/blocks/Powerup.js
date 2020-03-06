import SoftBlock from './SoftBlock';
import Sprite from '../../canvas/Sprite';
import powerups from '../powerups';

export default class Powerup extends SoftBlock {
  constructor(x, y, type) {
    super(x, y);
    this.hidden = true;
    this.type = type;
    this.action = powerups[type].action;
  }

  update() {}

  burn() {
    this.hidden = false;
    this.sprite = new Sprite(powerups[this.type].sprite);
  }

  pickUp() {
    this.destroy();
  }
}
