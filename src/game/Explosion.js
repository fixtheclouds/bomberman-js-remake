import SoftBlock from './blocks/SoftBlock';
import HardBlock from './blocks/HardBlock';
import FireBlock from './blocks/FireBlock';
import SoundManager from '../utils/SoundManager';

export default class Explosion {
  constructor(scene, col, row, range) {
    this.scene = scene;
    this.col = col;
    this.row = row;
    this.range = range;
  }

  fire() {
    SoundManager.play('explosion.wav');
    ['up', 'right', 'down', 'left'].forEach(direction => {
      let x = this.col;
      let y = this.row;
      let i = 0;
      // Draw core
      this.dropFire(x, y, 'center');
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
          this.dropFire(
            x,
            y,
            this.constructor.computeFireType(edgeBlock, direction)
          );
        }
        i++;
      }
    });
  }

  dropFire(x, y, fireType) {
    this.scene.blocks[x][y] = new FireBlock(this.scene, x, y, fireType);
  }

  static computeFireType(isEdge, direction) {
    if (isEdge) {
      return `${direction}Edge`;
    } else {
      return ['left', 'right'].includes(direction) ? 'horizontal' : 'vertical';
    }
  }
}
