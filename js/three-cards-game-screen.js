import {getTwoCardsGameScreen} from './two-cards-game-screen.js';
import {getOneCardGameScreen} from './one-card-game-screen.js';
import getStatsScreenElement from './stats-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import {levels, answers, userState} from './data.js';

const findDifferentCard = (firstCard, secondCard, thirdCard) => {
  if (firstCard !== secondCard && firstCard !== thirdCard) {
    return `first image different`;
  } else if (secondCard !== firstCard && secondCard !== thirdCard) {
    return `second image different`;
  } else if (thirdCard !== firstCard && thirdCard !== firstCard) {
    return `third image different`;
  }
  throw new Error(`Incorrect type of parameters. (need paint or photo string)`);
};

const addLevelResult = (evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer) => {
  let answerOnCard = {};
  if ((evt.target === document.querySelector(`.game__option:first-child`) && findDifferentCard(firstCardAnswer, secondCardAnswer, thirdCardAnswer) === `first image different`) || (evt.target === document.querySelector(`.game__option:nth-child(2)`) && findDifferentCard(firstCardAnswer, secondCardAnswer, thirdCardAnswer) === `second image different`) || (evt.target === document.querySelector(`.game__option:nth-child(3)`) && findDifferentCard(firstCardAnswer, secondCardAnswer, thirdCardAnswer) === `third image different`)) {
    answerOnCard = {
      time: 15000,
      solved: true
    };
  } else {
    userState.lives = userState.lives - 1;
    answerOnCard = {
      time: 15000,
      solved: false
    };
  }
  return answerOnCard;
};

const checkSelectedAnswer = (evt, data, firstCardAnswer, secondCardAnswer, thirdCardAnswer) => {
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const nextLevel = levels[numberOfScreen + 1];
  answers.push(addLevelResult(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer));
  if (nextLevel.levelType === `one-card` && userState.lives > 0) {
    showScreen(getOneCardGameScreen(nextLevel, userState));
  } else if (nextLevel.levelType === `two-cards` && userState.lives > 0) {
    showScreen(getTwoCardsGameScreen(nextLevel, userState));
  } else {
    showScreen(getStatsScreenElement(answers, userState));
  }
};

const template = (level) => `
  <main class="central">
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
  ${level.cards.map((card) => {
    return `<div class="game__option">
              <img src="${card.cardContent}" alt="Option 1" width="304" height="455">
            </div>`;
  }).join(``)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getLevelProgressBar(answers)}
      </ul>
    </div>
  </div>
  ${getFooter()}
  </main>`;

const getThreeCardsGameScreen = (data, state) => {
  const el = getElementFromTemplate(template(data));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  const formEl = el.querySelector(`.game__content`);
  const firstCardAnswer = data.cards[0].rightAnswer;
  const secondCardAnswer = data.cards[1].rightAnswer;
  const thirdCardAnswer = data.cards[2].rightAnswer;
  formEl.addEventListener(`click`, function (evt) {
    if (evt.target.classList.contains(`game__option`)) {
      checkSelectedAnswer(evt, data, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
    }
  });

  return el;
};
export {getThreeCardsGameScreen};
