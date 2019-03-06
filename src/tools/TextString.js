export default class TextString {
  constructor(text, x, y, color, shadowColor, size) {
    this.text = text.toUpperCase();
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.shadowColor = shadowColor || null;
  }

  draw(ctx) {
    let size = this.size || '16px';
    ctx.font = `${size} PrStart`;
    if (this.shadowColor) {
      ctx.fillStyle = this.shadowColor;
      ctx.fillText(this.text, this.x * 2 + 2, this.y * 2 + 2);
    }
    ctx.fillStyle = this.color || '#ffffff';
    ctx.fillText(this.text, this.x * 2, this.y * 2);
  }
}
