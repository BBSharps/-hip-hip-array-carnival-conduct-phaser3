const { Stand } = require("./class-stand-testing");

class FerrisWheel extends Stand {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 500;
    this.standType = "attraction";
    this.coinsMax = 150;
    this.coinsStatistics = { incramentTime: 30, plus: 10 };
    this.visitorsStatistics = { incramentTime: 30, plus: 50 };
    this.maintenanceStatistics = { incramentTime: 5, minus: 2 };
  }

  get getCoinsStatistics() {
    return this.coinsStatistics;
  }
  calculateCoins(nowTime) {
    const useCoins = this.getCoinsStatistics;
    return this.coins(nowTime, useCoins.incramentTime, useCoins.plus);
  }
  get getVisitorsStatistics() {
    return this.visitorsStatistics;
  }
  calculateVisitors(nowTime) {
    const useVisitors = this.getVisitorsStatistics;
    let visitorsToMinusPercent = this.visitors(
      nowTime,
      useVisitors.incramentTime,
      useVisitors.plus
    );

    return Math.ceil(
      (visitorsToMinusPercent / 100) * this.getMaintenancePercent
    );
  }
  get getMaintenanceStatistics() {
    return this.maintenanceStatistics;
  }
  calculateMaintenance(nowTime) {
    const useMaintenance = this.getMaintenanceStatistics;
    return this.maintenance(
      nowTime,
      useMaintenance.incramentTime,
      useMaintenance.minus
    );
  }
  calculateAll(nowTime) {
    const coins = this.calculateCoins(nowTime);
    const visitors = this.calculateVisitors(nowTime);
    const maintenance = this.calculateMaintenance(nowTime);
    return { visitors: visitors, maintenance: maintenance, coins: coins };
  }
}

class Carousel extends FerrisWheel {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 750;
    this.standType = "confectionary";
    this.coinsMax = 150;
    this.coinsStatistics = { incramentTime: 25, plus: 10 };
    this.visitorsStatistics = { incramentTime: 20, plus: 40 };
  }
}
class Dodgems extends FerrisWheel {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 245;
    this.standType = "confectionary";
    this.coinsMax = 100;
    this.coinsStatistics = { incramentTime: 45, plus: 30 };
    this.visitorsStatistics = { incramentTime: 10, plus: 16 };
  }
}

module.exports = {
  FerrisWheel: FerrisWheel,
  Carousel: Carousel,
  Dodgems: Dodgems,
};
