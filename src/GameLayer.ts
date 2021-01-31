import cc from 'cocos2d';
import Player from './Player';
import { getResourceName } from './resource';
import BackgroundManager from './BackgroundManager';
import EnemyFactory from './EnemyFactory';
import Background from './Background';
import Bullet from './Bullet';
import Enemy from './Enemy';
import GameOverScene from './GameOverScene';
import { WIN_HEIGHT, WIN_WIDTH } from './constants';

const MAX_CONTAINT_WIDTH = 60;
const MAX_CONTAINT_HEIGHT = 60;
const MOUSE_LEFT = 37;
const MOUSE_UP = 38;
const MOUSE_RIGHT = 39;
const MOUSE_DOWN = 40;

class GameLayer extends cc.Layer {
  private keys = {} as Record<string, boolean>;

  private enemys = [] as Enemy[];

  private player = new Player();

  private bullet?: Bullet;

  private background?: Background;

  private backgroundRe?: Background;

  private backgroundHeight = 0;

  private isBackgroundReload = false;

  constructor() {
    super();
    this.addChild(this.player, 1);

    this.scheduleUpdate();
    this.initBackground();

    this.schedule(this.createEnemy, 1);

    cc.audioEngine.playMusic(getResourceName('VID_GAMEMUSIC'), true);

    cc.eventManager.addListener(
      {
        event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        onTouchesMoved: this.onTouchesMoved.bind(this),
      },
      this.player
    );
  }

  initBackground() {
    this.background = BackgroundManager.getInstance().getBackground();
    this.addChild(this.background);
    this.backgroundHeight = this.background?.getContentSize().height;

    this.moveBackground();
    this.schedule(this.moveBackground, 1);
  }

  moveBackground() {
    const winSize = cc.director.getWinSize();
    this.background?.runAction(cc.MoveBy.create(1, cc.p(0, -16)));
    this.backgroundHeight -= 16;
    if (this.backgroundHeight <= winSize.height) {
      if (!this.isBackgroundReload) {
        this.backgroundRe = BackgroundManager.getInstance().getBackground();
        this.addChild(this.backgroundRe);
        this.backgroundRe?.setPosition(0, winSize.height);
        this.isBackgroundReload = true;
      }
      this.backgroundRe?.runAction(cc.MoveBy.create(1, cc.p(0, -16)));
    }
    if (this.backgroundHeight <= 0) {
      this.backgroundHeight = this.background?.getContentSize().height;
      this.background?.destroy();
      this.background = this.backgroundRe;
      this.backgroundRe = undefined;
      this.isBackgroundReload = false;
    }
  }

  onTouchesMoved(touches: any) {
    this.processEvent(touches[0]);
  }

  onMouseDragged(event: any) {
    this.processEvent(event);
  }

  processEvent(event: any) {
    if (this.player?.isActive()) {
      const delta = event.getDelta();
      let curPos = this.player?.getPosition();
      curPos = cc.pAdd(curPos, delta);
      curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(WIN_WIDTH, WIN_HEIGHT));
      this.player.setPosition(curPos);
    }
  }

  onKeyDown(e: any) {
    this.keys[e] = true;
  }

  onKeyUp(e: any) {
    this.keys[e] = false;
  }

  isLeft() {
    return this.keys[MOUSE_LEFT];
  }

  isUp() {
    return this.keys[MOUSE_UP];
  }

  isRight() {
    return this.keys[MOUSE_RIGHT];
  }

  isDown() {
    return this.keys[MOUSE_DOWN];
  }

  update(dt: number) {
    if (this.player && this.player.isActive()) {
      // this._player.update(dt);
      const pos = this.player.getPosition();
      if (this.isLeft()) {
        pos.x -= dt * this.speed;
      }
      if (this.isUp()) {
        pos.y += dt * this.speed;
      }
      if (this.isRight()) {
        pos.x += dt * this.speed;
      }
      if (this.isDown()) {
        pos.y -= dt * this.speed;
      }
      pos.x = Math.max(0, pos.x);
      pos.x = Math.min(WIN_WIDTH, pos.x);
      pos.y = Math.max(0, pos.y);
      pos.y = Math.min(WIN_HEIGHT, pos.y);
      this.player.setPosition(pos);

      if (this.player.isOver()) {
        this.player.destroy();

        this.scheduleOnce(() => {
          const gameOver = new GameOverScene();
          cc.director.runScene(gameOver);
        }, 0.6);
      }

      if (!this.bullet || !this.bullet.isActive()) {
        this.bullet = this.player.shoot();
        this.addChild(this.bullet, 3);
      }

      this.bullet?.update(dt);
      this.updateEnemys(dt);
      this.checkIsCollide();
    }
  }

  updateEnemys(dt: number) {
    let i;
    let l;
    let em;
    for (i = 0, l = this.enemys.length; i < l; i += 1) {
      em = this.enemys[i];
      if (em && em.isActive()) {
        em.update(dt);
      }
    }
  }

  createEnemy() {
    const em = EnemyFactory.getInstance().create();
    const eid = this.enemys.length;
    this.addChild(em, 3);
    if (em.eID === undefined) {
      this.enemys.push(em);
      em.eID = eid;
    }
  }

  checkIsCollide() {
    let i;
    let l;
    let em;
    if (this.bullet && this.bullet.isActive()) {
      for (i = 0, l = this.enemys.length; i < l; i += 1) {
        em = this.enemys[i];
        if (em && em.isActive()) {
          if (this.collide(this.bullet, em)) {
            em.hurt();
            this.bullet.hurt();
          }
        }
      }
    }
    if (this.player && this.player.isActive()) {
      for (i = 0, l = this.enemys.length; i < l; i += 1) {
        em = this.enemys[i];
        if (em && em.isActive()) {
          if (this.collide(this.player, em)) {
            em.hurt();
            this.player.hurt();
          }
        }
      }
    }
  }

  collide(a: any, b: any) {
    const pos1 = a.getPosition();
    const pos2 = b.getPosition();
    if (
      Math.abs(pos1.x - pos2.x) > MAX_CONTAINT_WIDTH ||
      Math.abs(pos1.y - pos2.y) > MAX_CONTAINT_HEIGHT
    ) {
      return false;
    }

    const aRect = a.collideRect(pos1);
    const bRect = b.collideRect(pos2);
    return cc.rectIntersectsRect(aRect, bRect);
  }
}

export default GameLayer;
