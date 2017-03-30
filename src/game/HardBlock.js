import Sprite from '../Sprite';
import * as constants from '../constants';

export default class HardBlock {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = new Sprite('sprite.png', 0, 241, 16, 16);
  }

  draw(ctx) {
    this.img.draw(ctx, this.x * constants.UNIT_WIDTH, constants.MAP_TOP_MARGIN + this.y * constants.UNIT_HEIGHT);
  }

}
