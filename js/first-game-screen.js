import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import getStatsScreenElement from './stats-screen.js';
import {levels, answers, userState} from './data.js';
import {getSecondGameScreen} from './second-game-screen.js';
import {getThirdGameScreen} from './third-game-screen.js';
//const twoCardsGrid = (level) => {
//  let string = ``;
//  for (let i = 0; i < level.cards.length; i++) {
//    string += `<div class="game__option">
//      <img src="${level.cards[i].cardContent}" alt="Option 1" width="468" height="458">
//      <label class="game__answer game__answer--photo">
//        <input name=${`question` + (i + 1)} type="radio" value="photo">
//        <span>Фото</span>
//      </label>
//      <label class="game__answer game__answer--paint">
//        <input name=${`question` + (i + 1)} type="radio" value="paint">
//        <span>Рисунок</span>
//      </label>
//    </div>`;
//  }
//  return string;
//};

const template = (level) => `
  <main class="central">
    <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
    ${level.cards.map((card, i) => {
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
    </div>`;}).join(``)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getLevelProgressBar(answers)}
      </ul>
    </div>
  </div>
  ${getFooter()}
  </main>
  `;

const getGameScreen = (data, state) => {
  const el = getElementFromTemplate(template(data));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  const formEl = el.querySelector(`.game__content`);
  const firstCardRadioInputs = formEl.elements.question1;
  const secondCardRadioInputs = formEl.elements.question2;
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const nextLevel = levels[numberOfScreen + 1];
  const form = el.querySelector(`.game__content`);
  form.addEventListener(`change`, function () {
    if (firstCardRadioInputs.value && secondCardRadioInputs.value) {
      const addLevelResult = () => {
        let answerOnCard = {};
        if (firstCardRadioInputs.value === data.cards[0].rightAnswer && secondCardRadioInputs.value === data.cards[1].rightAnswer) {
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
      if (nextLevel && userState.lives > 0) {
        if (nextLevel.levelType === `one-card`) {
          showScreen(getSecondGameScreen(nextLevel, userState));
        } else if (nextLevel.levelType === `three-cards`) {
          showScreen(getThirdGameScreen(nextLevel, userState));
        }
      } else {
        showScreen(getStatsScreenElement(answers, userState));
      }
    }
  });
  return el;
};

export {getGameScreen};
