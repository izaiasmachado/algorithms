import { getRandomColor } from "./utils.js";
import Point from "./Point.js";
import TrominoTilling from "./TrominoTilling.js";
import TrominoTillingVisualizer from "./TrominoTillingVisualizer.js";
import Tromino from "./Tromino.js";

window.addEventListener("load", () => {
  const n = 5;

  const tromino = new TrominoTilling(n);
  const holePoint = new Point(0, 0);
  tromino.solve(holePoint);

  const emptyTromino = new Tromino([holePoint]);
  emptyTromino.markAsEmpty();
  tromino.trominos.push(emptyTromino);
  const tv = new TrominoTillingVisualizer(tromino);

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

  const sortedTrominoPoints = trominoPoints.sort((a, b) => {
    if (a.x === b.x) return a.y - b.y;
    return a.x - b.x;
  });

  sortedTrominoPoints.forEach((point) => {
    const color = point.color;

    const tile = document.createElement("div");
    tile.style.backgroundColor = color;
    tile.style.width = "100%";
    tile.style.height = "100%";

    tv.addTile({ element: tile });
  });
});
