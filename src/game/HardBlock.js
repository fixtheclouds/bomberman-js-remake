import Sprite from '../elements/Sprite';
import { MAP_TOP_MARGIN, UNIT_WIDTH, UNIT_HEIGHT } from '../constants';

export default class HardBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = new Sprite('sprite.png', 0, 241, 16, 16);
  }

  draw(ctx, offsetX = 0) {
    this.img.draw(
      ctx,
      this.x * UNIT_WIDTH + offsetX,
      MAP_TOP_MARGIN + this.y * UNIT_HEIGHT
    );
  }
}
