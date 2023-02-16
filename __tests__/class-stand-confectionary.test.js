const {
  HotDog,
} = require("../src/statistics/class-stand-confectionary-testing");

describe("HotDog Stand", () => {
  test("HotDog() should return an object", () => {
    const stand1 = new HotDog();
    expect(stand1).toBeInstanceOf(Object);
  });
  test("HotDog should be updated with the correct properties when passed as a property", () => {
    const stand1 = new HotDog("scene", 10, 10, "standBy");
    expect(stand1.scene).toBe("scene");
    expect(stand1.x).toBe(10);
    expect(stand1.y).toBe(10);
    expect(stand1.name).toBe("standBy");
  });
  test("HotDog.getCoinsStatistics should return an object with the coinStatistics", () => {
    const stand1 = new HotDog();
    expect(stand1.getCoinsStatistics).toEqual({ incramentTime: 30, plus: 50 });
  });
  test("HotDog.caculateCoins should be able to take the HotDog.getCoinsStatistics and run HotDog.coins to increase the HotDog.coinsStock by HotDog.getCoinsStatistics plus value when given a time period that is over the HotDog.getCoinsStatistics incramentTime value", () => {
    const stand1 = new HotDog();
    expect(stand1.getCoinsStock).toBe(0);
    stand1.calculateCoins(30);
    expect(stand1.getCoinsStock).toBe(50);
  });
  test("HotDog.calculateCoins should be able to use the HotDog.getCoinsStatistics and run HotDog.coins to output the coins by taking HotDog.getCoinsStatistics plus value when given a time period that is over the HotDog.getCoinsStatistics incramentTime value and the output value should be reduced by HotDog.maintainancePercent rounded up", () => {
    const stand1 = new HotDog();
    stand1.maintenancePercent = 50;
    const visitors1 = stand1.calculateCoins(30);
    expect(visitors1).toBe(25);
    stand1.maintenancePercent = 10;
    const visitors2 = stand1.calculateCoins(30);
    expect(visitors2).toBe(5);
  });
  test("HotDog.getVisitorsStatistics should return an object with the visitorsStatistics", () => {
    const stand1 = new HotDog();
    expect(stand1.getVisitorsStatistics).toEqual({
      incramentTime: 30,
      plus: 5,
    });
  });
  test("HotDog.calculateVisitors should be able to use the HotDog.getVisitorsStatistics and run HotDog.visitors to output the visitors by taking HotDog.getVisitorsStatistics plus value when given a time period that is over the HotDog.getVisitorsStatistics incramentTime value", () => {
    const stand1 = new HotDog();
    const visitors = stand1.calculateVisitors(30);
    expect(visitors).toBe(5);
  });
  test("HotDog.calculateVisitors should be able to use the HotDog.getVisitorsStatistics and run HotDog.visitors to output the visitors by taking HotDog.getVisitorsStatistics plus value when given a time period that is over the HotDog.getVisitorsStatistics incramentTime value and the output value should be reduced by HotDog.maintainancePercent rounded up", () => {
    const stand1 = new HotDog();
    stand1.maintenancePercent = 50;
    const visitors1 = stand1.calculateVisitors(30);
    expect(visitors1).toBe(3);
    stand1.maintenancePercent = 10;
    const visitors2 = stand1.calculateVisitors(30);
    expect(visitors2).toBe(1);
  });
  test("HotDog.getMaintenanceStatistics should return an object with the maintenanceStatistics", () => {
    const stand1 = new HotDog();
    expect(stand1.getMaintenanceStatistics).toEqual({
      incramentTime: 5,
      minus: 2,
    });
  });
  test("HotDog.caculateMaintenance should be able to take the HotDog.getMaintenanceStatistics and run HotDog.maintenance to decrease the HotDog.maintenancePercent by HotDog.getMaintenanceStatistics minus value when given a time period that is over the HotDog.getMaintenanceStatistics incramentTime value", () => {
    const stand1 = new HotDog();
    const maintenance = stand1.calculateMaintenance(5);
    expect(maintenance).toBe(98);
  });
  test("HotDog.cacculateAll should be abel to run the calculateCoins calculateVisitors calculateMaintenance.", () => {
    const stand1 = new HotDog();
    const all = stand1.calculateAll(30);
    expect(all).toEqual({ visitors: 5, coins: 50, maintenance: 98 });
    expect(stand1.getCoinsStock).toBe(50);
    expect(stand1.getMaintenancePercent).toBe(98);
    expect(stand1.getIsShutDown).toBe(false);
    expect(stand1.getMaintenanceToPay).toBe(5);
  });
});
