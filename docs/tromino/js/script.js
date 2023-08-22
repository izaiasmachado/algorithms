import Point from "./Point.js";
import TrominoTilling from "./TrominoTilling.js";
import TrominoTillingVisualizer from "./TrominoTillingVisualizer.js";
import OptionsListener from "./OptionsListener.js";

window.addEventListener("load", () => {
  const optionsListener = OptionsListener.getInstance();

  optionsListener.setChangeNCallback((n) => {
    const tromino = new TrominoTilling(n);
    const holePoint = new Point(3, 0);
    tromino.solve(holePoint);

    const tv = new TrominoTillingVisualizer(tromino);
    tv.setHolePoint(holePoint);

    const trominoColoredPoints = tv.getTrominoColoredPoints();
    const sortedTrominoPoints = tv.sortTrominoPoints(trominoColoredPoints);
    tv.placeTrominoTiles(sortedTrominoPoints);
  });
});
