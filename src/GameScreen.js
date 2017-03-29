
import Player from './game/Player';
import Scene from './Scene';
import Timer from './game/Timer';
import TextString from './TextString';
import HardBlock from './game/HardBlock';
import SoftBlock from './game/SoftBlock';
import CollisionDetector from './CollisionDetector';
import stages from './stages';
import * as constants from './constants';

const BGCOLOR = '#5F8B00';

export default class GameScreen extends Scene {

  constructor(game, stage) {
    super(game);
    let self = this;
    self.stage = stages[stage];
    self.collisionDetector = new CollisionDetector(this);
    self.player = new Player(game, this, constants.UNIT_WIDTH, constants.MAP_TOP_MARGIN + constants.UNIT_HEIGHT);
    self.player.bindKeyboard();
    self.blocks = [];
    _.times(self.stage.size[0], () => {
      let subArray = [];
      _.times(self.stage.size[1], () => {
        subArray.push(false);
      });
      self.blocks.push(subArray);
    });
    self.timer = new Timer(self.stage.time);
    self.secondsLeft = null;
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
    this.secondsLeft = this.timer.seconds;
  }

  _drawBG() {
    this._ctx.fillStyle = BGCOLOR;
    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);
  }

  // Build field layout
  _buildBlocks() {
    let self = this;
    _.times(self.stage.size[0], (i) => {
      _.times(self.stage.size[1], (j) => {
        if (i === 0 || i === self.stage.size[0] - 1 || j === 0 || j === self.stage.size[1] - 1 || (i % 2 === 0 && j % 2 === 0)) {
          self.blocks[i][j] = new HardBlock(i, j);
        } else if (Math.random() < self.stage.blockDensity && i !== 1 && j !== 1) {
          self.blocks[i][j] = new SoftBlock(i, j);
        }
      });
    });
  }

  _drawHeader() {
    this._ctx.fillStyle = '#BCBCBC';
    this._ctx.fillRect(0, 0, this._game.canvas.width, constants.MAP_TOP_MARGIN * 2);

    let timeText = new TextString(`time ${this.secondsLeft}`, 7, 23, '#ffffff', '#000000');
    timeText.draw(this._ctx);
    let lives = this.player.lives;
    let leftText = new TextString(`left ${lives}`, 192, 23, '#ffffff', '#000000');
    leftText.draw(this._ctx);
  }

  _drawBlocks() {
    this.blocks.forEach((row) => {
      row.forEach((block) => {
        if (block) { block.draw(this._ctx); }
      });
    });
  }

}
