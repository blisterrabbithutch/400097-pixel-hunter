import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import secondGameScreen from './second-game-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import getStatsScreenElement from './stats-screen.js';
import {initialState, levels, answers, userState} from './data.js';
import getGreetingScreenElement from './greeting-screen.js';

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

const threeCardsGrid = (level) => {
  let string = ``;
  for (let i = 0; i < level.cards.length; i++) {
    string += `<div class="game__option">
                 <img src="${level.cards[i].cardContent}" alt="Option 1" width="304" height="455">
               </div>`;
  }
  return string;
};

const template = (level, state) => {
  const twoCardsTemplate = `
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
  ${getFooter().outerHTML}
  </main>
  `;
  const oneCardTemplate = `
  <main class="central">
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      ${oneCardGrid(level)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${getLevelProgressBar(answers)}
        <!--<li class="stats__result stats__result&#45;&#45;wrong"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;slow"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;fast"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;correct"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;wrong"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;unknown"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;slow"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;unknown"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;fast"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;unknown"></li>-->
      </ul>
    </div>
  </div>
  ${getFooter().outerHTML}
  </main>
  `;
  const threeCardsTemplate = `
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
  ${getFooter().outerHTML}
  </main>
  `;
  if (level.levelType === `one-card`) {
    return oneCardTemplate;
  }
  else if (level.levelType === `two-cards`) {
    return twoCardsTemplate;
  }
  else if (level.levelType === `three-cards`) {
    return threeCardsTemplate;
  }
  return `Bad Case`;
};

const getGameScreen = (data, state) => {
  const el = getElementFromTemplate(template(data, state));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  const formEl = el.querySelector(`.game__content`);
  const firstCardRadioInputs = formEl.elements.question1;
  const secondCardRadioInputs = formEl.elements.question2;
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const form = el.querySelector(`.game__content`);
  if (data.levelType == 'two-cards') {
    form.addEventListener(`change`, function () {
      if (firstCardRadioInputs.value && secondCardRadioInputs.value) {
        //здесь логика оценки ответа
        const leftCardIsPhoto = data.cards[0].answers.photo;
        const leftCardIsPaint = data.cards[0].answers.paint;
        const rightCardIsPhoto = data.cards[1].answers.photo;
        const rightCardIsPaint = data.cards[1].answers.paint;
        const cardAnswer = (photoAnswer, paintAnswer) => {
          if (photoAnswer) {
            return `photo`;
          } else if (paintAnswer) {
            return `paint`;
          }
          return 0;
        };

        const returnLevelResult = () => {
          let answerOnCard = {};
          if (firstCardRadioInputs.value === cardAnswer(leftCardIsPhoto, leftCardIsPaint) && secondCardRadioInputs.value === cardAnswer(rightCardIsPhoto, rightCardIsPaint)) {
            //    сюда надо записать правильный ответ в массив ответов. и время. создать объект
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
        answers.push(returnLevelResult());
        //конец логики оценки ответа
        if (levels[numberOfScreen + 1] && userState.lives > 0) {
          showScreen(getGameScreen(levels[numberOfScreen + 1], userState));
        } else {
          showScreen(getStatsScreenElement(answers, userState));
        }
      }
    });
  } else if (data.levelType == 'one-card') {
    const cardEl = el.querySelector(`.game__option`);
    cardEl.addEventListener(`change`, function () {
      //здесь логика оценки ответа
      const cardIsPhoto = data.cards[0].answers.photo;
      const cardIsPaint = data.cards[0].answers.paint;
      const cardAnswer = (photoAnswer, paintAnswer) => {
        if (photoAnswer) {
          return `photo`;
        } else if (paintAnswer) {
          return `paint`;
        }
        return 0;
      };
      const returnLevelResult = () => {
        let answerOnCard = {};
        if (firstCardRadioInputs.value === cardAnswer(cardIsPhoto, cardIsPaint)) {
          //    сюда надо записать правильный ответ в массив ответов. и время. создать объект
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
      answers.push(returnLevelResult());
      //конец логики оценки ответа
      if (levels[numberOfScreen + 1] && userState.lives > 0) {
        showScreen(getGameScreen(levels[numberOfScreen + 1], userState));
      } else {
        showScreen(getStatsScreenElement(answers, userState));
      }
    });
  } else if (data.levelType == 'three-cards') {
    const cardEl = el.querySelector(`.game__option`);
    formEl.addEventListener(`click`, function (evt) {
      if (evt.target.classList.contains(`game__option`)) {
        //здесь логика оценки ответа
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
          return 0;
        };

        let answerOnCard = {};
        const returnLevelResult = () => {

          if ((evt.target == document.querySelector(`.game__option:first-child`) && findDifferentCard(firstCardIsPhoto, firstCardIsPaint, secondCardIsPhoto, secondCardIsPaint, thirdCardIsPhoto, thirdCardIsPaint) == `first image different`) || (evt.target == document.querySelector(`.game__option:nth-child(2)`) && findDifferentCard(firstCardIsPhoto, firstCardIsPaint, secondCardIsPhoto, secondCardIsPaint, thirdCardIsPhoto, thirdCardIsPaint) == `second image different`) || (evt.target == document.querySelector(`.game__option:nth-child(3)`) && findDifferentCard(firstCardIsPhoto, firstCardIsPaint, secondCardIsPhoto, secondCardIsPaint, thirdCardIsPhoto, thirdCardIsPaint) == `third image different`)) {
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
        answers.push(returnLevelResult());
        //конец логики оценки ответа
        if (levels[numberOfScreen + 1] && userState.lives > 0) {
          showScreen(getGameScreen(levels[numberOfScreen + 1], userState));
        } else {
          showScreen(getStatsScreenElement(answers, userState));
        }
      }
    });
  }
  return el;
};

export {getGameScreen};
