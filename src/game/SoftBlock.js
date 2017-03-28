import Sprite from '../Sprite';
import AnimatedSprite from '../AnimatedSprite';

export default class SoftBlock {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = new Sprite('sprite.png', 17, 241, 16, 16);
    this.destroySprite = new AnimatedSprite('sprite.png', 35, 241, 16, 16, [0, 1, 2, 3, 4, 5], 2);
  }

  draw(ctx) {
    this.sprite.draw(ctx, this.x, this.y);
  }

  destroy(ctx) {
    this.destroySprite.draw(ctx, this.x, this.y);
  }

}
