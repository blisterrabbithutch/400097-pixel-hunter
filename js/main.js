import getMainScreenElement from './main-screen.js';
import getFirstGameScreenElement from './first-game-screen.js';
import {getElementsFromMarkup} from './utils.js';
import {initialState, levels} from './data.js';

const pageContainer = document.querySelector(`.central`);
const bodyTag = document.querySelector(`body`);

const showScreen = (templateEl) => {
  pageContainer.innerHTML = ``;
  let childs = templateEl.children;
  let childsArr = [];
  for (let i = 0; i < childs.length; i++) {
    childsArr[i] = childs[i];
  }
  for (let j = 0; j < childsArr.length; j++) {
    pageContainer.appendChild(childsArr[j]);
  }
};

showScreen(getMainScreenElement());





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
