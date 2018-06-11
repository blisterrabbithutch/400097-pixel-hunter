import getMainScreenElement from './main-screen.js';
import getFirstGameScreenElement from './first-game-screen.js';
import getStatsScreenElement from './stats-screen.js';
import {getElementsFromMarkup} from './utils.js';
import {initialState, levels} from './data.js';

const pageContainer = document.querySelector(`.central`);
const bodyTag = document.querySelector(`body`);

const showScreen = (el) => {
  const oldScreen = bodyTag.querySelector('.central');
  bodyTag.replaceChild(el, oldScreen);
};

//showScreen(getMainScreenElement());
showScreen(getFirstGameScreenElement());
//game render

//let game;
//
//const startGame = () => {
//  game = Object.assign({}, initialState);
//
//  const gameContainerElement = document.createElement(`div`);
//  const headerElement = getElementsFromMarkup();
//  const levelElement = getElementsFromMarkup();
//  const footer = getElementsFromMarkup();
//
//  // init game content
//  gameContainerElement.appendChild(headerElement);
//  gameContainerElement.appendChild(levelElement);
//  gameContainerElement.appendChild(footer);
//  //здесь хранится название уровня
//  const getLevel = () => levels[game.level];
//  console.log(getLevel());
//
//  const updateGame = (state) => {
//    headerElement.innerHTML = renderHeader(state);
//    levelElement.innerHTML = renderLevel(getLevel(state.level));
//  };
//
//  updateGame(game);
//
//  showScreen(gameContainerElement);
//};
//
//startGame();

export {showScreen};
