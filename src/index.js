import Phaser from 'phaser';
import MyGame from './scenes/MainScene';
import StandCard from './scenes/StandCard';
import StandMenu from './scenes/StandMenu';
import { InfoStand } from './scenes/InfoStand';
import { EndGame } from './scenes/EndGame';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1504,
  height: 896,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  fps: {
    target: 10,
    forceSetTimeOut: true,
  },
  scene: [MyGame, StandMenu, StandCard, InfoStand, EndGame],
};

const game = new Phaser.Game(config);
