require('../assets/sass/main.sass');

import Game from './Game';

let canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 480;

let game = new Game(canvas);

let mainloop = () => {
  game.update();
  game.draw();
  requestAnimationFrame(mainloop);
};

game.load().then(() =>
  requestAnimationFrame(mainloop)
);
