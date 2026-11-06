import SoftBlock from '../game/blocks/SoftBlock';
import HardBlock from '../game/blocks/HardBlock';
import Bomb from '../game/blocks/Bomb';
import { gridMethods } from './gridMethods';

export default class CollisionDetector {
  constructor(scene) {
    this.scene = scene;
  }

  detect(being, x, y, direction, bombPass, wallPass) {
    // TODO this should not happen at all
    if (_.isNaN(x) || _.isNaN(y)) return;

    const { blocks } = this.scene;
    const col = gridMethods.getCol(x);
    const row = gridMethods.getRow(y);
    const nextCol = gridMethods.getNextCol(x) || col;
    const nextRow = gridMethods.getNextRow(y) || row;

    const checkBlocking = (x, y) => {
      const blocksInCell = blocks[x][y];
      for (const block of blocksInCell) {
        if (block instanceof HardBlock) {
          return true;
        } else if (!wallPass && block instanceof SoftBlock) {
          return true;
        } else if (!bombPass && block instanceof Bomb) {
          if (block.passableBy === being) {
            if (this.scene.overlaps([x, y], being.position)) continue;
            block.passableBy = null;
          }
          return true;
        }
      }
      return false;
    };

    switch (direction) {
      case 'left':
        return (
          checkBlocking(gridMethods.getCol(x - 1), row) ||
          checkBlocking(gridMethods.getCol(x - 1), nextRow)
        );
      case 'right':
        return checkBlocking(col + 1, row) || checkBlocking(col + 1, nextRow);
      case 'up':
        return (
          checkBlocking(col, gridMethods.getRow(y - 1)) ||
          checkBlocking(nextCol, gridMethods.getRow(y - 1))
        );
      case 'down':
        return checkBlocking(col, row + 1) || checkBlocking(nextCol, row + 1);
      default:
        return false;
    }
  }
}
