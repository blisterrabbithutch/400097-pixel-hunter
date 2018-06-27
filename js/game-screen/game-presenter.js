import {initialState} from '../game-settings.js';
import TwoCardsGameScreenView from './two-cards-game-screen-view.js';
import OneCardGameScreenView from './one-card-game-screen-view.js';
import ThreeCardsGameScreenView from './three-cards-game-screen-view.js';
import showScreen from '../showscreen-function.js';
import {createTimer} from '../utils.js';
import Application from '../application.js';
import Header from './../header.js';

const ONE_SECOND = 1000;

class GameScreen {
  constructor(model) {
    this.model = model;
    this.model.restart();
    this.header = new Header(this.model.state);
  }


  enterNextLevel(data) {
    this.model.nextLevel();
    this.header.stopBlinkingTimer();
    const numberOfScreen = Array.prototype.indexOf.call(this.model.getGameLevels(), data);
    const nextLevel = this.model.getGameLevels()[numberOfScreen + 1];
    if (nextLevel && this.model.getCurrentLives() > 0) {
      if (nextLevel.type === `tinder-like`) {
        this.showOneCardGameScreen(nextLevel, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (nextLevel.type === `two-of-two`) {
        this.showTwoCardsGameScreen(nextLevel, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (nextLevel.type === `one-of-three`) {
        this.showThreeCardsGameScreen(nextLevel, this.model.state, this.model.getCurrentAnswerProgress());
      }
    } else {
      Application.showStats(this.model.getCurrentAnswerProgress(), this.model.state);
    }
  }

  handleResultOfOneCardLevel(data, firstCardInputsValue) {
    let answerIsSolved;
    if (firstCardInputsValue === data.answers[0].type) {
      answerIsSolved = true;
    } else {
      this.model.reduceLives();
      answerIsSolved = false;
    }
    let answerOnCard = {
      time: this.model.getCurrentAnswerTime(),
      solved: answerIsSolved
    };
    this.model.saveAnswers(answerOnCard);
    return answerOnCard;
  }

  handleResultOfTwoCardsLevel(currentLevel, firstCardInputsValue, secondCardInputsValue) {
    let answerIsSolved;
    if (firstCardInputsValue === currentLevel.answers[0].type && secondCardInputsValue === currentLevel.answers[1].type) {
      answerIsSolved = true;
    } else {
      this.model.reduceLives();
      answerIsSolved = false;
    }
    let answerOnCard = {
      time: this.model.getCurrentAnswerTime(),
      solved: answerIsSolved
    };
    this.model.saveAnswers(answerOnCard);
    return answerOnCard;
  }

  findDifferentCard(firstCard, secondCard, thirdCard) {
    const firstCardEl = document.querySelector(`.game__option:first-child`);
    const secondCardEl = document.querySelector(`.game__option:nth-child(2)`);
    const thirdCardEl = document.querySelector(`.game__option:nth-child(3)`);
    if (firstCard !== secondCard && firstCard !== thirdCard) {
      return firstCardEl;
    } else if (secondCard !== firstCard && secondCard !== thirdCard) {
      return secondCardEl;
    } else if (thirdCard !== firstCard && thirdCard !== firstCard) {
      return thirdCardEl;
    }
    throw new Error(`Incorrect type of parameters. (need paint or photo string)`);
  }

  handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer) {
    let answerIsSolved;
    if (evt.target === this.findDifferentCard(firstCardAnswer, secondCardAnswer, thirdCardAnswer)) {
      answerIsSolved = true;
    } else {
      this.model.reduceLives();
      answerIsSolved = false;
    }
    let answerOnCard = {
      time: this.model.getCurrentAnswerTime(),
      solved: answerIsSolved
    };
    this.model.saveAnswers(answerOnCard);
    return answerOnCard;
  }

  updateHeaderTime() {
    this.header.updateTime(this.model.getCurrentTime());
  }

  showOneCardGameScreen(data, state, answersProgress) {
    const oneCardScreenView = new OneCardGameScreenView(data, state, answersProgress);
    oneCardScreenView.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.header.updateLives(this.model.state);
    this.model.resetTime(initialState.time);
    this.startTimerRemaining(initialState.time);
    this.startLevelTimeDuration();
    this.updateHeaderTime();
    const form = oneCardScreenView.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    oneCardScreenView.onAnswer = () => {
      this.handleResultOfOneCardLevel(data, firstCardRadioInputs.value);
      this.stopLevelTimeDuration();
      this.stopTimerRemaining();
      this.enterNextLevel(data);
    };
    return showScreen(oneCardScreenView.element);
  }

  showTwoCardsGameScreen(data, state, answersProgress) {
    const twoCardsScreenView = new TwoCardsGameScreenView(data, state, answersProgress);
    twoCardsScreenView.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.header.updateLives(this.model.state);
    this.model.resetTime(initialState.time);
    this.startTimerRemaining(initialState.time);
    this.startLevelTimeDuration();
    this.updateHeaderTime();
    const form = twoCardsScreenView.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    const secondCardRadioInputs = form.elements.question2;
    twoCardsScreenView.onAnswer = () => {
      this.handleResultOfTwoCardsLevel(data, firstCardRadioInputs.value, secondCardRadioInputs.value);
      this.stopLevelTimeDuration();
      this.stopTimerRemaining();
      this.enterNextLevel(data);
    };
    return showScreen(twoCardsScreenView.element);
  }

  showThreeCardsGameScreen(data, state, answersProgress) {
    const threeCardsScreenView = new ThreeCardsGameScreenView(data, state, answersProgress);
    threeCardsScreenView.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.header.updateLives(this.model.state);
    this.model.resetTime(initialState.time);
    this.startTimerRemaining(initialState.time);
    this.startLevelTimeDuration();
    this.updateHeaderTime();
    const firstCardAnswer = data.answers[0].type;
    const secondCardAnswer = data.answers[1].type;
    const thirdCardAnswer = data.answers[2].type;
    threeCardsScreenView.onAnswer = (evt) => {
      this.handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
      this.stopLevelTimeDuration();
      this.stopTimerRemaining();
      this.enterNextLevel(data);
    };
    return showScreen(threeCardsScreenView.element);
  }

  startGame() {
    const selectedGameScreen = this.model.getGameLevels()[this.model.getCurrentLevelNumber()];
    if (selectedGameScreen && this.model.getCurrentLives() > 0) {
      if (selectedGameScreen.type === `tinder-like`) {
        this.showOneCardGameScreen(selectedGameScreen, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (selectedGameScreen.type === `two-of-two`) {
        this.showTwoCardsGameScreen(selectedGameScreen, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (selectedGameScreen.type === `one-of-three`) {
        this.showThreeCardsGameScreen(selectedGameScreen, this.model.state, this.model.getCurrentAnswerProgress());
      }
    }
  }

  startLevelTimeDuration() {
    this.levelDuration = setTimeout(() => {
      let remain = this.model.getCurrentAnswerTime() + ONE_SECOND;
      this.model.setLevelTime(remain);
      this.startLevelTimeDuration(remain);
    }, ONE_SECOND);
  }

  stopLevelTimeDuration() {
    clearTimeout(this.levelDuration);
    this.model.setLevelTime(0);
  }

  startTimerRemaining(duration) {
    this._timerBlinkingLimit = 6;
    this.timerRemaining = setTimeout(() => {
      createTimer(duration).tick();
      let remain = duration;
      if (remain === 0) {
        this.model.reduceLives();
        let answerOnCard = {
          time: this.model.getCurrentAnswerTime(),
          solved: false
        };
        this.model.saveAnswers(answerOnCard);
        this.enterNextLevel(this.model.getCurrentLevelData());
        this.header.stopBlinkingTimer();
      } else if (remain === this._timerBlinkingLimit) {
        this.header.startBlinkingTimer();
        remain = this.model.getCurrentTime() - 1;
        this.model.saveResultTime(remain);
        this.updateHeaderTime();
        this.startTimerRemaining(remain);
      } else {
        remain = this.model.getCurrentTime() - 1;
        this.model.saveResultTime(remain);
        this.updateHeaderTime();
        this.startTimerRemaining(remain);
      }
    }, ONE_SECOND);
  }

  stopTimerRemaining() {
    clearTimeout(this.timerRemaining);
  }

}

export default GameScreen;
