import getMainScreenElement from './main-screen.js';
import {getGameScreen} from './first-game-screen.js';
import {initialState, levels} from './data.js';

const bodyTag = document.querySelector(`body`);

const showScreen = (el) => {
  const oldScreen = bodyTag.querySelector(`.central`);
  bodyTag.replaceChild(el, oldScreen);
};
//showScreen(getMainScreenElement());
showScreen(getGameScreen(levels[0], initialState));
export {showScreen};
