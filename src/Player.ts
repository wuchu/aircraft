import cc from 'cocos2d';
import BulletManager from './BulletManager';
import { WIN_WIDTH } from './constants';
import { getResourceName } from './resource';

type Point = InstanceType<typeof cc.Point>;

class Player extends cc.Sprite {
  private HP = 1;

  private active = true;

  private speed = 400;

  constructor() {
    super();
    this.initWithSpriteFrameName('hero_fly_1.png');
    this.setPosition(cc.p(WIN_WIDTH / 2, 64));

    const frame0 = cc.spriteFrameCache.getSpriteFrame('hero_fly_1.png');
    const frame1 = cc.spriteFrameCache.getSpriteFrame('hero_fly_2.png');

    const animFrames = [];
    animFrames.push(frame0);
    animFrames.push(frame1);

    const animation = cc.Animation.create(animFrames, 0.1);
    const animate = cc.Animate.create(animation);
    this.runAction(cc.RepeatForever.create(animate));
  }

  shoot() {
    const p = this.getPosition();
    const cs = this.getContentSize();
    const b = BulletManager.getInstance().getButtle();
    b.setPosition(p.x, p.y + cs.height / 2);

    cc.audioEngine.playEffect(getResourceName('VID_BULLET'));
    return b;
  }

  destroy() {
    this.active = false;
    this.setVisible(false);
    const layer = this.getParent();

    const eff = cc.Sprite.create();
    eff.setPosition(this.getPosition());
    const frame0 = cc.spriteFrameCache.getSpriteFrame('hero_blowup_1.png');
    const frame1 = cc.spriteFrameCache.getSpriteFrame('hero_blowup_2.png');
    const frame2 = cc.spriteFrameCache.getSpriteFrame('hero_blowup_3.png');
    const frame3 = cc.spriteFrameCache.getSpriteFrame('hero_blowup_4.png');

    const animFrames = [];
    animFrames.push(frame0);
    animFrames.push(frame1);
    animFrames.push(frame2);
    animFrames.push(frame3);

    const animation = cc.Animation.create(animFrames, 0.1);
    const animate = cc.Animate.create(animation);

    layer.addChild(eff);
    eff.runAction(animate);
    eff.scheduleOnce(() => {
      layer.removeChild(eff);
    }, 0.5);

    cc.audioEngine.playMusic(getResourceName('VID_GAMEOVER'), false);
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

  isOver() {
    return this.HP <= 0;
  }

  isActive() {
    return this.active;
  }

  hurt() {
    this.HP -= 1;
  }
}

export default Player;
