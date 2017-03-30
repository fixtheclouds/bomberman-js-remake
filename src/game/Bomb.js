import Sprite from '../Sprite';
import AnimatedSprite from '../AnimatedSprite';
import * as constants from '../constants';

export default class Bomb {

  constructor(scene, x, y, isDetonatable) {
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.timer;
    this.isDetonatable = isDetonatable;
    this.sprite = new AnimatedSprite('sprite.png', 83, 21, 16, 16, [0, 1, 2], [0, 1, 3]);
    this.sprite.speed = 1;
    this.seconds = 2;
  }

  draw(ctx) {
    this.sprite.animate(ctx, this.x * constants.UNIT_WIDTH, constants.MAP_TOP_MARGIN + this.y * constants.UNIT_HEIGHT, 0.2);
  }


  destroy() {
    this.scene.blocks[this.x][this.y] = null;
    this.scene.player.bombStack = this.scene.player.bombStack.slice(1);
  }

  update(frame) {
    this.sprite.frame = frame;
  }

  deploy() {
    if (!this.isDetonatable) {
      this.countdown();
    }
  }

  explode() {
    // TODO invoke EXPLOSION
    this.destroy();
  }

  countdown() {
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        clearInterval(this.timer);
        this.explode();
      }
    }, 1000);
  }

}
