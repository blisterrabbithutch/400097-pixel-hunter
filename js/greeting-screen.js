import {getElementFromTemplate} from './utils.js';
import showScreen from './showscreen-function.js';
import getRulesScreenElement from './rules-screen.js';
import getFooterMarkup from './footer.js';
import GetGreetingScreenView from './greeting-screen-view.js';

export default () => {
  const arrowNext = new GetGreetingScreenView();

  arrowNext.onClick = () => {
    showScreen(getRulesScreenElement());
  };
};
