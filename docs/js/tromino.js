const randomFourLetterId = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  return id;
};

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

class TrominoTrilling {
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

class TrominoTrillingVisualizer {
  constructor(tromino) {
    this.tromino = tromino;
    this.rows = tromino.board.length;
    this.columns = tromino.board.length;
    this.createElement();
    this.createLevelGrid();
  }

  createElement = () => {
    this.element = document.getElementById("tromino-grid");
  };

  createLevelGrid = () => {
    this.element.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    this.element.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;

    this.element.style.width = "100%";
    const elementWidth = this.element.offsetWidth;

    const maxSize = 600;
    const width = elementWidth > maxSize ? maxSize : elementWidth;

    this.element.style.height = width + "px";
    this.element.style.width = width + "px";
  };

  addTile = (tile) => {
    this.element.appendChild(tile.element);
  };
}

function getRandomColor() {
  const letters = "23456789ABCDEF";
  let color = "#";
  for (let i = 1; i <= 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

window.addEventListener("load", () => {
  const n = 5;

  const tromino = new TrominoTrilling(n);
  const holePoint = new Point(0, 0);
  tromino.solve(holePoint);

  const emptyTromino = new Tromino([holePoint]);
  emptyTromino.markAsEmpty();
  tromino.trominos.push(emptyTromino);
  const tv = new TrominoTrillingVisualizer(tromino);

  const colorTrominos = {};

  tromino.trominos.forEach((tromino) => {
    const color = tromino.empty ? "black" : getRandomColor();
    colorTrominos[tromino.id] = color;
  });

  const trominoPoints = [];

  tromino.trominos.forEach((tromino) => {
    const points = tromino.points;

    points.forEach((point) => {
      point.color = colorTrominos[tromino.id];
      trominoPoints.push(point);
    });
  });

  console.log(trominoPoints);

  const sortedTrominoPoints = trominoPoints.sort((a, b) => {
    if (a.x === b.x) return a.y - b.y;
    return a.x - b.x;
  });

  console.log(sortedTrominoPoints);

  sortedTrominoPoints.forEach((point) => {
    const color = point.color;

    const tile = document.createElement("div");
    tile.style.backgroundColor = color;
    tile.style.width = "100%";
    tile.style.height = "100%";

    tv.addTile({ element: tile });
  });
});
