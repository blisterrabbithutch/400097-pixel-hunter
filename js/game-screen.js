import enterNextLevel from './enter-next-level.js';
import TwoCardsGameScreenView from './two-cards-game-screen-view.js';
import OneCardGameScreenView from './one-card-game-screen-view.js';
import ThreeCardsGameScreenView from './three-cards-game-screen-view.js';

const getTwoCardsGameScreenView = (data, state) => {
  const twoCardsGameScreenView = new TwoCardsGameScreenView(data, state);
  twoCardsGameScreenView.onAnswer = () => {
    enterNextLevel(data);
  };
  return twoCardsGameScreenView;
};

const getOneCardGameScreenView = (data, state) => {
  const oneCardGameScreenView = new OneCardGameScreenView(data, state);
  oneCardGameScreenView.onAnswer = () => {
    enterNextLevel(data);
  };
  return oneCardGameScreenView;
};

const getThreeCardsGameScreenView = (data, state) => {
  const threeCardsGameScreenView = new ThreeCardsGameScreenView(data, state);
  ThreeCardsGameScreenView.onAnswer = () => {
    enterNextLevel(data);
  };
  return threeCardsGameScreenView;
};

export {getTwoCardsGameScreenView, getOneCardGameScreenView, getThreeCardsGameScreenView};
