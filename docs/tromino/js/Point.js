class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getQuadrantGivenMiddle(middle) {
    const { x: xMid, y: yMid } = middle;
    const { x, y } = this;

    if (x <= xMid && y <= yMid) return 1;
    if (x <= xMid && y > yMid) return 2;
    if (x > xMid && y <= yMid) return 3;
    return 4;
  }
}

export default Point;
