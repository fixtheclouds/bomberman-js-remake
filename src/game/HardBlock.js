import Sprite from '../Sprite';

export default class HardBlock {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = new Sprite('sprite.png', 0, 241, 16, 16);
  }

  draw(ctx) {
    this.img.draw(ctx, this.x, this.y);
  }

}
