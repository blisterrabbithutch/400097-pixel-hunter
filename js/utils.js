import {AnswerPoints, AnswerTime} from './enums.js';
import {levels} from './data.js';
import {initialState} from './game-settings.js';
import showScreen from './showscreen-function.js';
import {getThreeCardsGameScreen} from './three-cards-game-screen.js';
import {getTwoCardsGameScreen} from './two-cards-game-screen.js';
import {getOneCardGameScreen} from './one-card-game-screen.js';
import getStatsScreenElement from './stats-screen.js';

let userState;
const createUserdata = () => {
  userState = Object.assign({}, initialState);
  userState[`answers`] = [];
};

const getLevelProgressBar = (userAnswers) => {
  let userLevels;
  let answerType;
  userLevels = userAnswers.map((answer) => {
    if (!answer.solved || answer.time > AnswerTime.TIMEOUT) {
      answerType = `wrong`;
    } else if (answer.solved && answer.time > AnswerTime.SLOW && answer.time < AnswerTime.TIMEOUT) {
      answerType = `slow`;
    } else if (answer.solved && answer.time < AnswerTime.FAST) {
      answerType = `fast`;
    } else if (answer.solved && answer.time > AnswerTime.FAST && answer.time < AnswerTime.SLOW) {
      answerType = `correct`;
    }
    let type = answerType;
    return `<li class="stats__result stats__result--${type}"></li>`;
  });
  let userRemainedLevels = [];
  for (let i = 0; i < 10 - userAnswers.length; i++) {
    userRemainedLevels.push(`<li class="stats__result stats__result--unknown"></li>`);
  }
  userLevels.push(userRemainedLevels);
  return userLevels;
};

const getFastAnswersValue = (arrayWithAnswers) => {
  let fastAnswersValue = 0;
  for (let i = 0; i < arrayWithAnswers.length; i++) {
    if (arrayWithAnswers[i].time < AnswerTime.FAST && arrayWithAnswers[i].solved) {
      fastAnswersValue++;
    }
  }
  return fastAnswersValue;
};

const getSlowAnswersValue = (arrayWithAnswers) => {
  let slowAnswersValue = 0;
  for (let i = 0; i < arrayWithAnswers.length; i++) {
    if (arrayWithAnswers[i].time > AnswerTime.SLOW && arrayWithAnswers[i].time < AnswerTime.TIMEOUT && arrayWithAnswers[i].solved) {
      slowAnswersValue++;
    }
  }
  return slowAnswersValue;
};

const getCompletedLevelsValue = (arrayWithAnswers) => {
  let completedLevelValue = 0;
  for (let i = 0; i < arrayWithAnswers.length; i++) {
    if (arrayWithAnswers[i].solved) {
      completedLevelValue++;
    }
  }
  return completedLevelValue;
};

const getScore = (userResult, remainingLifes) => {
  let userPoints = 0;
  if (userResult.length < 10) {
    return -1;
  } else {
    for (let i = 0; i < userResult.length; i++) {
      let currentUser = userResult[i];
      if (currentUser.solved) {
        userPoints = userPoints + AnswerPoints.NORMAL;
        if (currentUser.time < AnswerTime.FAST) {
          userPoints = userPoints + AnswerPoints.BONUS;
        } else if (currentUser.time > AnswerTime.SLOW && currentUser.time < AnswerTime.TIMEOUT) {
          userPoints = userPoints - AnswerPoints.BONUS;
        } else if (currentUser.time > AnswerTime.TIMEOUT) {
          userPoints = userPoints - AnswerPoints.NORMAL;
        }
      }
    }
  }
  userPoints = userPoints + (remainingLifes * AnswerPoints.BONUS);
  return userPoints;
};

function createTimer(duration) {
  let timeRemain = duration;
  return {
    tick() {
      timeRemain--;
      let done = false;
      if (timeRemain === 0) {
        done = true;
      }
      return {
        timeRemain,
        done
      };
    },
    time: timeRemain
  };
}

const getStatsTitle = (userAnswers, state) => {
  if (getScore(userAnswers, state.lives) === -1) {
    return `Проигрыш!`;
  } else {
    return `Победа!`;
  }
};

const getStatsResult = (userAnswers, state) => {
  if (getScore(userAnswers, state.lives) === -1) {
    return `Fail!`;
  } else {
    return getScore(userAnswers, state.lives);
  }
};

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

const getElementFromTemplate = (template) => {
  const pageElement = document.createElement(`div`);
  pageElement.innerHTML = template;
  return pageElement.firstElementChild;
};

export {getElementFromTemplate, getScore, createTimer, getFastAnswersValue, getSlowAnswersValue, getCompletedLevelsValue, getLevelProgressBar, getStatsTitle, getStatsResult, enterNextLevel, createUserdata, userState};
