import TwoCardsGameScreenView from './two-cards-game-screen-view.js';
import OneCardGameScreenView from './one-card-game-screen-view.js';
import ThreeCardsGameScreenView from './three-cards-game-screen-view.js';
import {handleResultOfTwoCardsLevel, handleResultOfOneCardLevel, handleResultOfThreeCardsLevel} from './utils.js';
import {levels} from './data.js';
import showScreen from './showscreen-function.js';
import statsScreenView from './stats-screen-view.js';
import {userState} from './utils.js';

const enterNextLevel = (data) => {
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const nextLevel = levels[numberOfScreen + 1];
  if (nextLevel && userState.lives > 0) {
    if (nextLevel.levelType === `one-card`) {
      oneCardGameScreenView(nextLevel, userState);
    } else if (nextLevel.levelType === `three-cards`) {
      threeCardsGameScreenView(nextLevel, userState);
    } else if (nextLevel.levelType === `two-cards`) {
      twoCardsGameScreenView(nextLevel, userState);
    }
  } else {
    statsScreenView();
  }
};

const twoCardsGameScreenView = (data, state) => {
  const twoCardsScreenView = new TwoCardsGameScreenView(data, state);
  const form = twoCardsScreenView.element.querySelector(`.game__content`);
  const firstCardRadioInputs = form.elements.question1;
  const secondCardRadioInputs = form.elements.question2;
  twoCardsScreenView.onAnswer = () => {
    handleResultOfTwoCardsLevel(data, firstCardRadioInputs.value, secondCardRadioInputs.value);
    enterNextLevel(data);
  };
  return showScreen(twoCardsScreenView.element);
};

const oneCardGameScreenView = (data, state) => {
  const oneCardScreenView = new OneCardGameScreenView(data, state);
  const form = oneCardScreenView.element.querySelector(`.game__content`);
  const firstCardRadioInputs = form.elements.question1;
  oneCardScreenView.onAnswer = () => {
    handleResultOfOneCardLevel(data, firstCardRadioInputs.value);
    enterNextLevel(data);
  };
  return showScreen(oneCardScreenView.element);
};

const threeCardsGameScreenView = (data, state) => {
  const threeCardsScreenView = new ThreeCardsGameScreenView(data, state);
  const firstCardAnswer = data.cards[0].rightAnswer;
  const secondCardAnswer = data.cards[1].rightAnswer;
  const thirdCardAnswer = data.cards[2].rightAnswer;
  threeCardsScreenView.onAnswer = (evt) => {
    handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
    enterNextLevel(data);
  };
  return showScreen(threeCardsScreenView.element);
};

export default (data) => {
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const selectedGameScreen = levels[numberOfScreen];
  if (selectedGameScreen && userState.lives > 0) {
    if (selectedGameScreen.levelType === `one-card`) {
      oneCardGameScreenView(selectedGameScreen, userState);
    } else if (selectedGameScreen.levelType === `three-cards`) {
      threeCardsGameScreenView(selectedGameScreen, userState);
    } else if (selectedGameScreen.levelType === `two-cards`) {
      twoCardsGameScreenView(selectedGameScreen, userState);
    }
  }
};
