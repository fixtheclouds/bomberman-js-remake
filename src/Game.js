export default class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.context);
    }

    update() {
        // TODO implement        
    }

}
