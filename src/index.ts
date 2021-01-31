import cc from 'cocos2d';
import WelcomeScene from './WelcomeScene';
import { resources } from './resource';
import { WIN_HEIGHT, WIN_WIDTH } from './constants';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas');
if (canvas) {
  canvas.width = WIN_WIDTH;
  canvas.height = WIN_HEIGHT;
}

cc.game.onStart = () => {
  // load resources
  cc.LoaderScene.preload(
    Object.values(resources),
    () => {
      cc.director.runScene(new WelcomeScene());
    },
    this
  );
};

cc.game.run({
  debugMode: 1,
  frameRate: 60,
  id: 'game-canvas',
  renderMode: 2,
  jsList: [],
});
