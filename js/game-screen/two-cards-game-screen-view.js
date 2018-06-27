import getFooterMarkup from './../footer.js';
import AbstractView from './../abstract-view.js';
import {getLevelProgressBar} from './../utils.js';

export default class TwoCardsGameScreenView extends AbstractView {
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
          <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
          <form class="game__content">
          ${(this.currentLevel).answers.map((card, i) => {
    return `<div class="game__option">
            <img src="${card.image.url}" alt="Option 1" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input name="${`question` + (i + 1)}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name="${`question` + (i + 1)}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
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
    const form = this.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    const secondCardRadioInputs = form.elements.question2;
    form.addEventListener(`change`, () => {
      if (firstCardRadioInputs.value && secondCardRadioInputs.value) {
        this.onAnswer();
      }
    });
  }

}
