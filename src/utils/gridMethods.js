import * as constants from '../constants';

export const gridMethods = {
  getClosestCol(x) {
    const width = constants.UNIT_WIDTH / 2;
    return Math.floor((x + width) / constants.UNIT_WIDTH);
  },

  getClosestRow(y) {
    const width = constants.UNIT_HEIGHT / 2;
    return Math.floor(
      (y + width - constants.MAP_TOP_MARGIN) / constants.UNIT_HEIGHT
    );
  },

  getCol(x) {
    return Math.floor(x / constants.UNIT_WIDTH);
  },

  getRow(y) {
    return Math.floor((y - constants.MAP_TOP_MARGIN) / constants.UNIT_HEIGHT);
  },

  getNextCol(x) {
    return Math.floor((x + constants.UNIT_WIDTH - 1) / constants.UNIT_WIDTH);
  },

  getNextRow(y) {
    return Math.floor(
      (y + constants.UNIT_HEIGHT - 1 - constants.MAP_TOP_MARGIN) /
        constants.UNIT_HEIGHT
    );
  }
};
