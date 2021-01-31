import cc from 'cocos2d';

class Loading extends cc.Sprite {
  private animate?: any;

  constructor() {
    super();

    const names = [
      'loading0.png',
      'loading1.png',
      'loading2.png',
      'loading3.png',
    ] as const;
    const frames = names.map((v) => cc.spriteFrameCache.getSpriteFrame(v));

    const animation = cc.Animation.create(frames, 0.36);
    this.animate = cc.Animate.create(animation);
  }

  play() {
    if (this.animate) {
      this.runAction(cc.RepeatForever.create(this.animate));
    }
  }
}

export default Loading;
