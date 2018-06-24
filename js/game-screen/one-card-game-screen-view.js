import getFooterMarkup from './../footer.js';
import AbstractView from './../abstract-view.js';
import {getLevelProgressBar} from './../utils.js';
import getHeader from './../header.js';
import {userState} from './../utils.js';

export default class OneCardGameScreenView extends AbstractView {
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
          <p class="game__task">Угадай, фото или рисунок?</p>
          <form class="game__content  game__content--wide">
            <div class="game__option">
              <img src="${(this.currentLevel).cards[0].cardContent}" alt="Option 1" width="705" height="455">
              <label class="game__answer  game__answer--photo">
                <input name="question1" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--wide  game__answer--paint">
                <input name="question1" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>
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
    this.element.insertAdjacentElement(`afterbegin`, getHeader(this.state));
    const formEl = this.element.querySelector(`.game__content`);
    const cardEl = this.element.querySelector(`.game__option`);
    cardEl.addEventListener(`change`, () => {
      this.onAnswer();
    });
  }

}
