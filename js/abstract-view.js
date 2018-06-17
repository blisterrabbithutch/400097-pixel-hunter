const render = (html) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = html.trim();
  return wrapper;
};

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

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    this._element.innerHTML = this.render();
    this.bind();
    return this._element.firstElementChild;
  }

  render() {
    return render(this.template);
  }

  bind() { }
}
