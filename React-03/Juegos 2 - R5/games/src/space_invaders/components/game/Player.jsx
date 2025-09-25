import player from "../../assets/images/player.png";

export default class Player {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  constructor(canvas, velocity, bulletController, level = 1, scale = 1) {
    this.canvas = canvas;
    this.velocity = velocity + level;
    this.bulletController = bulletController;
    this.scale = scale;

    this.width = 50;
    this.height = 48;

    const baseWidth = this.canvas.width / this.scale;
    const baseHeight = this.canvas.height / this.scale;

    this.x = baseWidth / 2 - this.width / 2;
    this.y = baseHeight - this.height - 10;

    this.image = new Image();
    this.image.src = player;

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx, scale = this.scale) {
    if (this.shootPressed) {
      this.shoot();
    }

    this.move();
    this.collideWithWalls();

    ctx.drawImage(
      this.image,
      this.x * scale,
      this.y * scale,
      this.width * scale,
      this.height * scale
    );
  }

  shoot() {
    if (this.bulletController.bullets.length === 0) {
      const bulletBaseWidth = 5; 
      const bulletX = this.x + this.width / 2 - bulletBaseWidth / 2; 
      const bulletY = this.y - 2;
      const bulletVelocity = 8;
      const cooldown = 10;

      this.bulletController.shoot(bulletX, bulletY, bulletVelocity, cooldown);
    }
  }

  collideWithWalls() {
    if (this.x < 0) this.x = 0;
    if (this.x > this.canvas.width / this.scale - this.width) {
      this.x = this.canvas.width / this.scale - this.width;
    }
  }

  move() {
    if (this.rightPressed) this.x += this.velocity;
    if (this.leftPressed) this.x -= this.velocity;
  }

  keydown = (event) => {
    if (event.code === "ArrowRight") this.rightPressed = true;
    if (event.code === "ArrowLeft") this.leftPressed = true;
    if (event.code === "KeyZ") this.shootPressed = true;
  };

  keyup = (event) => {
    if (event.code === "ArrowRight") this.rightPressed = false;
    if (event.code === "ArrowLeft") this.leftPressed = false;
    if (event.code === "KeyZ") this.shootPressed = false;
  };
}
