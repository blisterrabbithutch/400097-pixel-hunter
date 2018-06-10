import getMainScreenElement from './main-screen.js';
import getFirstGameScreenElement from './first-game-screen.js';
import {getElementsFromMarkup} from './utils.js';
import {initialState, levels} from './data.js';

const pageContainer = document.querySelector(`.central`);

//const showScreen = (templateEl) => {
//  pageContainer.innerHTML = ``;
//  pageContainer.appendChild(templateEl);
//};

const showScreen = (templateEl) => {
  pageContainer.innerHTML = ``;
  pageContainer.appendChild(templateEl);
};

showScreen(getFirstGameScreenElement());



//game render

let game;

const startGame = () => {
  game = Object.assign({}, initialState);

  const gameContainerElement = getElementsFromMarkup();
  const headerElement = getElementsFromMarkup();
  const levelElement = getElementsFromMarkup();

  // init game content
  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(levelElement);
  gameContainerElement.appendChild(footer);

  changeScreen(gameContainerElement);
};

startGame();

export {showScreen};
