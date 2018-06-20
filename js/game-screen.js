import enterNextLevel from './enter-next-level.js';
import TwoCardsGameScreenView from './two-cards-game-screen-view.js';
import OneCardGameScreenView from './one-card-game-screen-view.js';
import ThreeCardsGameScreenView from './three-cards-game-screen-view.js';
import {handleResultOfTwoCardsLevel, handleResultOfOneCardLevel, handleResultOfThreeCardsLevel} from './utils.js';

const getTwoCardsGameScreenView = (data, state) => {
  const twoCardsGameScreenView = new TwoCardsGameScreenView(data, state);
  const form = twoCardsGameScreenView.element.querySelector(`.game__content`);
  const firstCardRadioInputs = form.elements.question1;
  const secondCardRadioInputs = form.elements.question2;
  twoCardsGameScreenView.onAnswer = () => {
    handleResultOfTwoCardsLevel(data, firstCardRadioInputs.value, secondCardRadioInputs.value);
    enterNextLevel(data);
  };
  return twoCardsGameScreenView;
};

const getOneCardGameScreenView = (data, state) => {
  const oneCardGameScreenView = new OneCardGameScreenView(data, state);
  const form = oneCardGameScreenView.element.querySelector(`.game__content`);
  const firstCardRadioInputs = form.elements.question1;
  oneCardGameScreenView.onAnswer = () => {
    handleResultOfOneCardLevel(data, firstCardRadioInputs.value);
    enterNextLevel(data);
  };
  return oneCardGameScreenView;
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
  return threeCardsGameScreenView;
};

export {getTwoCardsGameScreenView, getOneCardGameScreenView, getThreeCardsGameScreenView};
