import {getElementFromTemplate} from './utils.js';
import {showScreen} from './main.js';
import secondGameScreen from './second-game-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import getStatsScreenElement from './stats-screen.js';
import {initialState, levels} from './data.js';
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
                 <img src="${level.cards[0].cardContent}" alt="Option 1" width="304" height="455">
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
        ${new Array(level.levelOrder).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
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
        ${new Array(level.levelOrder).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
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
        ${new Array(level.levelOrder).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
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
//export default () => {
//  let levelNumber = 0;
//  const el = getElementFromTemplate(template(levels[levelNumber], initialState));
//
//  el.insertAdjacentElement(`afterbegin`, getHeader(initialState));
//  const formEl = el.querySelector(`.game__content`);
//  const firstCardRadioInputs = formEl.elements.question1;
//  const secondCardRadioInputs = formEl.elements.question2;
//  const form = el.querySelector(`.game__content`);
//  form.addEventListener(`change`, function () {
//    if (firstCardRadioInputs.value && secondCardRadioInputs.value) {
//
//      if (levels[levelNumber + 1]) {
//        console.log(levels[levelNumber + 1]);
//        showScreen( getElementFromTemplate(template(levels[levelNumber + 1], initialState)) );
//
//        if ((levels[levelNumber + 1]).levelType == 'one-card') {
//          form.addEventListener(`change`, function () {
//            showScreen( getElementFromTemplate(template(levels[levelNumber + 1], initialState)) );
//          });
//        }
//      }
//      else {
//        showScreen(getStatsScreenElement());
//      }
//    }
//  });
//  return el;
//};
const getGameScreen = (data, state) => {
  const el = getElementFromTemplate(template(data, state));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  const formEl = el.querySelector(`.game__content`);
  const firstCardRadioInputs = formEl.elements.question1;
  const secondCardRadioInputs = formEl.elements.question2;
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const form = el.querySelector(`.game__content`);
  //if  тип экрана === такой, то вешаем событие на форму чейндж
  if (data.levelType == 'two-cards') {
    form.addEventListener(`change`, function () {
      if (firstCardRadioInputs.value && secondCardRadioInputs.value) {
        if (levels[numberOfScreen + 1]) {
          showScreen(getGameScreen(levels[numberOfScreen + 1], initialState));
        } else {
          showScreen(getStatsScreenElement());
        }
      }
    });
  } else if (data.levelType == 'one-card') {
    const cardEl = el.querySelector(`.game__option`);
    cardEl.addEventListener(`change`, function () {
      if (levels[numberOfScreen + 1]) {
        showScreen(getGameScreen(levels[numberOfScreen + 1], initialState));
      } else {
        showScreen(getStatsScreenElement());
      }
    });
  } else if (data.levelType == 'three-cards') {
    formEl.addEventListener(`click`, function (evt) {
      if (evt.target.classList.contains(`game__option`)) {
        if (levels[numberOfScreen + 1]) {
          showScreen(getGameScreen(levels[numberOfScreen + 1], initialState));
        } else {
          showScreen(getStatsScreenElement());
        }
      }
    });
  }
  return el;
};

export {getGameScreen};
