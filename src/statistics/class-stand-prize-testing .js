const { Stand } = require("./class-stand-testing");

class CoconutShy extends Stand {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 50;
    this.standType = "Prize Stall";
    this.coinsMax = 200;
    this.coinsStatistics = { incramentTime: 30, plus: 25 };
    this.visitorsStatistics = { incramentTime: 30, plus: 25 };
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
class HookADuck extends CoconutShy {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 55;
    this.standType = "Prize Stall";
    this.coinsMax = 100;
    this.coinsStatistics = { incramentTime: 20, plus: 15 };
    this.visitorsStatistics = { incramentTime: 10, plus: 10 };
  }
}
class Basketball extends CoconutShy {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 45;
    this.standType = "Prize Stall";
    this.coinsMax = 300;
    this.coinsStatistics = { incramentTime: 40, plus: 24 };
    this.visitorsStatistics = { incramentTime: 12, plus: 8 };
  }
}

module.exports = {
  CoconutShy: CoconutShy,
  HookADuck: HookADuck,
  Basketball: Basketball,
};
