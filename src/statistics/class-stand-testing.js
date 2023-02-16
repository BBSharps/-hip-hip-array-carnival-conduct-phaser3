class Stand {
  constructor(scene, x, y, name) {
    this.name = name;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.maintenancePrice = 250;
    this.maintenancePercent = 100;
    this.coinsMax = 100;
    this.coinsStock = 0;
    this.isShutDown = false;
    this.startTime = 0;
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

module.exports = { Stand: Stand };
