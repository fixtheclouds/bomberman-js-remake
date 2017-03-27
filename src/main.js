require('../assets/sass/main.sass');

import Game from './Game';

let canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 480;

let game = new Game(canvas);
let lastTime;

let mainloop = () => {
  let now = Date.now();
  let frame = (now - lastTime) / 60.0;
  game.update(frame);
  game.draw();
  requestAnimationFrame(mainloop);
};

game.load().then(() => {
  lastTime = Date.now();
  game.init();
  requestAnimationFrame(mainloop);
});
