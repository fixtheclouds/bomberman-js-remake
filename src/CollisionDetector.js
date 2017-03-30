import SoftBlock from './game/SoftBlock';
import HardBlock from './game/HardBlock';
import Bomb from './game/Bomb';

import * as constants from './constants';

export default class CollisionDetector {

  constructor(scene) {
    this.scene = scene;
  }

  detect(x, y, direction, bombpass, wallpass) {
    let blocks = this.scene.blocks;
    let col = getCol(x);
    let row = getRow(y);
    let nextCol = getNextCol(x) || col;
    let nextRow = getNextRow(y) || row;

    let checkBlocking = function(x, y) {
      let block = blocks[x][y];
      if (block instanceof HardBlock) {
        return true;
      } else if (!wallpass && block instanceof SoftBlock) {
        return true;
      } else if (!bombpass && block instanceof Bomb) {
        return true;
      }
      return false;
    };

    if (direction === 'left') {
      return checkBlocking(col, row) || checkBlocking(col, nextRow);
    } else if (direction === 'right') {
      return checkBlocking(col + 1, row) || checkBlocking(col + 1, nextRow);
    } else if (direction === 'up') {
      return checkBlocking(col, row) || checkBlocking(nextCol, row);
    } else if (direction === 'down') {
      return checkBlocking(col, row + 1) || checkBlocking(nextCol, row + 1);
    }
    return false;
  }

}

let getCol = (x) => {
  return Math.floor(x / constants.UNIT_WIDTH);
};

let getRow = (y) => {
  return Math.floor((y - constants.MAP_TOP_MARGIN) / constants.UNIT_HEIGHT);
};

let getNextCol = (x) => {
  return Math.floor((x + constants.UNIT_WIDTH - 1) / constants.UNIT_WIDTH);
};

let getNextRow = (y) => {
  return Math.floor((y + constants.UNIT_HEIGHT - 1 - constants.MAP_TOP_MARGIN) / constants.UNIT_HEIGHT);
};
