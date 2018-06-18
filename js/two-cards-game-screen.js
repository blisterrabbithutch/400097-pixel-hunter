import {getElementFromTemplate, getLevelProgressBar} from './utils.js';
import enterNextLevel from './enter-next-level.js';
import getHeader from './header.js';
import getFooterMarkup from './footer.js';
import {userState} from './utils.js';
import {AnswerTime} from './enums.js';
import TwoCardsGameScreenView from './two-cards-game-screen-view.js';

export default (data, state) => {
  const twoCardsGameScreenView = new TwoCardsGameScreenView(data, state);
  twoCardsGameScreenView.onAnswer = () => {
    //может сюда вставить логику перехода
    //создать объект
    enterNextLevel(data);
  };
  return twoCardsGameScreenView;
};
