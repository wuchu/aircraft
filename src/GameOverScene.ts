import cc from 'cocos2d';
import { WIN_HEIGHT, WIN_WIDTH } from './constants';

class GameOverScene extends cc.Scene {
  constructor() {
    super();
    const label = cc.LabelTTF.create('Game Over!', 'Verdana', 48);
    const layer = cc.LayerColor.create();
    layer.addChild(label);
    layer.setColor({ r: 0, g: 0, b: 0 });
    label.setPosition(WIN_WIDTH / 2, WIN_HEIGHT / 2);
    this.addChild(layer);
  }
}

export default GameOverScene;
