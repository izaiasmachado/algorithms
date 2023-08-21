class TrominoTillingVisualizer {
  constructor(tromino) {
    this.tromino = tromino;
    this.rows = tromino.board.length;
    this.columns = tromino.board.length;
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
}

export default TrominoTillingVisualizer;
