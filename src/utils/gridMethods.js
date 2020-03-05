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

  getCloseCells(x, y) {
    const [col1, col2] = this.getCloseCols(x);
    const [row1, row2] = this.getCloseRows(y);
    return [[col1, row1], [col2, row2]];
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
  },

  hasOverlap([x1, y1], [x2, y2]) {
    const cells1 = this.getCloseCells(x1, y1);
    const cells2 = this.getCloseCells(x2, y2);

    return _.some(cells1, ([x3, y3]) =>
      _.some(cells2, ([x4, y4]) => x3 === x4 && y3 === y4)
    );
  }
};
