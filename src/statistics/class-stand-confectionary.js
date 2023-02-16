import Stand from "./class-stand";

class HotDog extends Stand {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 250;
    this.standType = "confectionary";
    this.coinsMax = 400;
    this.coinsStatistics = { incramentTime: 5, plus: 50 };
    this.visitorsStatistics = { incramentTime: 30, plus: 5 };
    this.maintenanceStatistics = { incramentTime: 5, minus: 2 };
    this.visitorsPerMin = 10;
    this.start = 0;
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

class PopCorn extends HotDog {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 240;
    this.standType = "confectionary";
    this.coinsMax = 400;
    this.coinsStatistics = { incramentTime: 25, plus: 30 };
    this.visitorsStatistics = { incramentTime: 20, plus: 3 };
    this.visitorsPerMin = 9;
    this.start = 0;
  }
}
class CandyFloss extends HotDog {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    this.maintenancePrice = 245;
    this.standType = "confectionary";
    this.coinsMax = 500;
    this.coinsStatistics = { incramentTime: 60, plus: 80 };
    this.visitorsStatistics = { incramentTime: 10, plus: 2 };
    this.visitorsPerMin = 12;
    this.start = 0;
  }
}

export default HotDog;
PopCorn;
CandyFloss;
