import cc from 'cocos2d';
import { WIN_HEIGHT, WIN_WIDTH } from './constants';

type Point = InstanceType<typeof cc.Point>;

class Enemy extends cc.Sprite {
  eID?: number;

  protected HP = 0;

  protected speed = 0;

  protected active = true;

  constructor(name: string) {
    super();

    this.initWithSpriteFrameName(name);
    this.restore();
  }

  isActive() {
    return this.active;
  }

  restore() {
    this.active = true;
    this.setVisible(true);
    this.speed = 200 * Math.random();
    this.speed = this.speed < 100 ? 100 : this.speed;
    this.setPosition(Math.random() * WIN_WIDTH, WIN_HEIGHT);
  }

  update(dt: number) {
    if (this.active) {
      const pos = this.getPosition();
      pos.y -= this.speed * dt;
      this.setPosition(pos);

      if (pos.y < 0) {
        this.disappear();
      }

      if (this.HP <= 0) {
        this.destroy();
      }
    }
  }

  destroy() {
    this.active = false;
    this.setVisible(false);
  }

  disappear() {
    this.active = false;
    this.setVisible(false);
  }

  hurt() {
    this.HP -= 1;
  }

  collideRect(p: Point) {
    const size = this.getContentSize();
    return cc.rect(
      p.x - size.width / 2,
      p.y - size.height / 4,
      size.width,
      size.height / 2 + 20
    );
  }
}

export default Enemy;
