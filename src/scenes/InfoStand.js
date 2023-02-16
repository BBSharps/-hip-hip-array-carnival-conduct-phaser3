import Phaser from 'phaser';
import menuPanel from '../assets/red_panel.png';
import Button from '../../button';

export class InfoStand extends Phaser.Scene {
  constructor() {
    super({ key: 'InfoStand' });
  }
  init(data) {
    this.player = data.player;
    this.x = data.x;
    this.y = data.y;
  }

  preload() {
    this.load.image('menuPanel', menuPanel);
  }

  create() {
    this.standInfo = this.player.purchased.filter((stand) => {
      return stand.x === this.x && stand.y === this.y;
    });

    this.standInfo[0].now = this.standInfo[0].scene.currentTime;
    this.standInfo[0].startTime = this.standInfo[0].scene.purchasedTime;

    this.position = 50;
    let yPosition = 50;
    const exitButton = new Button(
      this,
      300,
      110,
      '#633fab',
      'Exit Menu',
      'MainScene'
    );
    this.totalCoins = this.add
      .text(1050, 30, `Total Coins: ${this.player.getCoins}`, {
        backgroundColor: '#D65C21',
        fontSize: 35,
        fontFamily: 'Rubik Gemstones',
      })
      .setPadding(5);

    this.container = this.add.container(700, 500);

    console.log(exitButton);
    this.menu = this.add
      .image(0, 0, 'menu-panel')
      .setDepth(2)
      .setScale(5)
      .setAlpha(0.8);

    this.container.add(this.menu);
    this.coinStock = this.add
      .text(
        -150,
        yPosition - 180,
        `Coin Stock: ${this.standInfo[0].coinsStock}`,
        {
          backgroundColor: '#AB3F63',
          fontSize: 30,
          fontFamily: 'Rubik Gemstones',
        }
      )
      .setDepth(4)
      .setPadding(5);
    yPosition += 50;

    this.bank = this.add
      .text(-180, -200, 'Bank', {
        backgroundColor: '#3F99AB',
        fontSize: 35,
        fontFamily: 'Rubik Gemstones',
      })
      .setPadding(5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.bank.setStyle({ fill: '#9FCBD5' }))
      .on('pointerout', () => this.bank.setStyle({ fill: '#FFF' }))
      .on(
        'pointerdown',
        function () {
          this.player.totalCoins([this.standInfo[0].getCoinsStock]);
          this.totalCoins.setText(
            `Total Coins: ${this.player.playerCoins.totalCoins}`
          );
        },
        this
      );

    this.maintenance = this.add
      .text(
        -150,
        yPosition - 180,
        `Maintenance:${this.standInfo[0].getMaintenancePercent}%`,
        {
          backgroundColor: '#AB3F63',
          fontSize: 30,
          fontFamily: 'Rubik Gemstones',
        }
      )
      .setDepth(4)
      .setPadding(5);

    this.repairCost = this.add
      .text(
        -150,
        yPosition - 130,
        `repair cost: ${this.standInfo[0].getMaintenanceToPay}`,
        {
          backgroundColor: '#AB3F63',
          fontSize: 30,
          fontFamily: 'Rubik Gemstones',
        }
      )
      .setDepth(4)
      .setPadding(5);

    this.repair = this.add
      .text(50, -200, 'Repair', {
        backgroundColor: '#AB513F',
        fontSize: 35,
        fontFamily: 'Rubik Gemstones',
      })
      .setPadding(5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.repair.setStyle({ fill: '#D5A89F' }))
      .on('pointerout', () => this.repair.setStyle({ fill: '#FFF' }))
      .on(
        'pointerdown',
        function () {
          if (
            this.player.playerCoins.totalCoins -
              this.standInfo[0].getMaintenanceToPay >=
            0
          ) {
            this.player.totalCoins([this.standInfo[0].maintenancePay()]);
          }
        },
        this
      );

    this.visitorNum = this.add.text(
      -150,
      yPosition - 80,
      `visitor number: ${Math.ceil(
        this.standInfo[0].getMaintenancePercent /
          this.standInfo[0].visitorsPerMin
      )}`,
      {
        backgroundColor: '#AB3F63',
        fontSize: 30,
        fontFamily: 'Rubik Gemstones',
      }
    );

    this.container.add([
      this.coinStock,
      this.maintenance,
      this.bank,
      this.repairCost,
      this.repair,
      this.visitorNum,
    ]);
  }
  update() {
    this.totalCoins.setText(`Total Coins: ${this.player.getCoins}`);

    this.coinStock.setText(`Coin Stock: ${this.standInfo[0].coinsStock}`);

    this.maintenance.setText(
      `Maintenance:${this.standInfo[0].getMaintenancePercent}%`
    );
    this.repairCost.setText(
      `repair cost: ${this.standInfo[0].getMaintenanceToPay}`
    );
    this.visitorNum.setText(
      `visitor number: ${Math.ceil(
        (this.standInfo[0].visitorsPerMin / 100) *
          this.standInfo[0].getMaintenancePercent
      )}`
    );
  }
}
