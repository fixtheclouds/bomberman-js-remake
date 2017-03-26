import AnimatedSprite from './AnimatedSprite';

const LIVES_COUNT = 3;

let movingUpSprite = new AnimatedSprite('sprite.png', 2, 3, 12, 16, [1, 2], 2);
let movingDownSprite = new AnimatedSprite('sprite.png', 2, 21, 12, 16, [1, 2], 2);
let movingLeftSprite = new AnimatedSprite('sprite.png', 44, 21, 12, 16, [1, 2], 2);
let movingRightSprite = new AnimatedSprite('sprite.png', 43, 3, 12, 16, [1, 2], 2);
let deathSprite = new AnimatedSprite('sprite.png', 83, 3, 12, 16, [0, 1, 2, 3, 4, 5], 2, false);

export default class Player {

  constructor(game, x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.lives = LIVES_COUNT;
    this.speed = 0;
    this._frame = 0;
    this._game = game;
    this._ctx = game.ctx;
    this.isAlive = true;
    this.isMoving = false;
    this._sprite = movingUpSprite;
  }

  get centerX() {
    return this.x + (this.width / 2);
  }

  get centerY() {
    return this.y + (this.height / 2);
  }

  kill() {
    this.isAlive = false;
    this._sprite = deathSprite;
  }

  bindKeyboard() {
    document.addEventListener('keydown', e => {
      this.game.keys[e.keyCode] = true;
    });

    document.addEventListener('keyup', e => {
      this.game.keys[e.keyCode] = false;
    });
  }

  keyPressCheck() {
    if (this.game.keys[39]) {
      this.moveRight();
    } else if (this.game.keys[37]) {
      this.moveLeft();
    } else if (this.game.keys[38]) {
      this.moveUp();
    } else if (this.game.keys[40]) {
      this.moveDown();
    } else if (this.game.keys[18]) {
      this.plant();
    } else if (this.game.keys[19]) {
      this.detonate();
    }
  }

  moveDown() {
    this._sprite = movingDownSprite;
    if (this.y > this.speed) {
      this.y += this.speed;
    }
  }

  moveUp() {
    this._sprite = movingUpSprite;
    if (this.y > this.speed) {
      this.y -= this.speed;
    }
  }

  moveRight() {
    this._sprite = movingRightSprite;
    if (this.x > this.speed) {
      this.x += this.speed;
    }
  }

  moveLeft() {
    this._sprite = movingLeftSprite;
    if (this.x > this.speed) {
      this.x -= this.speed;
    }
  }

  draw() {
    this._sprite.draw(this._ctx, this.x, this.y);
  }

  update(frame) {
    this._frame = this.speed * frame;
  }

  plant() {
    // TODO implement
  }

  detonate() {
    // TODO implement
  }

}
