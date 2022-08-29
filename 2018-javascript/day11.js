let serialNumber = 6042
let powergrid = [...new Array(300)].map(() => new Array(300).fill(""))
class Cell {
  constructor(powerlevel, x, y) {
    this.powerlevel = powerlevel;
    this.x = x;
    this.y = y;
  }

  getSquarePower(grid = [[0]]) {
    let [x, y] = [this.y, this.x]
    return [this,
      grid[x - 1][y + 1],
      grid[x][y + 1],
      grid[x + 1][y + 1],
      grid[x - 1][y],
      grid[x + 1][y],
      grid[x - 1][y - 1],
      grid[x][y - 1],
      grid[x + 1][y - 1]].map(i => i.powerlevel).reduce((a, b) => a + b)
  }

  getSquarePower2(grid) {

  }
}

for (let y = 0; y < powergrid.length; y++) {
  for (let x = 0; x < powergrid[y].length; x++) {
    let rackID = x + 1 + 10;
    let powerlevel1 = rackID * (y + 1);
    let powerlevel2 = powerlevel1 + serialNumber;
    let powerlevel3 = powerlevel2 * rackID;
    let finalpowerlevel = powerlevel3.toString().split("").reverse()[2] || 0
    powergrid[y][x] = new Cell(+finalpowerlevel - 5, x, y)
  }
}

let max = 0;
let cmax = []
for (let y = 1; y < powergrid.length - 1; y++) {
  for (let x = 1; x < powergrid[y].length - 1; x++) {
    let pl = powergrid[y][x].getSquarePower(powergrid);
    if (pl > max) {
      max = pl
      cmax = [x, y]
    }
  }
}

console.log(cmax)
