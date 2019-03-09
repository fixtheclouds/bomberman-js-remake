import SoftBlock from '../game/SoftBlock';
import HardBlock from '../game/HardBlock';
import Bomb from '../game/Bomb';

import { UNIT_WIDTH, UNIT_HEIGHT, MAP_TOP_MARGIN } from '../constants';

export default class CollisionDetector {
  constructor(scene) {
    this.scene = scene;
  }

  detect(x, y, direction, bombPass, wallPass) {
    const { blocks } = this.scene;
    const col = getCol(x);
    const row = getRow(y);
    const nextCol = getNextCol(x) || col;
    const nextRow = getNextRow(y) || row;

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

const getCol = x => {
  return Math.floor(x / UNIT_WIDTH);
};

const getRow = y => {
  return Math.floor((y - MAP_TOP_MARGIN) / UNIT_HEIGHT);
};

const getNextCol = x => {
  return Math.floor((x + UNIT_WIDTH - 1) / UNIT_WIDTH);
};

const getNextRow = y => {
  return Math.floor((y + UNIT_HEIGHT - 1 - MAP_TOP_MARGIN) / UNIT_HEIGHT);
};
