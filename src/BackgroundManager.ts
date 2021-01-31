import cc from 'cocos2d';
import Background from './Background';

class BackgroundManager extends cc.Class {
  private pool = new cc.SimplePool();

  private static instance?: BackgroundManager;

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance!;
  }

  getBackground() {
    let bg: Background | null = this.pool.find(
      (_: number, obj?: Background) => !!obj && !obj.isActive()
    );
    if (!bg) {
      bg = new Background();
      this.pool.put(bg);
    } else {
      bg.removeFromParent();
      bg.setVisible(true);
      bg.restore();
    }

    return bg;
  }
}

export default BackgroundManager;
