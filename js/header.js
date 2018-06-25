import {getElementFromTemplate} from './utils.js';
import getGreetingScreenElement from './greeting-screen/greeting-screen.js';
import Application from './application.js';
import AbstractView from './abstract-view.js';

//const template = (state) => `
//  <header class="header">
//    <div class="header__back">
//      <button class="back">
//        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
//        <img src="img/logo_small.svg" width="101" height="44">
//      </button>
//    </div>
//    <h1 class="game__timer">${state.time}</h1>
//    <div class="game__lives">
//      ${new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
//      ${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
//    </div>
//  </header>
//`;

//export default (data) => {
//  const el = getElementFromTemplate(template(data));
//  const backButton = el.querySelector(`.back`);
//  backButton.addEventListener(`click`, function () {
//    getGreetingScreenElement();
//  });
//
//  return el;
//};

export default class Header extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  template() {
    return `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
        <h1 class="game__timer">${this.state.time}</h1>
        <div class="game__lives">
          ${new Array(3 - this.state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
          ${new Array(this.state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
        </div>
      </header>`;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`click`, function () {
      Application.showGreeting();
    });
  }

  updateTime(time) {
    this._timeEl = this.element.querySelector(`.game__timer`);
    const formattedTime = time;
    this._timeEl.textContent = formattedTime;
  }
}
