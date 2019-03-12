import { UNIT_WIDTH, UNIT_HEIGHT, MAP_TOP_MARGIN } from '../constants';

export const gridMethods = {
  getClosestCol(x) {
    const width = UNIT_WIDTH / 2;
    return Math.floor((x + width) / UNIT_WIDTH);
  },

  getClosestRow(y) {
    const height = UNIT_HEIGHT / 2;
    return Math.floor((y + height - MAP_TOP_MARGIN) / UNIT_HEIGHT);
  },

  getCloseCols(x) {
    return [Math.floor(x / UNIT_WIDTH), Math.ceil(x / UNIT_WIDTH)];
  },

  getCloseRows(y) {
    return [
      Math.floor((y - MAP_TOP_MARGIN) / UNIT_HEIGHT),
      Math.ceil((y - MAP_TOP_MARGIN) / UNIT_HEIGHT)
    ];
  },

  getNearbyCells(x, y) {
    const col = this.getClosestCol(x);
    const row = this.getClosestRow(y);

    return [[col - 1, row], [col, row - 1], [col + 1, row], [col, row + 1]];
  },

  getX(col) {
    return col * UNIT_WIDTH;
  },

  getY(row) {
    return row * UNIT_HEIGHT + MAP_TOP_MARGIN;
  },

  getCol(x) {
    return Math.floor(x / UNIT_WIDTH);
  },

  getRow(y) {
    return Math.floor((y - MAP_TOP_MARGIN) / UNIT_HEIGHT);
  },

  getNextCol(x) {
    return Math.floor((x + UNIT_WIDTH - 1) / UNIT_WIDTH);
  },

  getNextRow(y) {
    return Math.floor((y + UNIT_HEIGHT - 1 - MAP_TOP_MARGIN) / UNIT_HEIGHT);
  }
};
