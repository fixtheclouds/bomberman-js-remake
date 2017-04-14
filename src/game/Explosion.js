import AnimatedSprite from '../AnimatedSprite';
import SoftBlock from './SoftBlock';
import HardBlock from './HardBlock';

export default class Explosion {

  constructor(scene, col, row, range) {
    this.scene = scene;
    this.col = col;
    this.row = row;
    this.range = range;
  }

  fire() {
    let self = this;
    ['up', 'right', 'down', 'left'].each((direction) => {
      let x = self.col;
      let y = self.row;
      for (let i = 1; i++; i <= self.range) {
        if (direction === 'up') {
          y--;
        } else if (direction === 'down') {
          y++;
        } else if (direction === 'left') {
          x--;
        } else if (direction === 'right') {
          x++;
        }
        let edgeBlock = i == self.range;
        if (self.scene.blocks[x][y] instanceof SoftBlock) {
          self.scene.destroySoftBlock(x, y);
          break;
        } else if (self.scene.blocks[x][y] instanceof HardBlock) {
          break;
        } else {
          self.drawBlock(x, y, edgeBlock ? direction + 'Edge' : direction);
        }
      }
    });
  }

  drawBlock(col, row, type) {
    // TODO implement
  }

}
