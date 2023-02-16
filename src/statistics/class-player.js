class Player {
  constructor() {
    this.playerCoins = { totalCoins: 1000 };
    this.playerVisitors = { totalVisitors: 0 };
    this.purchased = [];
  }
  totalCoins(array) {
    const newTotalCoins = {};
    newTotalCoins.totalCoins = this.playerCoins.totalCoins;
    if (!Array.isArray(array)) this.playerCoins = newTotalCoins;
    let newCoins = 0;
    if (array.length < 1) this.playerCoins = newTotalCoins;
    array.forEach((coin) => (newCoins += coin));
    newTotalCoins.totalCoins = this.playerCoins.totalCoins + newCoins;
    this.playerCoins = newTotalCoins;
  }
  get getCoins() {
    return this.playerCoins.totalCoins;
  }
  totalVisitors(array) {
    const newTotalVisitors = {};
    newTotalVisitors.totalVisitors = this.playerVisitors.totalVisitors;
    if (!Array.isArray(array)) this.playerVisitors = newTotalVisitors;
    let newVisitors = 0;
    if (array.length < 1) this.playerVisitors = newTotalVisitors;
    array.forEach((visitor) => (newVisitors += visitor));
    newTotalVisitors.totalVisitors =
      this.playerVisitors.totalVisitors + newVisitors;
    this.playerVisitors = newTotalVisitors;
  }
  get getVisitors() {
    return this.playerVisitors.totalVisitors;
  }
  addPurchased(newStand) {
    this.purchased.push(newStand);
  }
}

module.exports = { Player: Player };
