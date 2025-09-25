import enemy1a from "../../assets/images/enemy1a.png";
import enemy1b from "../../assets/images/enemy1b.png";
import enemy2a from "../../assets/images/enemy2a.png";
import enemy2b from "../../assets/images/enemy2b.png";
import enemy3a from "../../assets/images/enemy3a.png";
import enemy3b from "../../assets/images/enemy3b.png";
import enemyExplosion from "../../assets/images/enemy_explosion.png";

export default class Enemy {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 32;
    this.type = type;
    this.points = type === 1 ? 30 : type === 2 ? 60 : 100;

    const spritesMap = {
      1: [enemy1a, enemy1b],
      2: [enemy2a, enemy2b],
      3: [enemy3a, enemy3b],
    };

    this.sprites = spritesMap[type].map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    this.explosionImage = new Image();
    this.explosionImage.src = enemyExplosion;

    this.currentFrame = 0;
    this.frameTimer = 0;
    this.frameInterval = 30;
    this.isDying = false;
    this.deathTimer = 15;
  }

  draw(ctx, scale = 1) {
    if (this.isDying) {
      ctx.drawImage(
        this.explosionImage,
        this.x * scale,
        this.y * scale,
        this.width * scale,
        this.height * scale
      );
      return;
    }

    ctx.drawImage(
      this.sprites[this.currentFrame],
      this.x * scale,
      this.y * scale,
      this.width * scale,
      this.height * scale
    );
  }

  updateAnimation() {
    if (this.isDying) {
      this.deathTimer--;
      return;
    }

    this.frameTimer++;
    if (this.frameTimer >= this.frameInterval) {
      this.frameTimer = 0;
      this.currentFrame = (this.currentFrame + 1) % this.sprites.length;
    }
  }

  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
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
