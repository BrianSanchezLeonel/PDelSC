export default class Bullet {
  constructor(canvas, x, y, velocity, bulletColor) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.bulletColor = bulletColor;
    this.width = 5;
    this.height = 20;
  }

  draw(ctx, scale = 1) {
    this.y -= this.velocity;
    ctx.fillStyle = this.bulletColor;
    ctx.fillRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
  }

  collideWith(sprite) {
    return (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    );
  }
}