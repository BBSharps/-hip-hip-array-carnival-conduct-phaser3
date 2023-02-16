const { Stand } = require("../src/statistics/class-stand-testing");

describe("stand", () => {
  test("stand resutns an object", () => {
    const stand1 = new Stand();
    expect(stand1).toBeInstanceOf(Object);
  });
  test("stand should be updated with the correct properties when passed as a property", () => {
    const stand1 = new Stand("scene", 10, 10, "standBy");
    expect(stand1.scene).toBe("scene");
    expect(stand1.x).toBe(10);
    expect(stand1.y).toBe(10);
    expect(stand1.name).toBe("standBy");
  });
  test("stand should have a isShutDown property", () => {
    const stand1 = new Stand();
    expect(stand1.isShutDown).toEqual(false);
  });
  test("stand.getIsShutDown should return a boolean", () => {
    const stand1 = new Stand();
    expect(stand1.getIsShutDown).toBe(false);
    expect(typeof stand1.getIsShutDown).toBe("boolean");
  });
  test("stand.maintenance should return a number", () => {
    const stand1 = new Stand();
    expect(stand1.maintenance(0, 0, 0)).toBe(100);
    expect(typeof stand1.maintenance(5, 10, 15)).toBe("number");
  });
  test("stand.maintenance should decrease by minus after a nowTime that is divisible by the incrament", () => {
    const stand1 = new Stand();
    stand1.maintenance(2, 2, 10);
    expect(stand1.maintenancePercent).toBe(90);
  });
  test("if stand.maintenancePercent reaches 0 or below stand.isShutDown should be equal to true", () => {
    const stand1 = new Stand();
    stand1.maintenance(2, 2, 100);
    expect(stand1.maintenancePercent).toBe(0);
    expect(stand1.getIsShutDown).toBe(true);
  });
  test("stand.getMaintenanceToPay should return the price to pay to return the maintainancePercent to 100", () => {
    const stand1 = new Stand();
    const pay = stand1.getMaintenanceToPay;
    expect(pay).toBe(0);
  });
  test("stand.getMaintenanceToPay should return the price to pay to return the maintainancePercent to 100 and it should increase as the maintainancePercent decreases", () => {
    const stand1 = new Stand();
    stand1.maintenancePercent = 90;
    const pay1 = stand1.getMaintenanceToPay;
    stand1.maintenancePercent = 80;
    const pay2 = stand1.getMaintenanceToPay;
    stand1.maintenancePercent = 10;
    const pay3 = stand1.getMaintenanceToPay;
    expect(pay1).toBe(25);
    expect(pay2).toBe(50);
    expect(pay3).toBe(225);
  });
  test("stand.getMaintainanceToPay should be at 300 when mainatainancePercent is 0", () => {
    const stand1 = new Stand();
    stand1.maintenancePercent = 0;
    const pay = stand1.getMaintenanceToPay;
    expect(pay).toBe(300);
  });
  test("stand.maintainancePay() should reset the maintainancePercent to 100 and return getMaintainanceToPay as a negative", () => {
    const stand1 = new Stand();
    stand1.maintenancePercent = 50;
    const toPay = stand1.getMaintenanceToPay;
    const pay = stand1.maintenancePay();
    expect(stand1.maintenancePercent).toBe(100);
    expect(pay).toBe(0 - toPay);
  });
  test("stand.getMaintainancePercent returns the mainatinancePercent and should not go below 0", () => {
    const stand1 = new Stand();
    const percent1 = stand1.getMaintenancePercent;
    expect(percent1).toBe(100);
    stand1.maintenancePercent = 50;
    const percent2 = stand1.getMaintenancePercent;
    expect(percent2).toBe(50);
    stand1.maintenance(1, 1, 1000);
    const percent3 = stand1.getMaintenancePercent;
    expect(percent3).toBe(0);
  });
});
describe("stand.coins", () => {
  test("stand.coins returns a number", () => {
    const stand1 = new Stand();
    expect(typeof stand1.coins(0, 0, 0, 0)).toBe("number");
    expect(stand1.coins(0, 0, 0, 0)).toBe(0);
  });

  test("stand.coins should output plus after any nowTime this is divisible by the incrament value", () => {
    const stand1 = new Stand();
    stand1.startTime = 20;
    const coins = stand1.coins(2, 2, 10);
    expect(coins).toBe(10);
    const coins2 = stand1.coins(7, 2, 10);
    expect(coins2).toBe(0);
  });
  test("stand.coins should increase stand.coinsStock when invoked", () => {
    const stand1 = new Stand();
    const coins1 = stand1.coins(2, 2, 10);
    expect(coins1).toBe(10);
    const coins2 = stand1.coins(4, 2, 10);
    expect(coins2).toBe(10);
    const coins3 = stand1.coins(6, 2, 10);
    expect(coins3).toBe(10);
    expect(stand1.coinsStock).toBe(30);
  });
  test("stand.coins should not be able to increase stand.coinsStock above stand.coinsMax", () => {
    const stand1 = new Stand();
    const coins = stand1.coins(2, 2, 1000);
    expect(coins).toBe(100);
    expect(stand1.coinsStock).toBe(100);
  });
  test("stand.getCoinsStock returns the coinsStock and resets coinsStock", () => {
    const stand1 = new Stand();
    stand1.coins(2, 2, 10);
    expect(stand1.coinsStock).toBe(10);
    expect(stand1.getCoinsStock).toBe(10);
    expect(stand1.coinsStock).toBe(0);
  });
});
describe("stand.visitors", () => {
  test("stand.visitors resturns a number", () => {
    const stand1 = new Stand();
    const visitors = stand1.visitors(0, 0, 0, 0);
    expect(typeof visitors).toBe("number");
    expect(visitors).toBe(0);
  });

  test("stand.visitors should output plus after any nowTime this is divisible by the incrament value", () => {
    const stand1 = new Stand();
    stand1.startTime = 20;
    const visitors = stand1.visitors(2, 2, 10);
    expect(visitors).toBe(10);
    const visitors2 = stand1.visitors(7, 2, 10);
    expect(visitors2).toBe(0);
  });
});
