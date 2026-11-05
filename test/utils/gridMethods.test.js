const assert = require('node:assert/strict');
const { gridMethods } = require('../../src/utils/gridMethods');

describe('gridMethods', () => {
  it('converts map coordinates to rows and columns', () => {
    assert.equal(gridMethods.getCol(31), 1);
    assert.equal(gridMethods.getRow(63), 1);
    assert.equal(gridMethods.getX(3), 48);
    assert.equal(gridMethods.getY(3), 80);
  });

  it('rounds to the nearest cell and returns adjacent cells near boundaries', () => {
    assert.equal(gridMethods.getClosestCol(8), 1);
    assert.equal(gridMethods.getClosestRow(40), 1);
    assert.deepEqual(gridMethods.getCloseCols(16), [1, 1]);
    assert.deepEqual(gridMethods.getCloseRows(48), [1, 1]);
    assert.deepEqual(gridMethods.getCloseCells(17, 49), [
      [1, 1],
      [2, 2]
    ]);
    assert.deepEqual(gridMethods.getNearbyCells(16, 48), [
      [0, 1],
      [1, 0],
      [2, 1],
      [1, 2]
    ]);
  });

  it('detects overlap only when positions share a nearby cell', () => {
    assert.equal(gridMethods.hasOverlap([16, 48], [16, 48]), true);
    assert.equal(gridMethods.hasOverlap([16, 48], [80, 112]), false);
  });
});
