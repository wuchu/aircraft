import cc from 'cocos2d';
import GameLayer from './GameLayer';

class GameScene extends cc.Scene {
  constructor() {
    super();
    this.addChild(new GameLayer());
  }
}

export default GameScene;
