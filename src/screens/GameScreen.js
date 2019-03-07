import Player from '../game/Player';
import Scene from './Scene';
import Timer from '../game/Timer';
import TextString from '../tools/TextString';
import HardBlock from '../game/HardBlock';
import SoftBlock from '../game/SoftBlock';
import Bomb from '../game/Bomb';
import CollisionDetector from '../utils/CollisionDetector';
import stages from '../stages';
import * as constants from '../constants';

const BG_COLOR = '#5F8B00';

export default class GameScreen extends Scene {
  constructor(game, stage) {
    super(game);
    this.stage = stages[stage];
    this.collisionDetector = new CollisionDetector(this);
    this.player = new Player(
      game,
      this,
      constants.UNIT_WIDTH,
      constants.MAP_TOP_MARGIN + constants.UNIT_HEIGHT
    );
    this.player.bindKeyboard();
    this.blocks = [];
    _.times(this.stageWidth, () => {
      this.blocks.push(new Array(this.stageHeight).fill(null));
    });
    this.timer = new Timer(this.stage.time);
    this.secondsLeft = null;
  }

  init() {
    this._game.soundManager.stop();
    this._game.soundManager.start('stage-theme', true);
    this._buildBlocks();
    this.timer.countdown();
  }

  draw() {
    this._drawBG();
    this._drawHeader();
    this._drawBlocks();
    this.player.draw();
  }

  update(frame) {
    this.player.update(frame);
    this.player.keyPressCheck();
    this.updateBombs(frame);
    this.secondsLeft = this.timer.seconds;
  }

  get stageWidth() {
    return this.stage.size[0];
  }

  get stageHeight() {
    return this.stage.size[1];
  }

  _drawBG() {
    this._ctx.fillStyle = BG_COLOR;
    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);
  }

  // Build field layout
  _buildBlocks() {
    _.times(this.stageWidth, i => {
      _.times(this.stageHeight, j => {
        if (
          i === 0 ||
          i === this.stageWidth - 1 ||
          j === 0 ||
          j === this.stageHeight - 1 ||
          (i % 2 === 0 && j % 2 === 0)
        ) {
          this.blocks[i][j] = new HardBlock(i, j);
        } else if (
          Math.random() < this.stage.blockDensity &&
          i !== 1 &&
          j !== 1
        ) {
          this.blocks[i][j] = new SoftBlock(i, j);
        }
      });
    });
  }

  _drawHeader() {
    this._ctx.fillStyle = '#BCBCBC';
    this._ctx.fillRect(
      0,
      0,
      this._game.canvas.width,
      constants.MAP_TOP_MARGIN * 2
    );

    const timeText = new TextString(
      `time ${this.secondsLeft}`,
      7,
      23,
      '#ffffff',
      '#000000'
    );
    timeText.draw(this._ctx);
    const { lives } = this.player;
    const leftText = new TextString(
      `left ${lives}`,
      192,
      23,
      '#ffffff',
      '#000000'
    );
    leftText.draw(this._ctx);
  }

  _drawBlocks() {
    this.blocks.forEach(row => {
      row.forEach(block => {
        if (block) {
          block.draw(this._ctx);
        }
      });
    });
  }

  updateBombs(frame) {
    this.blocks.forEach(row => {
      row.forEach(block => {
        if (block instanceof Bomb) {
          block.update(frame);
        }
      });
    });
  }
}
