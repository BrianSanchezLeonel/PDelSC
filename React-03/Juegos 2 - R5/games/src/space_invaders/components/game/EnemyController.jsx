import Enemy from "./Enemy";
import MovingDirection from "./MovingDirection";
import enemyDeath from "../../assets/sounds/enemy-death.wav";

export default class EnemyController {
  enemyRows = [];
  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;

  constructor(canvas, enemyBulletController, playerBulletController, level = 1, scale = 1) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;
    this.level = level;
    this.scale = scale;

    this.defaultXVelocity = 1 + level * 0.3;
    this.defaultYVelocity = 1 + level * 0.1;
    if (level > 6) {
      const extra = (level - 6) * 0.2;
      this.defaultXVelocity += extra;
      this.defaultYVelocity += extra / 2;
    }

    this.enemyDeathSound = new Audio(enemyDeath);
    this.enemyDeathSound.volume = 0.2;

    this.createEnemies();
  }

  draw(ctx, scale = this.scale) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(ctx, scale);
    if (this.moveDownTimer <= 0) this.moveDownTimer = this.moveDownTimerDefault;
    this.fireBullet();
  }

  collisionDetection() {
    this.enemyRows.forEach(row =>
      row.forEach(enemy => {
        if (this.playerBulletController.collideWith(enemy)) {
          enemy.isDying = true;
          const sound = this.enemyDeathSound.cloneNode();
          sound.volume = this.enemyDeathSound.volume;
          sound.play().catch(() => {});
        }
      })
    );
    this.enemyRows = this.enemyRows
      .map(row => row.filter(enemy => !(enemy.isDying && enemy.deathTimer <= 0)))
      .filter(row => row.length > 0);
  }

  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer > 0) return;
    this.fireBulletTimer = this.fireBulletTimerDefault;
    const allEnemies = this.enemyRows.flat();
    if (!allEnemies.length) return;

    const enemy = allEnemies[Math.floor(Math.random() * allEnemies.length)];
    const bx = enemy.x + enemy.width / 2 - 2.5;
    const by = enemy.y + enemy.height + 2;
    this.enemyBulletController.shoot(bx, by, -(3 + this.level * 0.5));
  }

  decrementMoveDownTimer() {
    if ([MovingDirection.downLeft, MovingDirection.downRight].includes(this.currentDirection)) this.moveDownTimer--;
  }

  updateVelocityAndDirection() {
    for (const row of this.enemyRows) {
      if (this.currentDirection === MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity; this.yVelocity = 0;
        if (row[row.length - 1].x + row[row.length - 1].width >= this.canvas.width / this.scale) {
          this.currentDirection = MovingDirection.downLeft; break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity; this.yVelocity = 0;
        if (row[0].x <= 0) { this.currentDirection = MovingDirection.downRight; break; }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) break;
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) break;
      }
    }
  }

  moveDown(newDir) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDir;
      return true;
    }
    return false;
  }

  drawEnemies(ctx, scale) {
    this.enemyRows.flat().forEach(enemy => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.updateAnimation();
      enemy.draw(ctx, scale);
    });
  }

  createEnemies() {
    const maxRows = 6;
    const numRows = Math.min(3 + this.level - 1, maxRows);
    this.enemyRows = Array.from({ length: numRows }, (_, rowIndex) => {
      return Array.from({ length: 10 }, (_, colIndex) => {
        const type = rowIndex < 1 ? 3 : rowIndex < 3 ? 2 : 1;
        return new Enemy(colIndex * 50, rowIndex * 35, type);
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some(enemy => enemy.collideWith(sprite));
  }
}
