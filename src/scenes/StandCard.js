import Phaser, { Scene } from 'phaser';
import Stands from '../Stands';
import menuPanel from '../assets/red_panel.png';
import Button from '../../button';

class StandCard extends Phaser.Scene {
  constructor() {
    super({ key: 'StandCard' });
  }
  init(data) {
    this.player = data.player;
    this.stand = data.stand;
  }

  preload() {
    this.load.image('menuPanel', menuPanel);
  }
  create() {
    const exitButton = new Button(
      this,
      300,
      57,
      '#633fab',
      'Exit Menu',
      ' MainScene'
    );
    const backBtn = this.add
      .text(480, 250, 'Back', {
        backgroundColor: '#AB3FAB',
        fontSize: 35,
        fontFamily: 'Rubik Gemstones',
      })
      .setDepth(4)
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => backBtn.setStyle({ fill: '#d59fb0' }))
      .on('pointerout', () => backBtn.setStyle({ fill: '#FFF' }))
      .on(
        'pointerdown',
        function () {
          this.scene.wake('StandMenu');
          this.scene.stop();
        },
        this
      );
    this.menu = this.add
      .image(700, 500, 'menu-panel')
      .setDepth(2)
      .setScale(7)
      .setAlpha(0.8);

    let yPosition = 400;

    for (let key in this.stand) {
      if (key !== 'category' && key !== 'img') {
        this.add
          .text(400, yPosition -30, `${key}:  ${this.stand[key]}`, {
            backgroundColor: "#AB3F63",

            fontSize: 30,
            fontFamily: 'Rubik Gemstones',
          })
          .setDepth(4)
          .setPadding(10);
        yPosition += 60;
      }
    }

    const buyBtn = this.add
      .text(800, 250, 'Buy', {
        backgroundColor: '#3F63AB',
        fontSize: 35,
        fontFamily: 'Rubik Gemstones',
      })
      .setDepth(4)
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => buyBtn.setStyle({ fill: '#8BA1CC' }))
      .on('pointerout', () => buyBtn.setStyle({ fill: '#FFF' }))
      .on(
        'pointerdown',
        function () {
          if (this.player.playerCoins.totalCoins - this.stand.price >= 0) {
            this.player.playerCoins.totalCoins -= this.stand.price
            this.scene.resume('MainScene', { purchasedName: this.stand.name, player: this.player });
            this.scene.stop('StandMenu');
            this.scene.stop();
          }
        },
        this
      );
  }
}

export default StandCard;
