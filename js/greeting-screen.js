import showScreen from './showscreen-function.js';
import getRulesScreenElement from './rules-screen.js';
import GetGreetingScreenView from './greeting-screen-view.js';

export default () => {
  const greetingScreenView = new GetGreetingScreenView();
  greetingScreenView.onClick = () => {
    showScreen(getRulesScreenElement().element);
  };
  return greetingScreenView;
};
