import getFooterMarkup from './footer.js';
import AbstractView from './abstract-view.js';
import getGreetingScreen from './greeting-screen.js';
import showScreen from './showscreen-function.js';

class MainScreenView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  template() {
    return `
      <main class="central">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
        ${getFooterMarkup()}
      </main>`;
  }

  onClick() { }

  bind() {
    this.element.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
      this.onClick();
    });
  }

}

export default () => {
  const mainScreenView = new MainScreenView();
  mainScreenView.onClick = () => {
    getGreetingScreen();
  };
  return showScreen(mainScreenView.element);
};

