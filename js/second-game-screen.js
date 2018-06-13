import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import {getThirdGameScreen} from './third-game-screen.js';
import {getGameScreen} from './first-game-screen.js';
import getStatsScreenElement from './stats-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {levels, answers, userState} from './data.js';

const oneCardGrid = (level) => {
  let string = ``;
  for (let i = 0; i < level.cards.length; i++) {
    string += `<div class="game__option">
                 <img src="${level.cards[0].cardContent}" alt="Option 1" width="705" height="455">
                 <label class="game__answer  game__answer--photo">
                   <input name="question1" type="radio" value="photo">
                   <span>Фото</span>
                 </label>
                 <label class="game__answer  game__answer--wide  game__answer--paint">
                   <input name="question1" type="radio" value="paint">
                   <span>Рисунок</span>
                 </label>
               </div>`;
  }
  return string;
};

const template = (level) => `
  <main class="central">
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      ${oneCardGrid(level)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getLevelProgressBar(answers)}
      </ul>
    </div>
  </div>
  ${getFooter()}
  </main>`;

const getSecondGameScreen = (data, state) => {
  const el = getElementFromTemplate(template(data));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  const formEl = el.querySelector(`.game__content`);
  const firstCardRadioInputs = formEl.elements.question1;
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const cardEl = el.querySelector(`.game__option`);
  const cardIsPhoto = data.cards[0].answers.photo;
  const cardIsPaint = data.cards[0].answers.paint;
  const cardAnswerStringPhoto = `photo`;
  const cardAnswerStringPaint = `paint`;
  const cardAnswer = (photoAnswer, paintAnswer) => {
    if (photoAnswer) {
      return cardAnswerStringPhoto;
    } else if (paintAnswer) {
      return cardAnswerStringPaint;
    }
    throw new Error(`Incorrect type of parameters. (paint or photo string)`);
  };
  cardEl.addEventListener(`change`, function () {

    const addLevelResult = () => {
      let answerOnCard = {};
      if (firstCardRadioInputs.value === cardAnswer(cardIsPhoto, cardIsPaint)) {

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

    if (levels[numberOfScreen + 1].levelType === `three-cards` && userState.lives > 0) {
      showScreen(getThirdGameScreen(levels[numberOfScreen + 1], userState));
    } else if (levels[numberOfScreen + 1].levelType === `two-cards` && userState.lives > 0) {
      showScreen(getGameScreen(levels[numberOfScreen + 1], userState));
    } else {
      showScreen(getStatsScreenElement(answers, userState));
    }
  });

  return el;
};
export {getSecondGameScreen};
