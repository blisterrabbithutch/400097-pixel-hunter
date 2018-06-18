import showScreen from './showscreen-function.js';
import getFooterMarkup from './footer.js';
import AbstractView from './abstract-view.js';
import getRulesScreenView from './rules-screen.js';
import {createUserdata} from './utils.js';
import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import enterNextLevel from './enter-next-level.js';
import getHeader from './header.js';
import {userState} from './utils.js';
import {AnswerTime} from './enums.js';

const handleResultOfLevel = (currentLevel, firstCardInputsValue, secondCardInputsValue) => {
  let answerIsSolved;
  if (firstCardInputsValue === currentLevel.cards[0].rightAnswer && secondCardInputsValue === currentLevel.cards[1].rightAnswer) {
    answerIsSolved = true;
  } else {
    userState.lives = userState.lives - 1;
    answerIsSolved = false;
  }
  let answerOnCard = {
    time: AnswerTime.NORMAL,
    solved: answerIsSolved
  };
  userState.answers.push(answerOnCard);
  return answerOnCard;
};

export default class TwoCardsGameScreenView extends AbstractView {
  constructor(currentLevel, state) {
    super();
    this.currentLevel = currentLevel;
    this.state = state;
  }

  template() {
    return `
        <main class="central">
          <div class="game">
          <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
          <form class="game__content">
          ${(this.currentLevel).cards.map((card, i) => {
          return `<div class="game__option">
            <img src="${card.cardContent}" alt="Option 1" width="468" height="458">
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
              ${getLevelProgressBar(userState.answers)}
            </ul>
          </div>
        </div>
        ${getFooterMarkup()}
        </main>`;
  }

  onAnswer() { }

  bind(currentLevel, state) {
    this.element.insertAdjacentElement(`afterbegin`, getHeader(this.state));
    const form = this.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    const secondCardRadioInputs = form.elements.question2;
    form.addEventListener(`change`, () => {
      if (firstCardRadioInputs.value && secondCardRadioInputs.value) {
        handleResultOfLevel(currentLevel, firstCardRadioInputs.value, secondCardRadioInputs.value);
        //enterNextLevel(data);
        this.onAnswer();
      }
    });
  }

}
