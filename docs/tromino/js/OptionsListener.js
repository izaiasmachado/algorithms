class OptionsListener {
  constructor() {
    this.init();
    this.n = 3;
    this.x = 0;
    this.y = 0;
    this.addEventListeners();
  }

  static getInstance() {
    if (!OptionsListener.instance) {
      OptionsListener.instance = new OptionsListener();
    }

    return OptionsListener.instance;
  }

  init() {
    this.showN = document.getElementById("show-n");
    this.descreaseNButton = document.getElementById("decrease-n-button");
    this.increaseNButton = document.getElementById("increase-n-button");

    this.inputCoordinateX = document.getElementById("input-coordinate-x");
    this.inputCoordinateY = document.getElementById("input-coordinate-y");
  }

  get n() {
    return Number(this.showN.textContent);
  }

  set n(n) {
    this.showN.textContent = n;
  }

  addEventListeners() {
    this.increaseNButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.n === 10) return;
      this.n = this.n + 1;

      this.changeOptionsCallback(this.n);
    });

    this.descreaseNButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.n === 1) return;
      this.n = this.n - 1;

      this.changeOptionsCallback();
    });

    this.inputCoordinateX.addEventListener("change", (e) => {
      e.preventDefault();

      const maxX = Math.pow(2, this.n) - 1;
      const minX = 0;
      const value = Number(this.inputCoordinateX.value);

      if (value > maxX) {
        this.x = maxX;
        this.inputCoordinateX.value = maxX;
      } else if (value < minX) {
        this.x = minX;
        this.inputCoordinateX.value = minX;
      } else {
        this.x = value;
      }

      this.inputCoordinateX.value = "";
      this.inputCoordinateX.placeholder = this.x;
      this.changeOptionsCallback();
    });

    this.inputCoordinateY.addEventListener("change", (e) => {
      e.preventDefault();
      const maxY = Math.pow(2, this.n) - 1;
      const minY = 0;
      const value = Number(this.inputCoordinateY.value);

      if (value > maxY) {
        this.y = maxY;
        this.inputCoordinateY.value = maxY;
      } else if (value < minY) {
        this.y = minY;
        this.inputCoordinateY.value = minY;
      } else {
        this.y = value;
      }

      this.inputCoordinateY.value = "";
      this.inputCoordinateY.placeholder = this.y;
      this.changeOptionsCallback();
    });
  }

  setChangeOptionsCallback(changeOptionsCallback) {
    this.changeOptionsCallback = changeOptionsCallback;
    this.changeOptionsCallback();
  }
}

export default OptionsListener;
