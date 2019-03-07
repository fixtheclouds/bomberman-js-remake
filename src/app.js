require('../assets/sass/main.sass');

import Game from './Game';

const FRAME_RATE = 60.0;

const canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 480;

const game = new Game(canvas);
let lastTime;

const mainLoop = () => {
  const now = Date.now();
  const frame = (now - lastTime) / FRAME_RATE;
  game.update(frame);
  game.draw();
  requestAnimationFrame(mainLoop);
};

game.load().then(() => {
  lastTime = Date.now();
  game.init();
  requestAnimationFrame(mainLoop);
});
