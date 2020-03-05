import SoftBlock from '../game/blocks/SoftBlock';
import HardBlock from '../game/blocks/HardBlock';
import Bomb from '../game/blocks/Bomb';
import { gridMethods } from './gridMethods';

export default class CollisionDetector {
  constructor(scene) {
    this.scene = scene;
  }

  detect(x, y, direction, bombPass, wallPass) {
    // TODO this should not happen at all
    if (_.isNaN(x) || _.isNaN(y)) return;

    const { blocks } = this.scene;
    const col = gridMethods.getCol(x);
    const row = gridMethods.getRow(y);
    const nextCol = gridMethods.getNextCol(x) || col;
    const nextRow = gridMethods.getNextRow(y) || row;

    const checkBlocking = function(x, y) {
      const block = blocks[x][y];
      if (block instanceof HardBlock) {
        return true;
      } else if (!wallPass && block instanceof SoftBlock) {
        return true;
      } else if (!bombPass && block instanceof Bomb) {
        return true;
      }
      return false;
    };

    switch (direction) {
      case 'left':
        return checkBlocking(col, row) || checkBlocking(col, nextRow);
      case 'right':
        return checkBlocking(col + 1, row) || checkBlocking(col + 1, nextRow);
      case 'up':
        return checkBlocking(col, row) || checkBlocking(nextCol, row);
      case 'down':
        return checkBlocking(col, row + 1) || checkBlocking(nextCol, row + 1);
      default:
        return false;
    }
  }
}
