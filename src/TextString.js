export default class TextString {

  constructor(text, x, y, size, color) {
    this.text = text.toUpperCase();
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    let size = this.size || '24px';
    ctx.fillStyle = this.color || '#ffffff';
    ctx.font = `${size} PrStart`;
    ctx.fillText(this.text, this.x*2, this.y*2);
  }

}
