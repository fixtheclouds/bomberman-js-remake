import AnimatedSprite from '../elements/AnimatedSprite';
import SoftBlock from './SoftBlock';
import HardBlock from './HardBlock';

export default class Explosion {
  constructor(scene, col, row, range) {
    this.scene = scene;
    this.col = col;
    this.row = row;
    this.range = range;
    this.sprites = {
      left: new AnimatedSprite(),
      right: new AnimatedSprite(),
      up: new AnimatedSprite(),
      down: new AnimatedSprite(),
      center: new AnimatedSprite(),
      leftEdge: new AnimatedSprite(),
      rightEdge: new AnimatedSprite(),
      upEdge: new AnimatedSprite(),
      downEdge: new AnimatedSprite()
    };
  }

  fire() {
    ['up', 'right', 'down', 'left'].each(direction => {
      let x = this.col;
      let y = this.row;
      for (let i = 1; i++; i <= this.range) {
        if (direction === 'up') {
          y--;
        } else if (direction === 'down') {
          y++;
        } else if (direction === 'left') {
          x--;
        } else if (direction === 'right') {
          x++;
        }
        const edgeBlock = i === this.range;
        if (this.scene.blocks[x][y] instanceof SoftBlock) {
          this.scene.destroySoftBlock(x, y);
          break;
        } else if (this.scene.blocks[x][y] instanceof HardBlock) {
          break;
        } else {
          this.drawBlock(x, y, edgeBlock ? direction + 'Edge' : direction);
          // TODO publish explosion event with respective duration
        }
      }
    });
  }

  drawBlock(col, row, type) {
    this.sprites[type].draw();
  }
}
