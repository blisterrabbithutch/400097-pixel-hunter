import {userState} from './utils.js';
import showScreen from './showscreen-function.js';
import getGreetingScreen from './greeting-screen.js';
import {getTwoCardsGameScreenView} from './game-screen.js';
import RulesScreenView from './rules-screen-view.js';
import {levels} from './data.js';

export default () => {
  const rulesScreenView = new RulesScreenView();
  rulesScreenView.onFormSubmit = () => {
    showScreen(getTwoCardsGameScreenView(levels[0], userState).element);
  };
  rulesScreenView.onBackButton = () => {
    showScreen(getGreetingScreen().element);
  };
  return rulesScreenView;
};
