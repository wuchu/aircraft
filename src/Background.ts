import cc from 'cocos2d';

class Background extends cc.Sprite {
  private action = true;

  constructor() {
    super();
    this.initWithSpriteFrameName('background_2.png');
    this.setAnchorPoint(cc.p(0, 0));
  }

  isActive() {
    return this.action;
  }

  destroy() {
    this.action = false;
    this.setVisible(false);
  }

  restore() {
    this.action = true;
  }
}

export default Background;
