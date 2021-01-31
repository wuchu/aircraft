import PIC_GAMEARTSHD from './res/gameArts-hd.png';
import VID_BULLET from './res/bullet.mp3';
import VID_GAMEMUSIC from './res/game_music.mp3';
import VID_GAMEOVER from './res/game_over.mp3';
import VID_ENEMYMINOUT from './res/enemy1_down.mp3';
import VID_ENEMYMIDOUT from './res/enemy3_down.mp3';
import VID_ENEMYMAXOUT from './res/enemy2_out.mp3';
import CFG_GAMEARTSHD from './res/gameArts-hd.plist';

export const resources = {
  PIC_GAMEARTSHD,
  VID_BULLET,
  VID_GAMEMUSIC,
  VID_GAMEOVER,
  VID_ENEMYMINOUT,
  VID_ENEMYMIDOUT,
  VID_ENEMYMAXOUT,
  CFG_GAMEARTSHD,
};

export const getResource = (key: keyof typeof resources) => {
  const name = resources[key];
  if (!name) {
    throw new TypeError('not found resource name!');
  }
  return name;
};

export const getResourceName = (key: keyof typeof resources) => {
  const name = resources[key].split('/').pop();
  if (!name) {
    throw new TypeError('not found resource name!');
  }
  return name;
};
