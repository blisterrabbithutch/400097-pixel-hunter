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
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = this.template();
    return wrapper.firstElementChild;
  }

  bind() { }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }

}
