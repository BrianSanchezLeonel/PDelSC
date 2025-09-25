import Bullet from "./Bullet";
import shoot from "../../assets/sounds/shoot.wav";

export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;

  constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled, scale = 1) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;
    this.scale = scale;

    this.shootSound = new Audio(shoot);
    this.shootSound.volume = 0.1;
  }

  setScale(scale) {
    this.scale = scale || 1;
  }

  draw(ctx) {
    const canvasHeightBase = this.canvas.height / this.scale;
    const canvasWidthBase = this.canvas.width / this.scale;
    const marginBase = 10;

    this.bullets = this.bullets.filter(bullet =>
      bullet.y + bullet.height >= -marginBase &&
      bullet.y <= canvasHeightBase + marginBase
    );

    this.bullets.forEach(bullet => bullet.draw(ctx, this.scale));

    if (this.timeTillNextBulletAllowed > 0) this.timeTillNextBulletAllowed--;
  }

  collideWith(sprite) {
    for (let i = 0; i < this.bullets.length; i++) {
      const b = this.bullets[i];
      if (b.x < sprite.x + sprite.width &&
          b.x + b.width > sprite.x &&
          b.y < sprite.y + sprite.height &&
          b.y + b.height > sprite.y) {
        this.bullets.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  shoot(x, y, velocity, cooldown = 0) {
    if (this.timeTillNextBulletAllowed > 0 || this.bullets.length >= this.maxBulletsAtATime) return;

    const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
    const canvasWidthBase = this.canvas.width / this.scale;
    const canvasHeightBase = this.canvas.height / this.scale;

    bullet.x = Math.max(0, Math.min(bullet.x, canvasWidthBase - bullet.width));
    bullet.y = Math.max(0, Math.min(bullet.y, canvasHeightBase - bullet.height));

    this.bullets.push(bullet);

    if (this.soundEnabled) {
      this.shootSound.currentTime = 0;
      this.shootSound.play().catch(() => {});
    }

    this.timeTillNextBulletAllowed = cooldown;
  }
}
