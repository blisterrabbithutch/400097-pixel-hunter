import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import getStatsScreenElement from './stats-screen.js';
import {levels, answers, userState} from './data.js';
import {getSecondGameScreen} from './second-game-screen.js';
import {getThirdGameScreen} from './third-game-screen.js';

const twoCardsGrid = (level) => {
  let string = ``;
  for (let i = 0; i < level.cards.length; i++) {
    string += `<div class="game__option">
      <img src="${level.cards[i].cardContent}" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input name=${`question` + (i + 1)} type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name=${`question` + (i + 1)} type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;
  }
  return string;
};

const template = (level) => `
  <main class="central">
    <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
    ${twoCardsGrid(level)}
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
  const form = el.querySelector(`.game__content`);
  const leftCardIsPhoto = data.cards[0].answers.photo;
  const leftCardIsPaint = data.cards[0].answers.paint;
  const rightCardIsPhoto = data.cards[1].answers.photo;
  const rightCardIsPaint = data.cards[1].answers.paint;
  const cardAnswerStringPhoto = `photo`;
  const cardAnswerStringPaint = `paint`;
  const cardAnswer = (photoAnswer, paintAnswer) => {
    if (photoAnswer) {
      return cardAnswerStringPhoto;
    } else if (paintAnswer) {
      return cardAnswerStringPaint;
    }
    return 0;
  };
  form.addEventListener(`change`, function () {
    if (firstCardRadioInputs.value && secondCardRadioInputs.value) {

      const addLevelResult = () => {
        let answerOnCard = {};
        if (firstCardRadioInputs.value === cardAnswer(leftCardIsPhoto, leftCardIsPaint) && secondCardRadioInputs.value === cardAnswer(rightCardIsPhoto, rightCardIsPaint)) {

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

      if (levels[numberOfScreen + 1] && userState.lives > 0) {
        if (levels[numberOfScreen + 1].levelType === `one-card`) {
          showScreen(getSecondGameScreen(levels[numberOfScreen + 1], userState));
        } else if (levels[numberOfScreen + 1].levelType === `three-cards`) {
          showScreen(getThirdGameScreen(levels[numberOfScreen + 1], userState));
        }
      } else {
        showScreen(getStatsScreenElement(answers, userState));
      }
    }
  });
  return el;
};

export {getGameScreen};
