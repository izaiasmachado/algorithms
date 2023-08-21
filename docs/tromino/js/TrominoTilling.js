import Point from "./Point.js";
import Tromino from "./Tromino.js";

class TrominoTilling {
  static getBoard(n) {
    const board = [];
    for (let i = 0; i < 2 ** n; i++) {
      board.push([]);
      for (let j = 0; j < 2 ** n; j++) {
        board[i].push(0);
      }
    }
    return board;
  }

  constructor(n, board = []) {
    this.n = n;
    this.board = board.length === 0 ? this.constructor.getBoard(n) : board;
    this.start = new Point(0, 0);
    this.end = new Point(this.board.length - 1, this.board.length - 1);
    this.trominos = [];
  }

  solveBaseCase(holePoint) {
    const tromino = new Tromino();

    if (this.end.x - this.start.x !== 1) return;

    for (let i = this.start.x; i <= this.end.x; i++) {
      for (let j = this.start.y; j <= this.end.y; j++) {
        if (i === holePoint.x && j === holePoint.y) continue;
        this.board[i][j] = 1;
        tromino.addPoint(new Point(i, j));
      }
    }

    this.trominos.push(tromino);
  }

  solve(holePoint) {
    if (this.end.x - this.start.x === 1) {
      this.solveBaseCase(holePoint);
      return;
    }

    const temporarilyEmptyHolesSubBoards =
      this.getTemporarilyEmptyHolesSubBoards();
    // const holesSubBoards = this.getHolesSubBoards();
    const startAndEndPointsSubBoards = this.getStartAndEndPointsSubBoards();
    const middle = this.getMiddlePoint();
    const quadrantTargetHole = holePoint.getQuadrantGivenMiddle(middle);

    for (let i = 0; i < 4; i++) {
      const temporarilyEmptyHole = temporarilyEmptyHolesSubBoards[i];
      const [start, end] = startAndEndPointsSubBoards[i];

      const quadrantTemporarilyEmptyHole =
        temporarilyEmptyHole.getQuadrantGivenMiddle(middle);
      const hole =
        quadrantTemporarilyEmptyHole === quadrantTargetHole
          ? holePoint
          : temporarilyEmptyHole;

      this.setStartingPoint(start.x, start.y);
      this.setEndingPoint(end.x, end.y);

      this.solve(hole);
    }

    const middleTromino = new Tromino();

    for (let i = 0; i < temporarilyEmptyHolesSubBoards.length; i++) {
      const hole = temporarilyEmptyHolesSubBoards[i];
      const isTargetHole = hole.x === holePoint.x && hole.y === holePoint.y;

      if (isTargetHole) continue;
      if (this.board[hole.x][hole.y] === 1) continue;
      this.board[hole.x][hole.y] = 1;
      middleTromino.addPoint(hole);
    }

    this.trominos.push(middleTromino);
  }

  getMiddlePoint() {
    const xMiddle = Math.floor((this.start.x + this.end.x) / 2);
    const yMiddle = Math.floor((this.start.y + this.end.y) / 2);
    return new Point(xMiddle, yMiddle);
  }

  getHolePointRelativeToMiddle() {
    return [new Point(0, 0), new Point(0, 1), new Point(1, 0), new Point(1, 1)];
  }

  getTemporarilyEmptyHolesSubBoards() {
    const middle = this.getMiddlePoint();
    const holePointRelativeToMiddle = this.getHolePointRelativeToMiddle();

    const holesSubBoards = holePointRelativeToMiddle.map((point) => {
      const actualPoint = new Point(point.x + middle.x, point.y + middle.y);
      return actualPoint;
    });

    return holesSubBoards;
  }

  getStartAndEndPointsSubBoards() {
    const middle = this.getMiddlePoint();

    return [
      [this.start, middle],
      [new Point(this.start.x, middle.y + 1), new Point(middle.x, this.end.y)],
      [new Point(middle.x + 1, this.start.y), new Point(this.end.x, middle.y)],
      [new Point(middle.x + 1, middle.y + 1), this.end],
    ];
  }

  setStartingPoint(x, y) {
    this.start = new Point(x, y);
  }

  setEndingPoint(x, y) {
    this.end = new Point(x, y);
  }
}

export default TrominoTilling;
