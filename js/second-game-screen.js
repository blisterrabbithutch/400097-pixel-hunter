import {getElementFromTemplate} from './utils.js';
import {showScreen} from './main.js';
import getThirdGameScreen from './third-game-screen.js';
import getGreetingScreenElement from './greeting-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {initialState, levels} from './data.js';

const template = (level) => `
  <main class="central">
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${level.cards[0].cardContent}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
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
export default () => {
  const el = getElementsFromMarkup(template(levels[1]));
  el.insertAdjacentElement(`afterbegin`, getHeader(initialState));
  const cardEl = el.querySelector(`.game__option`);
  cardEl.addEventListener(`change`, function () {
    showScreen(getThirdGameScreen());
  });
  return el;
};
