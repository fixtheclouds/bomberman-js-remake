import AnimatedSprite from '../AnimatedSprite';

const LIVES_COUNT = 3;
const PLAYER_MOVING_SPEED = 1;

export default class Player {

  constructor(game, x, y) {
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 16;
    this.lives = LIVES_COUNT;
    this.speed = 0;
    this._frame = 0;
    this._game = game;
    this._ctx = game.ctx;
    this.isAlive = true;
    this.isMoving = false;

    this.movingUpSprite = new AnimatedSprite('sprite.png', 2, 21, 12, 16, [1, 2], 2);
    this.movingDownSprite = new AnimatedSprite('sprite.png', 2, 3, 12, 16, [1, 2], 2);
    this.movingLeftSprite = new AnimatedSprite('sprite.png', 44, 21, 12, 16, [1, 2], 1);
    this.movingRightSprite = new AnimatedSprite('sprite.png', 43, 3, 12, 16, [1, 2], 1);
    this.deathSprite = new AnimatedSprite('sprite.png', 83, 3, 12, 16, [0, 1, 2, 3, 4, 5], 1, false);

    this._sprite = this.movingUpSprite;

  }

  get centerX() {
    return this.x + (this.width / 2);
  }

  get centerY() {
    return this.y + (this.height / 2);
  }

  kill() {
    this.isAlive = false;
    this._sprite = this.deathSprite;
  }

  bindKeyboard() {
    document.addEventListener('keydown', e => {
      this._game.keys[e.keyCode] = true;
    });

    document.addEventListener('keyup', e => {
      this._game.keys[e.keyCode] = false;
    });
  }

  keyPressCheck() {
    this.stop();
    if (this._game.keys[39]) {
      this.moveRight();
    } else if (this._game.keys[37]) {
      this.moveLeft();
    } else if (this._game.keys[38]) {
      this.moveUp();
    } else if (this._game.keys[40]) {
      this.moveDown();
    } else if (this._game.keys[18]) {
      this.plant();
    } else if (this._game.keys[19]) {
      this.detonate();
    }
  }

  stop() {
    this.speed = 0;
  }

  moveDown() {
    this.speed = PLAYER_MOVING_SPEED;
    this._sprite = this.movingDownSprite;
    if (this.y < this._game.canvas.height - this.height) {
      this.y += this.speed;
    }
  }

  moveUp() {
    this.speed = PLAYER_MOVING_SPEED;
    this._sprite = this.movingUpSprite;
    if (this.y > this.width) {
      this.y -= this.speed;
    }
  }

  moveRight() {
    this.speed = PLAYER_MOVING_SPEED;
    this._sprite = this.movingRightSprite;
    if (this.x < this._game.canvas.width - this.width) {
      this.x += this.speed;
    }
  }

  moveLeft() {
    this.speed = PLAYER_MOVING_SPEED;
    this._sprite = this.movingLeftSprite;
    if (this.x > this.width) {
      this.x -= this.speed;
    }
  }

  draw() {
    this._sprite.draw(this._ctx, this.x, this.y);
  }

  update(frame) {
    this._frame = frame;
    this._sprite.speed = this.speed;
    this._sprite.frame = this._frame;
  }

  plant() {
    // TODO implement
  }

  detonate() {
    // TODO implement
  }

}
