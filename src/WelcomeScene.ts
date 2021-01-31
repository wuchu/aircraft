import cc from 'cocos2d';
import { WIN_HEIGHT, WIN_WIDTH } from './constants';
import GameScene from './GameScene';
import Loading from './Loading';
import { getResource } from './resource';

interface Listener {
  event: string;
  [key: string]: any;
}

class WelcomeScene extends cc.Scene {
  private listener?: Listener;

  constructor() {
    super();

    cc.spriteFrameCache.addSpriteFrames(
      getResource('CFG_GAMEARTSHD'),
      getResource('PIC_GAMEARTSHD')
    );

    this.listener = {
      event: cc.EventListener.TOUCH_ALL_AT_ONCE,
      onTouchesEnded: this.onTouchesEnded.bind(this),
    };

    const label = cc.LabelTTF.create('Aircraft', 'Verdana', 48);
    const layer = cc.LayerColor.create();
    layer.addChild(label);
    layer.setColor({ r: 0, g: 0, b: 0 });
    label.setPosition(WIN_WIDTH / 2, WIN_HEIGHT / 2);

    const loading = new Loading();
    layer.addChild(loading);
    loading.setPosition(WIN_WIDTH / 2, WIN_HEIGHT / 2 - 100);
    loading.play();

    this.addChild(layer);
  }

  onEnter() {
    super.onEnter();
    if (this.listener) {
      cc.eventManager.addListener(this.listener, this);
    }
  }

  onTouchesEnded() {
    const game = new GameScene();
    cc.director.runScene(cc.TransitionSlideInB.create(1.2, game));
  }

  onExit() {
    super.onEnter();
    cc.eventManager.removeListener(this.listener);
  }
}

export default WelcomeScene;
