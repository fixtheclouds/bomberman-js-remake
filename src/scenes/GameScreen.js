import Drawer from '../canvas/Drawer';
import Player from '../game/beings/Player';
import Scene from './Scene';
import Timer from '../game/Timer';
import TextString from '../canvas/TextString';
import HardBlock from '../game/blocks/HardBlock';
import SoftBlock from '../game/blocks/SoftBlock';
import Door from '../game/blocks/Door';
import Powerup from '../game/blocks/Powerup';
import CollisionDetector from '../utils/CollisionDetector';
import stages from '../stages';
import { gridMethods } from '../utils/gridMethods';
import { UNIT_WIDTH, MAP_TOP_MARGIN } from '../constants';
import Enemy from '../game/beings/Enemy';
import StageLoadingScreen from './StageLoadingScreen';
import GameOverScreen from './GameOverScreen';

const BG_COLOR = '#388400';
const SAFE_ZONE = [[1, 1], [2, 1], [1, 2]];

export default class GameScreen extends Scene {
  constructor(game, stage) {
    super(game);
    this.stage = stages[stage];
    this.collisionDetector = new CollisionDetector(this);
    this.player = new Player(game, this);
    this.player.bindKeyboard();
    this.enemies = [];
    this.blocks = [];
    _.times(this.stageCols, () => {
      this.blocks.push(Array.from({ length: this.stageRows }, () => []));
    });
    this.timer = new Timer(this.stage.time);
    this.secondsLeft = null;
    this.endGameAt = 0;
    this.drawer = new Drawer(this.ctx);
  }

  init() {
    this._game.soundManager.start('stage-theme', true);
    this._buildBlocks();
    this.spawnEnemies();
    this.timer.countdown();
  }

  end() {
    this._game.scene = new StageLoadingScreen(this._game, this);
  }

  gameOver() {
    this._game.scene = new GameOverScreen(this._game);
  }

  restart() {
    this.drawer.reset();
    this.player.reset();
    this.spawnEnemies();
    this.blocks = [];
    _.times(this.stageCols, () => {
      this.blocks.push(Array.from({ length: this.stageRows }, () => []));
    });
    this.timer = new Timer(this.stage.time);
    this.endGameAt = 0;
    this.init();
  }

  draw() {
    this._drawBG();
    this._drawHeader();
    this._drawBlocks();
    this.player.draw();
    _.invokeMap(this.enemies, 'draw');
  }

  update(frame) {
    this.player.update(frame);
    _.invokeMap(this.enemies, 'update', frame);
    this.player.keyPressCheck();
    this.updateBlocks(frame);
    this.secondsLeft = this.timer.seconds;
    if (this.secondsLeft <= this.endGameAt) {
      if (this.player.lives === 0) {
        this.gameOver();
      } else {
        this.end();
      }
    }
  }

  setPointOfView() {
    const { x } = this.player;
    const needShift = x > 512 / 4 && x < this.stageWidth - 512 / 4;
    if (needShift && this.player.direction === 'right') {
      this.drawer.changeOffset(-1);
    } else if (needShift && this.player.direction === 'left') {
      this.drawer.changeOffset(1);
    }
  }

  spawnEnemies() {
    this.enemies = [];
    _.forEach(this.stage.enemies, (count, type) => {
      _.times(count, () => this.enemies.push(new Enemy(this, type)));
    });
  }

  overlaps([col, row], [x, y]) {
    const cols = gridMethods.getCloseCols(x);
    const rows = gridMethods.getCloseRows(y);
    return !!(rows.includes(row) && cols.includes(col));
  }

  get stageCols() {
    return this.stage.size[0];
  }

  get stageRows() {
    return this.stage.size[1];
  }

  get stageWidth() {
    return this.stageCols * UNIT_WIDTH;
  }

  _drawBG() {
    this._ctx.fillStyle = BG_COLOR;
    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);
  }

  // Build field layout
  _buildBlocks() {
    _.times(this.stageCols, i => {
      _.times(this.stageRows, j => {
        if (
          i === 0 ||
          i === this.stageCols - 1 ||
          j === 0 ||
          j === this.stageRows - 1 ||
          (i % 2 === 0 && j % 2 === 0)
        ) {
          this.blocks[i][j].push(new HardBlock(i, j));
        } else if (
          Math.random() < this.stage.blockDensity &&
          i !== 1 &&
          j !== 1 &&
          !_.includes(SAFE_ZONE, [i, j])
        ) {
          this.blocks[i][j].push(new SoftBlock(i, j));
        }
      });
    });
    this._spawnDoor();
    this._spawnPowerup();
  }

  _spawnPowerup() {
    const [x, y] = _.sample(this.freeCells());
    this.blocks[x][y].push(new Powerup(x, y, this.stage.powerUp));
  }

  _spawnDoor() {
    const [x, y] = _.sample(this.freeCells());
    this.blocks[x][y].push(new Door(x, y));
  }

  _drawHeader() {
    this._ctx.fillStyle = '#BCBCBC';
    this._ctx.fillRect(0, 0, this._game.canvas.width, MAP_TOP_MARGIN * 2);

    const timeText = new TextString(
      `time ${this.secondsLeft}`,
      7,
      23,
      '#ffffff',
      '#000000'
    );
    timeText.draw();
    const { lives } = this.player;
    const leftText = new TextString(
      `left ${lives}`,
      192,
      23,
      '#ffffff',
      '#000000'
    );
    leftText.draw();
  }

  _drawBlocks() {
    this.blocks.forEach(cols => {
      cols.forEach(blocksInCell => {
        blocksInCell.forEach(block => {
          if (block) {
            block.draw();
          }
        });
      });
    });
  }

  freeCells(wallPass = false) {
    const cells = [];
    this.blocks.forEach((cols, col) => {
      cols.forEach((blocksInCell, row) => {
        if (
          blocksInCell.length === 0 ||
          (wallPass && blocksInCell.some(block => block instanceof SoftBlock))
        ) {
          cells.push([col, row]);
        }
      });
    });
    _.remove(cells, ([x, y]) =>
      _.some(SAFE_ZONE, ([safeX, safeY]) => safeX === x && safeY === y)
    );
    return cells;
  }

  burnSoftBlock(col, row) {
    const blocksInCell = this.blocks[col][row];
    blocksInCell.forEach(block => {
      if (block instanceof SoftBlock) {
        block.burn();
      }
    });
  }

  updateBlocks(frame) {
    this.blocks.forEach(cols => {
      cols.forEach(blocksInCell => {
        for (let i = blocksInCell.length - 1; i >= 0; i--) {
          const block = blocksInCell[i];
          if (!block) continue;
          if (block.animated) {
            block.update(frame);
          }
          if (block.destroyed) {
            blocksInCell.splice(i, 1);
          }
        }
      });
    });
  }

  damage(col, row) {
    if (
      this.overlaps([col, row], this.player.position) &&
      !this.player.flamePass
    ) {
      this.player.kill();
    }
    _.forEach(this.enemies, enemy => {
      if (this.overlaps([col, row], enemy.position)) {
        enemy.kill();
      }
    });
  }

  initiateEndGame() {
    this.endGameAt = this.secondsLeft - 3;
  }
}
