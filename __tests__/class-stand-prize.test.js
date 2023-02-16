const { CoconutShy } = require("../src/statistics/class-stand-prize-testing ");

describe("CoconutShy Stand", () => {
  test("CoconutShy() should return an object", () => {
    const stand1 = new CoconutShy();
    expect(stand1).toBeInstanceOf(Object);
  });
  test("CoconutShy should be updated with the correct properties when passed as a property", () => {
    const stand1 = new CoconutShy("scene", 10, 10, "standBy");
    expect(stand1.scene).toBe("scene");
    expect(stand1.x).toBe(10);
    expect(stand1.y).toBe(10);
    expect(stand1.name).toBe("standBy");
  });
  test("CoconutShy.getCoinsStatistics should return an object with the coinStatistics", () => {
    const stand1 = new CoconutShy();
    expect(stand1.getCoinsStatistics).toEqual({ incramentTime: 30, plus: 25 });
  });
  test("CoconutShy.caculateCoins should be able to take the CoconutShy.getCoinsStatistics and run CoconutShy.coins to increase the CoconutShy.coinsStock by CoconutShy.getCoinsStatistics plus value when given a time period that is over the CoconutShy.getCoinsStatistics incramentTime value", () => {
    const stand1 = new CoconutShy();
    expect(stand1.getCoinsStock).toBe(0);
    stand1.calculateCoins(30);
    expect(stand1.getCoinsStock).toBe(25);
  });
  test("CoconutShy.calculateCoins should be able to use the CoconutShy.getCoinsStatistics and run CoconutShy.coins to output the coins by taking CoconutShy.getCoinsStatistics plus value when given a time period that is over the CoconutShy.getCoinsStatistics incramentTime value and the output value should be reduced by CoconutShy.maintainancePercent rounded up", () => {
    const stand1 = new CoconutShy();
    stand1.maintenancePercent = 50;
    const visitors1 = stand1.calculateCoins(30);
    expect(visitors1).toBe(13);
    stand1.maintenancePercent = 10;
    const visitors2 = stand1.calculateCoins(30);
    expect(visitors2).toBe(3);
  });
  test("CoconutShy.getVisitorsStatistics should return an object with the visitorsStatistics", () => {
    const stand1 = new CoconutShy();
    expect(stand1.getVisitorsStatistics).toEqual({
      incramentTime: 30,
      plus: 25,
    });
  });
  test("CoconutShy.calculateVisitors should be able to use the CoconutShy.getVisitorsStatistics and run CoconutShy.visitors to output the visitors by taking CoconutShy.getVisitorsStatistics plus value when given a time period that is over the CoconutShy.getVisitorsStatistics incramentTime value", () => {
    const stand1 = new CoconutShy();
    const visitors = stand1.calculateVisitors(30);
    expect(visitors).toBe(25);
  });
  test("CoconutShy.calculateVisitors should be able to use the CoconutShy.getVisitorsStatistics and run CoconutShy.visitors to output the visitors by taking CoconutShy.getVisitorsStatistics plus value when given a time period that is over the CoconutShy.getVisitorsStatistics incramentTime value and the output value should be reduced by CoconutShy.maintainancePercent rounded up", () => {
    const stand1 = new CoconutShy();
    stand1.maintenancePercent = 50;
    const visitors1 = stand1.calculateVisitors(30);
    expect(visitors1).toBe(13);
    stand1.maintenancePercent = 10;
    const visitors2 = stand1.calculateVisitors(30);
    expect(visitors2).toBe(3);
  });
  test("CoconutShy.getMaintenanceStatistics should return an object with the maintenanceStatistics", () => {
    const stand1 = new CoconutShy();
    expect(stand1.getMaintenanceStatistics).toEqual({
      incramentTime: 5,
      minus: 2,
    });
  });
  test("CoconutShy.caculateMaintenance should be able to take the CoconutShy.getMaintenanceStatistics and run CoconutShy.maintenance to decrease the CoconutShy.maintenancePercent by CoconutShy.getMaintenanceStatistics minus value when given a time period that is over the CoconutShy.getMaintenanceStatistics incramentTime value", () => {
    const stand1 = new CoconutShy();
    const maintenance = stand1.calculateMaintenance(5);
    expect(maintenance).toBe(98);
  });
  test("CoconutShy.cacculateAll should be abel to run the calculateCoins calculateVisitors calculateMaintenance.", () => {
    const stand1 = new CoconutShy();
    const all = stand1.calculateAll(30);
    expect(all).toEqual({ visitors: 25, coins: 25, maintenance: 98 });
    expect(stand1.getCoinsStock).toBe(25);
    expect(stand1.getMaintenancePercent).toBe(98);
    expect(stand1.getIsShutDown).toBe(false);
    expect(stand1.getMaintenanceToPay).toBe(1);
  });
});
