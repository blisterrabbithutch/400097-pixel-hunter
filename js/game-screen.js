import TwoCardsGameScreenView from './two-cards-game-screen-view.js';
import OneCardGameScreenView from './one-card-game-screen-view.js';
import ThreeCardsGameScreenView from './three-cards-game-screen-view.js';
import {handleResultOfTwoCardsLevel, handleResultOfOneCardLevel, handleResultOfThreeCardsLevel} from './utils.js';
import {levels} from './data.js';
import showScreen from './showscreen-function.js';
import getStatsScreenView from './stats-screen-view.js';
import {userState} from './utils.js';

const enterNextLevel = (data) => {
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const nextLevel = levels[numberOfScreen + 1];
  if (nextLevel && userState.lives > 0) {
    if (nextLevel.levelType === `one-card`) {
      getOneCardGameScreenView(nextLevel, userState);
    } else if (nextLevel.levelType === `three-cards`) {
      getThreeCardsGameScreenView(nextLevel, userState);
    } else if (nextLevel.levelType === `two-cards`) {
      getTwoCardsGameScreenView(nextLevel, userState);
    }
  } else {
    getStatsScreenView();
  }
};

const getTwoCardsGameScreenView = (data, state) => {
  const twoCardsGameScreenView = new TwoCardsGameScreenView(data, state);
  const form = twoCardsGameScreenView.element.querySelector(`.game__content`);
  const firstCardRadioInputs = form.elements.question1;
  const secondCardRadioInputs = form.elements.question2;
  twoCardsGameScreenView.onAnswer = () => {
    handleResultOfTwoCardsLevel(data, firstCardRadioInputs.value, secondCardRadioInputs.value);
    enterNextLevel(data);
  };
  return showScreen(twoCardsGameScreenView.element);
};

const getOneCardGameScreenView = (data, state) => {
  const oneCardGameScreenView = new OneCardGameScreenView(data, state);
  const form = oneCardGameScreenView.element.querySelector(`.game__content`);
  const firstCardRadioInputs = form.elements.question1;
  oneCardGameScreenView.onAnswer = () => {
    handleResultOfOneCardLevel(data, firstCardRadioInputs.value);
    enterNextLevel(data);
  };
  return showScreen(oneCardGameScreenView.element);
};

const getThreeCardsGameScreenView = (data, state) => {
  const threeCardsGameScreenView = new ThreeCardsGameScreenView(data, state);
  const firstCardAnswer = data.cards[0].rightAnswer;
  const secondCardAnswer = data.cards[1].rightAnswer;
  const thirdCardAnswer = data.cards[2].rightAnswer;
  threeCardsGameScreenView.onAnswer = (evt) => {
    handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
    enterNextLevel(data);
  };
  return showScreen(threeCardsGameScreenView.element);
};

export default (data) => {
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const selectedGameScreen = levels[numberOfScreen];
  if (selectedGameScreen && userState.lives > 0) {
    if (selectedGameScreen.levelType === `one-card`) {
      getOneCardGameScreenView(selectedGameScreen, userState);
    } else if (selectedGameScreen.levelType === `three-cards`) {
      getThreeCardsGameScreenView(selectedGameScreen, userState);
    } else if (selectedGameScreen.levelType === `two-cards`) {
      getTwoCardsGameScreenView(selectedGameScreen, userState);
    }
  }
};
