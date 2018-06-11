import {getElementFromTemplate} from './utils.js';
import {showScreen} from './main.js';
import getRulesScreenElement from './rules-screen.js';
import getHeader from './header.js';
import getFooter from './footer.js';
import {initialState, levels} from './data.js';

const template = `
  <main class="central">
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
  <div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">
      <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
      <p>Правила игры просты.<br>
        Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
        Задача кажется тривиальной, но не думай, что все так просто.<br>
        Фотореализм обманчив и коварен.<br>
        Помни, главное — смотреть очень внимательно.</p>
    </div>
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>
  ${getFooter().outerHTML}
  </main>
`;
export default () => {
  const el = getElementFromTemplate(template);

  el.querySelector(`.greeting__continue`).addEventListener(`click`, function () {
    showScreen(getRulesScreenElement());
  });

  return el;
};
