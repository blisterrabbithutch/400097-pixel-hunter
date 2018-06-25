import GameView from './game-view.js';
import {levels} from '../data.js';
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
    this.view = new GameView();
    this.header = new Header(this.model.state);
  }

  get element() {
    return this.view.element;
  }

  enterNextLevel(data) {
    const numberOfScreen = Array.prototype.indexOf.call(levels, data);
    const nextLevel = levels[numberOfScreen + 1];
    if (nextLevel && this.model.getCurrentLives() > 0) {
      if (nextLevel.levelType === `one-card`) {
        this.showOneCardGameScreen(nextLevel, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (nextLevel.levelType === `two-cards`) {
        this.showTwoCardsGameScreen(nextLevel, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (nextLevel.levelType === `three-cards`) {
        this.showThreeCardsGameScreen(nextLevel, this.model.state, this.model.getCurrentAnswerProgress());
      }
    } else {
      Application.showStats(this.model.getCurrentAnswerProgress(), this.model.state);
    }
  }

  handleResultOfOneCardLevel(data, firstCardInputsValue) {
    let answerIsSolved;
    if (firstCardInputsValue === data.cards[0].rightAnswer) {
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
    if (firstCardInputsValue === currentLevel.cards[0].rightAnswer && secondCardInputsValue === currentLevel.cards[1].rightAnswer) {
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

  updateHeader() {
    this.header.updateTime(this.model.getCurrentTime());
  }

  showOneCardGameScreen(data, state, answersProgress) {
    const oneCardScreenView = new OneCardGameScreenView(data, state, answersProgress);
    oneCardScreenView.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.model.resetTime(initialState.time);
    this.startTimerTick(initialState.time);
    this.startLevelTimeDuration();
    const form = oneCardScreenView.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    oneCardScreenView.onAnswer = () => {
      this.handleResultOfOneCardLevel(data, firstCardRadioInputs.value);
      this.stopLevelTimeDuration();
      this.stopTimer();
      this.enterNextLevel(data);
    };
    return showScreen(oneCardScreenView.element);
  }

  showTwoCardsGameScreen(data, state, answersProgress) {
    const twoCardsScreenView = new TwoCardsGameScreenView(data, state, answersProgress);
    twoCardsScreenView.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.model.resetTime = initialState.time;
    this.startTimerTick(initialState.time);
    this.startLevelTimeDuration();
    const form = twoCardsScreenView.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    const secondCardRadioInputs = form.elements.question2;
    twoCardsScreenView.onAnswer = () => {
      this.handleResultOfTwoCardsLevel(data, firstCardRadioInputs.value, secondCardRadioInputs.value);
      this.stopLevelTimeDuration();
      this.stopTimer();
      this.enterNextLevel(data);
    };
    return showScreen(twoCardsScreenView.element);
  }

  showThreeCardsGameScreen(data, state, answersProgress) {
    const threeCardsScreenView = new ThreeCardsGameScreenView(data, state, answersProgress);
    threeCardsScreenView.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.model.resetTime = initialState.time;
    this.startTimerTick(initialState.time);
    this.startLevelTimeDuration();
    const firstCardAnswer = data.cards[0].rightAnswer;
    const secondCardAnswer = data.cards[1].rightAnswer;
    const thirdCardAnswer = data.cards[2].rightAnswer;
    threeCardsScreenView.onAnswer = (evt) => {
      this.handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
      this.stopLevelTimeDuration();
      this.stopTimer();
      this.enterNextLevel(data);
    };
    return showScreen(threeCardsScreenView.element);
  }

  startGame() {
    const selectedGameScreen = levels[this.model.getCurrentLevelNumber()];
    if (selectedGameScreen && this.model.getCurrentLives() > 0) {
      if (selectedGameScreen.levelType === `one-card`) {
        this.showOneCardGameScreen(selectedGameScreen, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (selectedGameScreen.levelType === `two-cards`) {
        this.showTwoCardsGameScreen(selectedGameScreen, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (selectedGameScreen.levelType === `three-cards`) {
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

  startTimerTick(duration) {
    this.timer = setTimeout(() => {
      createTimer(duration).tick();
      let remain = this.model.getCurrentTime() - 1;

      if (remain === 0) {
        Application.showStats(this.model.getCurrentAnswerProgress(), this.model.state);
      } else {
        this.model.saveResultTime(remain);
        this.updateHeader();
        this.startTimerTick(remain);
      }
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

}

export default GameScreen;
