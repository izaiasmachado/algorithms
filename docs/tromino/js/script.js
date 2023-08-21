import Point from "./Point.js";
import TrominoTilling from "./TrominoTilling.js";
import TrominoTillingVisualizer from "./TrominoTillingVisualizer.js";
import Tromino from "./Tromino.js";
import OptionsListener from "./OptionsListener.js";

window.addEventListener("load", () => {
  const optionsListener = OptionsListener.getInstance();

  optionsListener.setChangeNCallback((n) => {
    const tromino = new TrominoTilling(n);
    const holePoint = new Point(0, 0);
    tromino.solve(holePoint);

    const tv = new TrominoTillingVisualizer(tromino);

    const trominoColoredPoints = tv.getTrominoColoredPoints();
    const sortedTrominoPoints = tv.sortTrominoPoints(trominoColoredPoints);
    tv.placeTrominoTiles(sortedTrominoPoints);
  });
});
