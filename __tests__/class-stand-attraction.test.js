const {
  FerrisWheel,
} = require("../src/statistics/class-stand-attraction-testing");

describe("FerrisWheel Stand", () => {
  test("FerrisWheel() should return an object", () => {
    const stand1 = new FerrisWheel();
    expect(stand1).toBeInstanceOf(Object);
  });
  test("FerrisWheel should be updated with the correct properties when passed as a property", () => {
    const stand1 = new FerrisWheel("scene", 10, 10, "standBy");
    expect(stand1.scene).toBe("scene");
    expect(stand1.x).toBe(10);
    expect(stand1.y).toBe(10);
    expect(stand1.name).toBe("standBy");
  });
  test("FerrisWheel.getCoinsStatistics should return an object with the coinStatistics", () => {
    const stand1 = new FerrisWheel();
    expect(stand1.getCoinsStatistics).toEqual({ incramentTime: 30, plus: 10 });
  });
  test("FerrisWheel.caculateCoins should be able to take the FerrisWheel.getCoinsStatistics and run FerrisWheel.coins to increase the FerrisWheel.coinsStock by FerrisWheel.getCoinsStatistics plus value when given a time period that is over the FerrisWheel.getCoinsStatistics incramentTime value", () => {
    const stand1 = new FerrisWheel();
    expect(stand1.getCoinsStock).toBe(0);
    stand1.calculateCoins(30);
    expect(stand1.getCoinsStock).toBe(10);
  });
  test("FerrisWheel.calculateCoins should be able to use the FerrisWheel.getCoinsStatistics and run FerrisWheel.coins to output the coins by taking FerrisWheel.getCoinsStatistics plus value when given a time period that is over the FerrisWheel.getCoinsStatistics incramentTime value and the output value should be reduced by FerrisWheel.maintainancePercent rounded up", () => {
    const stand1 = new FerrisWheel();
    stand1.maintenancePercent = 50;
    const visitors1 = stand1.calculateCoins(30);
    expect(visitors1).toBe(5);
    stand1.maintenancePercent = 10;
    const visitors2 = stand1.calculateCoins(30);
    expect(visitors2).toBe(1);
  });
  test("FerrisWheel.getVisitorsStatistics should return an object with the visitorsStatistics", () => {
    const stand1 = new FerrisWheel();
    expect(stand1.getVisitorsStatistics).toEqual({
      incramentTime: 30,
      plus: 50,
    });
  });
  test("FerrisWheel.calculateVisitors should be able to use the FerrisWheel.getVisitorsStatistics and run FerrisWheel.visitors to output the visitors by taking FerrisWheel.getVisitorsStatistics plus value when given a time period that is over the FerrisWheel.getVisitorsStatistics incramentTime value", () => {
    const stand1 = new FerrisWheel();
    const visitors = stand1.calculateVisitors(30);
    expect(visitors).toBe(50);
  });
  test("FerrisWheel.calculateVisitors should be able to use the FerrisWheel.getVisitorsStatistics and run FerrisWheel.visitors to output the visitors by taking FerrisWheel.getVisitorsStatistics plus value when given a time period that is over the FerrisWheel.getVisitorsStatistics incramentTime value and the output value should be reduced by FerrisWheel.maintainancePercent rounded up", () => {
    const stand1 = new FerrisWheel();
    stand1.maintenancePercent = 50;
    const visitors1 = stand1.calculateVisitors(30);
    expect(visitors1).toBe(25);
    stand1.maintenancePercent = 10;
    const visitors2 = stand1.calculateVisitors(30);
    expect(visitors2).toBe(5);
  });
  test("FerrisWheel.getMaintenanceStatistics should return an object with the maintenanceStatistics", () => {
    const stand1 = new FerrisWheel();
    expect(stand1.getMaintenanceStatistics).toEqual({
      incramentTime: 5,
      minus: 2,
    });
  });
  test("FerrisWheel.caculateMaintenance should be able to take the FerrisWheel.getMaintenanceStatistics and run FerrisWheel.maintenance to decrease the FerrisWheel.maintenancePercent by FerrisWheel.getMaintenanceStatistics minus value when given a time period that is over the FerrisWheel.getMaintenanceStatistics incramentTime value", () => {
    const stand1 = new FerrisWheel();
    const maintenance = stand1.calculateMaintenance(5);
    expect(maintenance).toBe(98);
  });
  test("ferrisWheel.cacculateAll should be abel to run the calculateCoins calculateVisitors calculateMaintenance.", () => {
    const stand1 = new FerrisWheel();
    const all = stand1.calculateAll(30);
    expect(all).toEqual({ visitors: 50, coins: 10, maintenance: 98 });
    expect(stand1.getCoinsStock).toBe(10);
    expect(stand1.getMaintenancePercent).toBe(98);
    expect(stand1.getIsShutDown).toBe(false);
    expect(stand1.getMaintenanceToPay).toBe(10);
  });
});
