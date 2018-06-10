import {getElementsFromMarkup} from './utils.js';
import {showScreen} from './main.js';
import getStatsScreen from './stats-screen.js';
import getGreetingScreenElement from './greeting-screen.js';

const template = `
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>
`;
export default () => {
  const el = getElementsFromMarkup(template);
  const formEl = el.querySelector(`.game__content`);
  formEl.addEventListener(`click`, function (evt) {
    if (evt.target.classList.contains(`game__option`)) {
      showScreen(getStatsScreen());
    }
  });

  //const backButton = el.querySelector(`.back`);
  //backButton.addEventListener(`click`, function () {
  //  showScreen(getGreetingScreenElement());
  //});

  return el;
};
