import SoftBlock from './SoftBlock';
import Sprite from '../../canvas/Sprite';

export default class Door extends SoftBlock {
  constructor(x, y) {
    super(x, y);
    this.hidden = true;
  }

  update() {}

  burn() {
    this.hidden = false;
    this.sprite = new Sprite({
      x: 0,
      y: 223,
      width: 16,
      height: 16
    });
  }
}
