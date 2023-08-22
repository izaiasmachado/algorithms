import { randomFourLetterId } from "./utils.js";

class Tromino {
  constructor(points = []) {
    this.id = randomFourLetterId();
    this.points = points;
  }

  markAsEmpty() {
    this.empty = true;
  }

  addPoint(point) {
    this.points.push(point);
  }
}

export default Tromino;
