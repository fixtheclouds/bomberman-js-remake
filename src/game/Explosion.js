import SoftBlock from './SoftBlock';
import HardBlock from './HardBlock';
import FireBlock from './FireBlock';

export default class Explosion {
  constructor(scene, col, row, range) {
    this.scene = scene;
    this.col = col;
    this.row = row;
    this.range = range;
  }

  fire() {
    ['up', 'right', 'down', 'left'].forEach(direction => {
      let x = this.col;
      let y = this.row;
      let i = 0;
      // Draw core
      this.scene.blocks[x][y] = new FireBlock(x, y, 'center');
      while (i < this.range) {
        if (direction === 'up') {
          y--;
        } else if (direction === 'down') {
          y++;
        } else if (direction === 'left') {
          x--;
        } else if (direction === 'right') {
          x++;
        }

        if (this.scene.blocks[x][y] instanceof SoftBlock) {
          this.scene.burnSoftBlock(x, y);
          return;
        } else if (this.scene.blocks[x][y] instanceof HardBlock) {
          return;
        } else {
          const edgeBlock = i === this.range - 1;
          this.scene.blocks[x][y] = new FireBlock(
            x,
            y,
            this.constructor.computeFireType(edgeBlock, direction)
          );
        }
        i++;
      }
    });
  }

  static computeFireType(isEdge, direction) {
    if (isEdge) {
      return `${direction}Edge`;
    } else {
      return ['left', 'right'].includes(direction) ? 'horizontal' : 'vertical';
    }
  }
}
