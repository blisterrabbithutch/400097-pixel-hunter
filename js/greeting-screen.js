import showScreen from './showscreen-function.js';
import rulesScreen from './rules-screen.js';
import GreetingScreenView from './greeting-screen-view.js';

export default () => {
  const greetingScreenView = new GreetingScreenView();
  greetingScreenView.onClick = () => {
    rulesScreen();
  };
  return showScreen(greetingScreenView.element);
};
