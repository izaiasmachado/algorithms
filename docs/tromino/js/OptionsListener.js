class OptionsListener {
  constructor() {
    this.init();
    this.n = 3;
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
      this.changeNCallback(this.n);
    });

    this.descreaseNButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.n === 1) return;
      this.n = this.n - 1;
      this.changeNCallback(this.n);
    });
  }

  setChangeNCallback(callback) {
    this.changeNCallback = callback;
    this.changeNCallback(this.n);
  }
}

export default OptionsListener;
