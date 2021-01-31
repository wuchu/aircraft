import cc from 'cocos2d';
import EnemyMin from './EnemyMin';
import EnemyMid from './EnemyMid';
import EnemyMax from './EnemyMax';
import Enemy from './Enemy';

interface Constructor<T = any, K = unknown> {
  new (...args: K[]): T;
}

class EnemyFactory extends cc.Class {
  private pool = new cc.SimplePool();

  private static instance?: EnemyFactory;

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance!;
  }

  create() {
    let Ctor: Constructor<Enemy>;
    const rs = Math.random() * 100;
    if (rs < 80) {
      Ctor = EnemyMin;
    } else if (rs < 95) {
      Ctor = EnemyMid;
    } else {
      Ctor = EnemyMax;
    }
    let enemy: Enemy | null = this.pool.find(
      (_: number, obj?: Enemy) =>
        !!obj && obj instanceof Ctor && !obj.isActive()
    );

    if (!enemy) {
      enemy = new Ctor();
      this.pool.put(enemy);
    } else {
      enemy.removeFromParent();
      enemy.restore();
    }

    return enemy;
  }
}

export default EnemyFactory;
