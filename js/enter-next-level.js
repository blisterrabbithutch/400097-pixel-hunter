import {levels} from './data.js';
import showScreen from './showscreen-function.js';
import {getThreeCardsGameScreen} from './three-cards-game-screen.js';
import {getTwoCardsGameScreen} from './two-cards-game-screen.js';
import {getOneCardGameScreen} from './one-card-game-screen.js';
import getStatsScreenElement from './stats-screen.js';
import {userState} from './utils.js';

const enterNextLevel = (data) => {
  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  const nextLevel = levels[numberOfScreen + 1];
  if (nextLevel && userState.lives > 0) {
    if (nextLevel.levelType === `one-card`) {
      showScreen(getOneCardGameScreen(nextLevel, userState));
    } else if (nextLevel.levelType === `three-cards`) {
      showScreen(getThreeCardsGameScreen(nextLevel, userState));
    } else if (nextLevel.levelType === `two-cards`) {
      showScreen(getTwoCardsGameScreen(nextLevel, userState));
    }
  } else {
    showScreen(getStatsScreenElement(userState.answers, userState));
  }
};

export default enterNextLevel;
