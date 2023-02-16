import Stands from '../Stands';

class Stand extends Phaser.GameObjects.GameObject {
  constructor(scene, x, y, name) {
    super(scene);
    this.name = name;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.image = '';
    this.maintenancePrice = 250;
    this.maintenancePercent = 100;
    this.coinsMax = 100;
    this.coinsStock = 0;
    this.isShutDown = false;
    this.startTime = 0;

    Stands.forEach((stand) => {
      if (stand.name === this.name) {
        this.image = stand.img;
      }
    });
    if (this.y === 304) {
      const stand = this.scene.add
        .image(x, y, this.image)
        .setInteractive({ useHandCursor: true })
        .setDepth(5)
        .setScale(0.2)
        .on(
          'pointerdown',
          () => {
            this.scene.scene.pause().launch('InfoStand', {
              player: this.scene.player,
              x: this.x,
              y: this.y,
            });
          },
          scene
        );
      this.scene.add.existing(this);
    } else {
      const stand = this.scene.add
        .image(x, y, this.image)
        .setInteractive({ useHandCursor: true })
        .setDepth(5)
        .setScale(0.09)
        .on(
          'pointerdown',
          () => {
            this.scene.scene.pause().launch('InfoStand', {
              player: this.scene.player,
              x: this.x,
              y: this.y,
            });
          },
          scene
        );
      this.scene.add.existing(this);
    }
  }
  ShutDown() {
    this.maintenancePercent < 1
      ? (this.isShutDown = true)
      : (this.isShutDown = false);
  }
  get getIsShutDown() {
    return this.isShutDown;
  }
  get getMaintenanceToPay() {
    return this.maintenancePercent === 0
      ? this.maintenancePrice + (this.maintenancePrice / 100) * 20
      : (this.maintenancePrice / 100) * (100 - this.maintenancePercent);
  }
  maintenancePay() {
    const pay = 0 - this.getMaintenanceToPay;
    this.maintenancePercent = 100;
    this.isShutDown = false;
    return pay;
  }
  get getMaintenancePercent() {
    return this.maintenancePercent;
  }
  maintenance(nowTime, incramentTime, minus) {
    let now = nowTime - this.startTime;
    if (now % incramentTime === 0) {
      this.maintenancePercent - minus < 0
        ? (this.maintenancePercent = 0)
        : (this.maintenancePercent = this.maintenancePercent - minus);
    }
    this.ShutDown();
    return this.getMaintenancePercent;
  }
  coins(nowTime, incramentTime, plus) {
    let coins = 0;
    let now = nowTime - this.startTime;
    if (now % incramentTime === 0) {
      coins += Math.ceil((plus / 100) * this.getMaintenancePercent);
      this.coinsStock = this.coinsStock + coins;
    }
    if (this.coinsStock > this.coinsMax) {
      this.coinsStock = this.coinsMax;
      coins = this.coinsMax;
    }
    return coins;
  }
  get getCoinsStock() {
    const cashOut = this.coinsStock;
    this.coinsStock = 0;
    return cashOut;
  }
  visitors(nowTime, incramentTime, plus) {
    let visitors = 0;
    let now = nowTime - this.startTime;
    if (now % incramentTime === 0) visitors += plus;
    return visitors;
  }
}

export default Stand;
