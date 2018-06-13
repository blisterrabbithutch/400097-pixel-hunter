import {AnswerPoints, AnswerTime} from './enums.js';

const getElementFromTemplate = (template) => {
  const pageElement = document.createElement(`div`);
  pageElement.innerHTML = template;
  return pageElement.firstElementChild;
};

const getLevelProgressBar = (arrayWithAnswers) => {
  let levelsArray = [];
  for (let i = 0; i < arrayWithAnswers.length; i++) {
    if (!arrayWithAnswers[i].solved || arrayWithAnswers[i].time > AnswerTime.TIMEOUT) {
      levelsArray.push(`<li class="stats__result stats__result--wrong"></li>`);
    } else if (arrayWithAnswers[i].solved && arrayWithAnswers[i].time > AnswerTime.SLOW && arrayWithAnswers[i].time < AnswerTime.TIMEOUT) {
      levelsArray.push(`<li class="stats__result stats__result--slow"></li>`);
    } else if (arrayWithAnswers[i].solved && arrayWithAnswers[i].time < AnswerTime.FAST) {
      levelsArray.push(`<li class="stats__result stats__result--fast"></li>`);
    } else if (arrayWithAnswers[i].solved && arrayWithAnswers[i].time > AnswerTime.FAST && arrayWithAnswers[i].time < AnswerTime.SLOW) {
      levelsArray.push(`<li class="stats__result stats__result--correct"></li>`);
    }
  }
  let levelsRemain = [];
  for (let i = 0; i < 10 - arrayWithAnswers.length; i++) {
    levelsRemain.push(`<li class="stats__result stats__result--unknown"></li>`);
  }
  levelsArray.push(levelsRemain);
  return levelsArray;
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

const getStatsTitle = (answers, state) => {
  if (getScore(answers, state.lives) === -1) {
    return `Проигрыш!`;
  } else {
    return `Победа!`;
  }
};

const getStatsResult = (answers, state) => {
  if (getScore(answers, state.lives) === -1) {
    return `Fail!`;
  } else {
    return getScore(answers, state.lives);
  }
};

const resetGamedata = (answers) => {
  answers.length = 0;
};

export {getElementFromTemplate, getScore, createTimer, getFastAnswersValue, getSlowAnswersValue, getCompletedLevelsValue, getLevelProgressBar, getStatsTitle, getStatsResult, resetGamedata};
