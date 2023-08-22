import { getRandomColor } from "./utils.js";
import Tromino from "./Tromino.js";

class TrominoTillingVisualizer {
  constructor(tromino) {
    this.tromino = tromino;
    this.rows = tromino.board.length;
    this.columns = tromino.board.length;
    this.colors = {};
    this.createElement();
    this.createLevelGrid();
  }

  createElement = () => {
    this.element = document.getElementById("tromino-grid");
    this.clear();
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

  clear = () => {
    this.element.innerHTML = "";
  };

  setHolePoint = (holePoint) => {
    this.holePoint = holePoint;
  };

  solve() {}

  getHolePointTromino() {
    const tromino = new Tromino();
    tromino.addPoint(this.holePoint);
    tromino.markAsEmpty();
    return tromino;
  }

  getTrominos() {
    const holePointTromino = this.getHolePointTromino();
    return [...this.tromino.trominos, holePointTromino];
  }

  getColoredTrominos() {
    const trominos = this.getTrominos();

    return trominos.map((tromino) => {
      const color = tromino.empty ? "black" : getRandomColor();
      return { ...tromino, color };
    });
  }

  getTrominoColoredPoints() {
    const coloredTrominos = this.getColoredTrominos();

    const trominoPoints = coloredTrominos.reduce((acc, tromino) => {
      const points = tromino.points;

      const coloredPoints = points.map((point) => {
        return { ...point, color: tromino.color };
      });

      acc.push(...coloredPoints);
      return acc;
    }, []);

    return trominoPoints;
  }

  sortTrominoPoints(trominoPoints) {
    return trominoPoints.sort((a, b) => {
      if (a.x === b.x) return a.y - b.y;
      return a.x - b.x;
    });
  }

  placeTrominoTiles(trominoPoints) {
    trominoPoints.forEach((point) => {
      const color = point.color;
      this.addColoredTile({ color });
    });
  }

  addColoredTile({ color }) {
    const tile = document.createElement("div");
    tile.style.backgroundColor = color;
    tile.style.width = "100%";
    tile.style.height = "100%";

    this.addTile({ element: tile });
  }
}

export default TrominoTillingVisualizer;
