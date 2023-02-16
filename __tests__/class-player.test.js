const { Player } = require("../src/statistics/class-player");

describe("player", () => {
  test("player resutns an object", () => {
    const player1 = new Player();
    expect(player1).toBeInstanceOf(Object);
  });
  test("playerCoins should update when running totalCoins( )", () => {
    const player1 = new Player();
    player1.totalCoins([10, 10]);
    expect(player1.playerCoins).toEqual({ totalCoins: 520 });
  });
  test("player.getCoins should return a number and it should be 0 before updateing", () => {
    const player1 = new Player();
    expect(typeof player1.getCoins).toBe("number");
    expect(player1.getCoins).toBe(500);
  });
  test("playerVisitors should update when running totalVisitors( )", () => {
    const player1 = new Player();
    player1.totalVisitors([10, 10]);
    expect(player1.playerVisitors).toEqual({ totalVisitors: 20 });
  });
  test("player.getVisitors should return a number and it should be 0 before updateing", () => {
    const player1 = new Player();
    expect(typeof player1.getVisitors).toBe("number");
    expect(player1.getVisitors).toBe(0);
  });
});
