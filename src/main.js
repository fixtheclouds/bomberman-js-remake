require('../assets/sass/main.sass');

import Game from './Game';

let canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 300;

let game = new Game(canvas);

let mainloop = () => {
  game.update();
  game.draw();
  requestAnimationFrame(mainloop);
};

requestAnimationFrame(mainloop);
