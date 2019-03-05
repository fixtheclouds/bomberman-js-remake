import Sprite from '../Sprite';
import AnimatedSprite from '../AnimatedSprite';
import * as constants from '../constants';

export default class SoftBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = new Sprite('sprite.png', 17, 241, 16, 16);
    this.destroySprite = new AnimatedSprite(
      'sprite.png',
      35,
      241,
      16,
      16,
      [0, 1, 2, 3, 4, 5],
      2
    );
  }

  draw(ctx) {
    this.sprite.draw(
      ctx,
      this.x * constants.UNIT_WIDTH,
      constants.MAP_TOP_MARGIN + this.y * constants.UNIT_HEIGHT
    );
  }
}
