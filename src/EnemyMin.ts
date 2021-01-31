import cc from 'cocos2d';
import Enemy from './Enemy';
import { getResourceName } from './resource';

class EnemyMin extends Enemy {
  constructor() {
    super('enemy1_fly_1.png');
  }

  restore() {
    super.restore();
    this.HP = 1;
  }

  destroy() {
    const eff = cc.Sprite.create();
    const layer = this.getParent();
    layer.addChild(eff);
    eff.setPosition(this.getPosition());
    const frame0 = cc.spriteFrameCache.getSpriteFrame('enemy1_blowup_1.png');
    const frame1 = cc.spriteFrameCache.getSpriteFrame('enemy1_blowup_2.png');
    const frame2 = cc.spriteFrameCache.getSpriteFrame('enemy1_blowup_3.png');
    const frame3 = cc.spriteFrameCache.getSpriteFrame('enemy1_blowup_4.png');

    const animFrames = [];
    animFrames.push(frame0);
    animFrames.push(frame1);
    animFrames.push(frame2);
    animFrames.push(frame3);

    const animation = cc.Animation.create(animFrames, 0.1);
    const animate = cc.Animate.create(animation);
    eff.runAction(animate);
    eff.scheduleOnce(() => {
      layer.removeChild(eff);
    }, 0.5);

    cc.audioEngine.playEffect(getResourceName('VID_ENEMYMINOUT'));

    super.destroy();
  }
}

export default EnemyMin;
