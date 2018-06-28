import {AnswerPoints, AnswerTime} from './enums.js';
import {initialState} from './game-settings.js';

let userState;
const createUserdata = () => {
  userState = Object.assign({}, initialState);
  userState[`answers`] = [];
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

const getElementFromTemplate = (template) => {
  const pageElement = document.createElement(`div`);
  pageElement.innerHTML = template;
  return pageElement.firstElementChild;
};

const getScore = (userResult, remainingLifes) => {
  let userPoints = 0;
  if (userResult.length < 10) {
    return -1;
  } else {
    for (const currentUser of userResult) {
      if (currentUser.solved) {
        userPoints = userPoints + AnswerPoints.NORMAL;
        if (currentUser.time <= AnswerTime.FAST) {
          userPoints = userPoints + AnswerPoints.BONUS;
        } else if (currentUser.time >= AnswerTime.SLOW && currentUser.time < AnswerTime.TIMEOUT) {
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

const getFastAnswersValue = (userAnswers) => {
  let fastAnswersValue = 0;
  for (const userAnswer of userAnswers) {
    if (userAnswer.time < AnswerTime.FAST && userAnswer.solved) {
      fastAnswersValue++;
    }
  }
  return fastAnswersValue;
};

const getSlowAnswersValue = (userAnswers) => {
  let slowAnswersValue = 0;
  for (const userAnswer of userAnswers) {
    if (userAnswer.time > AnswerTime.SLOW && userAnswer.time < AnswerTime.TIMEOUT && userAnswer.solved) {
      slowAnswersValue++;
    }
  }
  return slowAnswersValue;
};

const getCompletedLevelsValue = (userAnswers) => {
  let completedLevelValue = 0;
  for (const userAnswer of userAnswers) {
    if (userAnswer.solved) {
      completedLevelValue++;
    }
  }
  return completedLevelValue;
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

export {getElementFromTemplate, createTimer, createUserdata, userState, getLevelProgressBar, getScore, getFastAnswersValue, getSlowAnswersValue, getCompletedLevelsValue};
