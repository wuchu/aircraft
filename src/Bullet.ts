import cc from 'cocos2d';
import { WIN_HEIGHT } from './constants';

type Point = InstanceType<typeof cc.Point>;

class Bullet extends cc.Sprite {
  private HP = 1;

  private power = 1;

  private speed_x = 0;

  private speed_y = 2000;

  private active = true;

  constructor() {
    super();

    this.initWithSpriteFrameName('bullet1.png');
  }

  isActive() {
    return this.active;
  }

  update(dt: number) {
    if (this.active) {
      const pos = this.getPosition();
      pos.x += this.speed_x * dt;
      pos.y += this.speed_y * dt;
      this.setPosition(pos);
      if (this.HP <= 0 || pos.y >= WIN_HEIGHT || pos.y <= 0) {
        this.destroy();
      }
    }
  }

  destroy() {
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
      p.y - size.height / 2,
      size.width,
      size.height
    );
  }

  restore() {
    this.active = true;
    this.HP = 1;
  }
}

export default Bullet;
