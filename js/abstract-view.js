export default class AbstractView {
  constructor(level) {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
    this.level = level;
  }

  get template() {
    throw new Error(`Template is required`);
  }

  render() {
    this._element.innerHTML = this.template();
    return this._element.firstElementChild;
  }

  bind() { }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    this.render();
    this.bind();
    return this._element.firstElementChild;
  }

}
