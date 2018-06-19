import getFooterMarkup from './footer.js';
import AbstractView from './abstract-view.js';
import {getLevelProgressBar} from './utils.js';
import enterNextLevel from './enter-next-level.js';
import getHeader from './header.js';
import {userState} from './utils.js';
import {AnswerTime} from './enums.js';

const findDifferentCard = (firstCard, secondCard, thirdCard) => {
  const firstCardEl = document.querySelector(`.game__option:first-child`);
  const secondCardEl = document.querySelector(`.game__option:nth-child(2)`);
  const thirdCardEl = document.querySelector(`.game__option:nth-child(3)`);
  if (firstCard !== secondCard && firstCard !== thirdCard) {
    return firstCardEl;
  } else if (secondCard !== firstCard && secondCard !== thirdCard) {
    return secondCardEl;
  } else if (thirdCard !== firstCard && thirdCard !== firstCard) {
    return thirdCardEl;
  }
  throw new Error(`Incorrect type of parameters. (need paint or photo string)`);
};

const handleResultOfLevel = (evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer) => {
  let answerIsSolved;
  if (evt.target === findDifferentCard(firstCardAnswer, secondCardAnswer, thirdCardAnswer)) {
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

export default class ThreeCardsGameScreenView extends AbstractView {
  constructor(currentLevel, state) {
    super();
    this.currentLevel = currentLevel;
    this.state = state;
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
              ${getLevelProgressBar(userState.answers)}
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
    const firstCardAnswer = this.currentLevel.cards[0].rightAnswer;
    const secondCardAnswer = this.currentLevel.cards[1].rightAnswer;
    const thirdCardAnswer = this.currentLevel.cards[2].rightAnswer;
    formEl.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        handleResultOfLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
        enterNextLevel(this.currentLevel);
      }
    });
  }

}
