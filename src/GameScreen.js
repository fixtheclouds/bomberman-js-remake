
import Player from './game/Player';
import Scene from './Scene';
import Sprite from './Sprite';
import TextString from './TextString';
import HardBlock from './game/HardBlock';
import * as constants from './constants';

const BGCOLOR = '#1F8B00';
const SOFT_BLOCKS_COUNT = 6; // TODO move to stages

export default class GameScreen extends Scene {

  constructor(game) {
    super(game);
    let self = this;
    self.player = new Player(game, constants.UNIT_SIZE[0], constants.MAP_TOP_MARGIN + constants.UNIT_SIZE[1]);
    self.player.bindKeyboard();
    self.blocksUsed = [];
    _.times(constants.FIELD_SIZE[0], () => {
      let subArray = [];
      _.times(constants.FIELD_SIZE[1], () => {
        subArray.push(false);
      });
      self.blocksUsed.push(subArray);
    });
  }

  init() {
    this._game.soundManager.stop();
    this._game.soundManager.start('stage-theme', true);
  }

  draw() {
    this._drawBG();
    this._drawHardBlocks();
    this.player.draw();
  }

  update(frame) {
    this.player.update(frame);
    this.player.keyPressCheck();
  }

  _drawBG() {
    this._ctx.fillStyle = BGCOLOR;
    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);
  }

  // Build field layout
  _drawHardBlocks() {
    let self = this;
    let hardBlocks = [];
    _.times(constants.FIELD_SIZE[0], (i) => {
      _.times(constants.FIELD_SIZE[1], (j) => {
        if (i === 0 || i === constants.FIELD_SIZE[0] - 1 || j === 0 || j === constants.FIELD_SIZE[1] - 1 || (i % 2 === 0 && j % 2 === 0)) {
          hardBlocks.push(new HardBlock(i * constants.UNIT_SIZE[0], constants.MAP_TOP_MARGIN + j * constants.UNIT_SIZE[1]));
          self.blocksUsed[i][j] = true;
        }
      });
    });
    hardBlocks.forEach((e) => e.draw(this._ctx));
  }

  _drawSoftBlocks() {
    _.times(SOFT_BLOCKS_COUNT, () => {
      // TODO implement
    });
  }


}
