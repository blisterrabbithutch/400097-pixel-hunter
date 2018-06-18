import MainScreenView from './main-screen.js';
import showScreen from './showscreen-function.js';
import getGreetingScreen from './greeting-screen.js';

const mainScreenView = new MainScreenView();
mainScreenView.onClick = () => {
  showScreen(getGreetingScreen().element);
};
showScreen(mainScreenView.element);
