import Phaser from 'phaser';
import menuPanel from '../assets/red_panel.png';
import background from '../assets/newMap.png';

export class EndGame extends Phaser.Scene {
  constructor() {
    super({ key: 'EndGame' });
  }
  init(data) {
    console.log(data);
  }

  preload() {
    this.load.image('background', background);
    this.load.image('menuPanel', menuPanel);
  }

  create() {
    this.add.image(752, 448, 'background').setDepth(-1);
    this.popup = this.add
      .text(
        400,
        200,
        'Thank you for playing Carnival Conduct \nThis was created by ["hip","hip"]\nstudents of Northcoders\nto start again please refresh the page',
        {
          backgroundColor: '#D65C21',
          fontSize: 35,
          fontFamily: 'Rubik Gemstones',
        }
      )
      .setDepth(40);
  }
}
