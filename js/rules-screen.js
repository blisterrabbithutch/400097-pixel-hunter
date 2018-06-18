import {getElementFromTemplate, userState, createUserdata} from './utils.js';
import showScreen from './showscreen-function.js';
import getGreetingScreen from './greeting-screen.js';
import getTwoCardsGameScreen from './two-cards-game-screen.js';
import RulesScreenView from './rules-screen-view.js';
import getFooterMarkup from './footer.js';
import {levels} from './data.js';

export default () => {
  const rulesScreenView = new RulesScreenView();
  rulesScreenView.onFormSubmit = () => {
    //может сюда вставить логику перехода
    //создать объект
    showScreen(getTwoCardsGameScreen(levels[0], userState).element);
  };
  rulesScreenView.onBackButton = () => {
    showScreen(getGreetingScreen().element);
  };
  return rulesScreenView;
};
