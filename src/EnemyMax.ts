import cc from 'cocos2d';
import Enemy from './Enemy';
import { getResourceName } from './resource';

class EnemyMax extends Enemy {
  constructor() {
    super('enemy2_fly_1.png');

    const frame0 = cc.spriteFrameCache.getSpriteFrame('enemy2_fly_1.png');
    const frame1 = cc.spriteFrameCache.getSpriteFrame('enemy2_fly_2.png');

    const animFrames = [];
    animFrames.push(frame0);
    animFrames.push(frame1);

    const animation = cc.Animation.create(animFrames, 0.1);
    const animate = cc.Animate.create(animation);
    this.runAction(cc.RepeatForever.create(animate));
  }

  restore() {
    super.restore();
    this.HP = 20;
  }

  destroy() {
    const eff = cc.Sprite.create();
    const layer = this.getParent();
    layer.addChild(eff);
    eff.setPosition(this.getPosition());
    const frame0 = cc.spriteFrameCache.getSpriteFrame('enemy2_blowup_1.png');
    const frame1 = cc.spriteFrameCache.getSpriteFrame('enemy2_blowup_2.png');
    const frame2 = cc.spriteFrameCache.getSpriteFrame('enemy2_blowup_3.png');
    const frame3 = cc.spriteFrameCache.getSpriteFrame('enemy2_blowup_4.png');
    const frame4 = cc.spriteFrameCache.getSpriteFrame('enemy2_blowup_5.png');
    const frame5 = cc.spriteFrameCache.getSpriteFrame('enemy2_blowup_6.png');
    const frame6 = cc.spriteFrameCache.getSpriteFrame('enemy2_blowup_7.png');

    const animFrames = [];
    animFrames.push(frame0);
    animFrames.push(frame1);
    animFrames.push(frame2);
    animFrames.push(frame3);
    animFrames.push(frame4);
    animFrames.push(frame5);
    animFrames.push(frame6);

    const animation = cc.Animation.create(animFrames, 0.1);
    const animate = cc.Animate.create(animation);
    eff.runAction(animate);
    eff.scheduleOnce(() => {
      layer.removeChild(eff);
    }, 0.8);

    cc.audioEngine.playEffect(getResourceName('VID_ENEMYMAXOUT'));

    super.destroy();
  }
}

export default EnemyMax;
