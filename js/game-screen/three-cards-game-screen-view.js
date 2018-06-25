import getFooterMarkup from './../footer.js';
import AbstractView from './../abstract-view.js';
import {getLevelProgressBar} from './../utils.js';

export default class ThreeCardsGameScreenView extends AbstractView {
  constructor(currentLevel, state, answersProgress) {
    super();
    this.currentLevel = currentLevel;
    this.state = state;
    this.answersProgress = answersProgress;
  }

  template() {
    return `
      <main class="central">
        <div class="game">
          <p class="game__task">Найдите рисунок среди изображений</p>
          <form class="game__content  game__content--triple">
        ${this.currentLevel.cards.map((card) => {
    return `<div class="game__option">
                    <img src="${card.cardContent}" alt="Option 1" width="304" height="455">
                  </div>`;
  }).join(``)}
          </form>
          <div class="stats">
            <ul class="stats">
              ${getLevelProgressBar(this.answersProgress)}
            </ul>
          </div>
        </div>
        ${getFooterMarkup()}
      </main>`;
  }

  onAnswer() { }

  bind() {
    const formEl = this.element.querySelector(`.game__content`);
    formEl.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        this.onAnswer(evt);
      }
    });
  }

}