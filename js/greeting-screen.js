import showScreen from './showscreen-function.js';
import getRulesScreenElement from './rules-screen.js';
import GetGreetingScreenView from './greeting-screen-view.js';

export default () => {
  const greetingScreenView = new GetGreetingScreenView();
  greetingScreenView.onClick = () => {
    getRulesScreenElement();
  };
  return showScreen(greetingScreenView.element);
};
