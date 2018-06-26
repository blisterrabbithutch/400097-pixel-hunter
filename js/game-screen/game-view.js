import getFooterMarkup from '../footer.js';
import AbstractView from '../abstract-view.js';

export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  template() {
    return `
      <main class="central">
        <div class="game"></div>
        ${getFooterMarkup()}
      </main>`;
  }

  bind() { }

}
