import showScreen from './showscreen-function.js';
import getGreetingScreen from './greeting-screen.js';
import RulesScreenView from './rules-screen-view.js';
import {levels} from './data.js';
import {showGameScreen} from './utils.js';

export default () => {
  const rulesScreenView = new RulesScreenView();
  rulesScreenView.onFormSubmit = () => {
    showGameScreen(levels[0]);
  };
  rulesScreenView.onBackButton = () => {
    showScreen(getGreetingScreen().element);
  };
  return rulesScreenView;
};
