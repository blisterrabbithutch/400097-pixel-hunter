import getHeader from './header.js';
import getFooterMarkup from './footer.js';
import {getElementFromTemplate, getLevelProgressBar, enterNextLevel} from './utils.js';
import {answers, userState} from './data.js';

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
  answers.push(answerOnCard);
  return answerOnCard;
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
  ${getFooterMarkup()}
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
      addLevelResult(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
      enterNextLevel(evt, data, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
    }
  });

  return el;
};
export {getThreeCardsGameScreen};
