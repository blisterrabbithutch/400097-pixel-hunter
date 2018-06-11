import {getElementsFromMarkup} from './utils.js';
import {showScreen} from './main.js';
import secondGameScreen from './second-game-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {initialState, levels} from './data.js';
import getGreetingScreenElement from './greeting-screen.js';


//здесь вместо экспортирования дом элемента нужно написать функцию принимающую данные и возвращающий дом элемент

const template = (level) => `
  <main class="central">
    <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${level.cards[0].cardContent}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${level.cards[1].cardContent}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        ${new Array(level.levelOrder).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
        <!--<li class="stats__result stats__result&#45;&#45;wrong"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;slow"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;fast"></li>-->
        <!--<li class="stats__result stats__result&#45;&#45;correct"></li>-->
      </ul>
    </div>
  </div>
  ${getFooter().outerHTML}
  </main>
`;
export default () => {
  const el = getElementsFromMarkup(template(levels[0]));
  el.insertAdjacentElement(`afterbegin`, getHeader(initialState));
  const formEl = el.querySelector(`.game__content`);
  const firstCardRadioInputs = formEl.elements.question1;
  const secondCardRadioInputs = formEl.elements.question2;
  const form = el.querySelector(`.game__content`);
  form.addEventListener(`change`, function () {
    if (firstCardRadioInputs.value && secondCardRadioInputs.value) {
      showScreen(secondGameScreen());
    }
  });
  return el;
};
