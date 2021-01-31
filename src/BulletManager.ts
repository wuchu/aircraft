import cc from 'cocos2d';
import Bullet from './Bullet';

class BulletManager extends cc.Class {
  private pool = new cc.SimplePool();

  private static instance?: BulletManager;

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance!;
  }

  getButtle() {
    let bullet: Bullet | null = this.pool.find(
      (_: number, obj?: Bullet) => !!obj && !obj.isActive()
    );

    if (!bullet) {
      bullet = new Bullet();
      this.pool.put(bullet);
    } else {
      bullet.removeFromParent();
      bullet.restore();
      bullet.setVisible(true);
    }

    return bullet;
  }
}

export default BulletManager;
