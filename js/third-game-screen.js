import {getElementFromTemplate} from './utils.js';
import {showScreen} from './main.js';
import getStatsScreen from './stats-screen.js';
import getGreetingScreenElement from './greeting-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {initialState, levels} from './data.js';

const template = (level) => `
  <main class="central">
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${level.cards[0].cardContent}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${level.cards[1].cardContent}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${level.cards[2].cardContent}" alt="Option 1" width="304" height="455">
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
  const el = getElementsFromMarkup(template(levels[2]));
  el.insertAdjacentElement(`afterbegin`, getHeader(initialState));
  const formEl = el.querySelector(`.game__content`);
  formEl.addEventListener(`click`, function (evt) {
    if (evt.target.classList.contains(`game__option`)) {
      showScreen(getStatsScreen());
    }
  });
  return el;
};
