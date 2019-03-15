import Unit from './Unit';
import Sprite from '../../canvas/Sprite';

export default class HardBlock extends Unit {
  constructor(x, y) {
    super(x, y);
    this.sprite = new Sprite({
      x: 0,
      y: 241,
      width: 16,
      height: 16
    });
  }
}
