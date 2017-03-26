require('../assets/sass/main.sass');

import Game from './Game';

let canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 480;

let game = new Game(canvas);
let lastTime = Date.now();

let mainloop = () => {
  let now = Date.now();
  let frame = (now - lastTime) / 1000.0;
  game.update(frame);
  game.draw();
  requestAnimationFrame(mainloop);
};

game.load().then(() =>
  requestAnimationFrame(mainloop)
);
