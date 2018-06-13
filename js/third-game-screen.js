import {getGameScreen} from './first-game-screen.js';
import {getSecondGameScreen} from './second-game-screen.js';
import getStatsScreenElement from './stats-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import {levels, answers, userState} from './data.js';

const threeCardsGrid = (level) => {
  let string = ``;
  for (let i = 0; i < level.cards.length; i++) {
    string += `<div class="game__option">
                 <img src="${level.cards[i].cardContent}" alt="Option 1" width="304" height="455">
               </div>`;
  }
  return string;
};

const template = (level) => `
  <main class="central">
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${threeCardsGrid(level)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getLevelProgressBar(answers)}
      </ul>
    </div>
  </div>
  ${getFooter()}
  </main>`;

const getThirdGameScreen = (data, state) => {
  const el = getElementFromTemplate(template(data));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  const formEl = el.querySelector(`.game__content`);
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  formEl.addEventListener(`click`, function (evt) {
    if (evt.target.classList.contains(`game__option`)) {
      const firstCardIsPhoto = data.cards[0].answers.photo;
      const firstCardIsPaint = data.cards[0].answers.paint;
      const secondCardIsPhoto = data.cards[1].answers.photo;
      const secondCardIsPaint = data.cards[1].answers.paint;
      const thirdCardIsPhoto = data.cards[2].answers.photo;
      const thirdCardIsPaint = data.cards[2].answers.paint;
      const findDifferentCard = (firstPhoto, firstPaint, secondPhoto, secondPaint, thirdPhoto, thirdPaint) => {
        if (firstPhoto !== secondPhoto && firstPhoto !== thirdPhoto || firstPaint !== secondPaint && firstPaint !== thirdPaint) {
          return `first image different`;
        } else if (secondPhoto !== firstPhoto && secondPhoto !== thirdPhoto || secondPaint !== firstPaint && secondPaint !== thirdPaint) {
          return `second image different`;
        } else if (thirdPhoto !== firstPhoto && thirdPhoto !== firstPhoto || thirdPaint !== firstPaint && thirdPaint !== firstPaint) {
          return `third image different`;
        }
        return false;
      };
      let answerOnCard = {};
      const addLevelResult = () => {
        if ((evt.target === document.querySelector(`.game__option:first-child`) && findDifferentCard(firstCardIsPhoto, firstCardIsPaint, secondCardIsPhoto, secondCardIsPaint, thirdCardIsPhoto, thirdCardIsPaint) === `first image different`) || (evt.target === document.querySelector(`.game__option:nth-child(2)`) && findDifferentCard(firstCardIsPhoto, firstCardIsPaint, secondCardIsPhoto, secondCardIsPaint, thirdCardIsPhoto, thirdCardIsPaint) === `second image different`) || (evt.target === document.querySelector(`.game__option:nth-child(3)`) && findDifferentCard(firstCardIsPhoto, firstCardIsPaint, secondCardIsPhoto, secondCardIsPaint, thirdCardIsPhoto, thirdCardIsPaint) === `third image different`)) {
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
      if (levels[numberOfScreen + 1].levelType === `one-card` && userState.lives > 0) {
        showScreen(getSecondGameScreen(levels[numberOfScreen + 1], userState));
      } else if (levels[numberOfScreen + 1].levelType === `two-cards` && userState.lives > 0) {
        showScreen(getGameScreen(levels[numberOfScreen + 1], userState));
      } else {
        showScreen(getStatsScreenElement(answers, userState));
      }
    }
  });

  return el;
};
export {getThirdGameScreen};
