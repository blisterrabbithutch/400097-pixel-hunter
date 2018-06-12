import getMainScreenElement from './main-screen.js';
import {getGameScreen} from './first-game-screen.js';
import getStatsScreenElement from './stats-screen.js';
import {getElementFromTemplate} from './utils.js';
import {initialState, levels} from './data.js';

const pageContainer = document.querySelector(`.central`);
const bodyTag = document.querySelector(`body`);

const showScreen = (el) => {
  const oldScreen = bodyTag.querySelector('.central');
  bodyTag.replaceChild(el, oldScreen);
};
showScreen(getMainScreenElement());

export {showScreen};
