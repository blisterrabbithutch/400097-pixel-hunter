import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import {getThreeCardsGameScreen} from './three-cards-game-screen.js';
import {getTwoCardsGameScreen} from './two-cards-game-screen.js';
import getStatsScreenElement from './stats-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {levels, answers, userState} from './data.js';

const template = (level) => `
  <main class="central">
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      ${level.cards.map((card, i) => {
      return `<div class="game__option">
                <img src="${level.cards[0].cardContent}" alt="Option 1" width="705" height="455">
                <label class="game__answer  game__answer--photo">
                  <input name="question1" type="radio" value="photo">
                  <span>Фото</span>
                </label>
                <label class="game__answer  game__answer--wide  game__answer--paint">
                  <input name="question1" type="radio" value="paint">
                  <span>Рисунок</span>
                </label>
              </div>`;}).join(``)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getLevelProgressBar(answers)}
      </ul>
    </div>
  </div>
  ${getFooter()}
  </main>`;

const getOneCardGameScreen = (data, state) => {
  const el = getElementFromTemplate(template(data));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  const formEl = el.querySelector(`.game__content`);
  const firstCardRadioInputs = formEl.elements.question1;
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const nextLevel = levels[numberOfScreen + 1];
  const cardEl = el.querySelector(`.game__option`);
  cardEl.addEventListener(`change`, function () {
    const addLevelResult = () => {
      let answerOnCard = {};
      if (firstCardRadioInputs.value === data.cards[0].rightAnswer) {
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
    answers.push(addLevelResult());
    if (nextLevel.levelType === `three-cards` && userState.lives > 0) {
      showScreen(getThreeCardsGameScreen(nextLevel, userState));
    } else if (nextLevel.levelType === `two-cards` && userState.lives > 0) {
      showScreen(getTwoCardsGameScreen(nextLevel, userState));
    } else {
      showScreen(getStatsScreenElement(answers, userState));
    }
  });
  return el;
};
export {getOneCardGameScreen};
