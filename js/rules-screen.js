import showScreen from './showscreen-function.js';
import getGreetingScreen from './greeting-screen.js';
import RulesScreenView from './rules-screen-view.js';
import {levels} from './data.js';
import {showGameScreen, createUserdata} from './utils.js';

export default () => {
  const rulesScreenView = new RulesScreenView();
  rulesScreenView.onFormSubmit = () => {
    createUserdata();
    showGameScreen(levels[0]);
  };
  rulesScreenView.onBackButton = () => {
    getGreetingScreen();
  };
  return showScreen(rulesScreenView.element);
};
