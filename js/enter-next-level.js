import {levels} from './data.js';
import showScreen from './showscreen-function.js';
import {getTwoCardsGameScreenView, getOneCardGameScreenView, getThreeCardsGameScreenView} from './game-screen.js';
import GetStatsScreenView from './stats-screen-view.js';
import {userState} from './utils.js';

const enterNextLevel = (data) => {
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const nextLevel = levels[numberOfScreen + 1];
  if (nextLevel && userState.lives > 0) {
    if (nextLevel.levelType === `one-card`) {
      showScreen(getOneCardGameScreenView(nextLevel, userState).element);
    } else if (nextLevel.levelType === `three-cards`) {
      showScreen(getThreeCardsGameScreenView(nextLevel, userState).element);
    } else if (nextLevel.levelType === `two-cards`) {
      showScreen(getTwoCardsGameScreenView(nextLevel, userState).element);
    }
  } else {
    const statsScreenView = new GetStatsScreenView(userState.answers, userState);
    showScreen(statsScreenView.element);
  }
};

export default enterNextLevel;
