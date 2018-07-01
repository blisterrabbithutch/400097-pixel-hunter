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


  _enterNextLevel(data) {
    if (this.model.getCurrentLives() > 0) {
      this.model.changeNextLevel();
      this.header.stopBlinkingTimer();
      const numberOfScreen = Array.prototype.indexOf.call(this.model.getGameLevels(), data);
      const nextLevel = this.model.getGameLevels()[numberOfScreen + 1];
      this._chooseLevelType(nextLevel);
    } else {
      Application.showStats(this.model.getCurrentAnswerProgress(), this.model.state, this.model.getUsername());
    }
  }

  _chooseLevelType(level) {
    if (level) {
      if (level.type === `tinder-like`) {
        this._showOneCardGameScreen(level, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (level.type === `two-of-two`) {
        this._showTwoCardsGameScreen(level, this.model.state, this.model.getCurrentAnswerProgress());
      } else if (level.type === `one-of-three`) {
        this._showThreeCardsGameScreen(level, this.model.state, this.model.getCurrentAnswerProgress());
      }
    }
  }

  _handleResultOfOneCardLevel(data, firstCardInputsValue) {
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

  _handleResultOfTwoCardsLevel(currentLevel, firstCardInputsValue, secondCardInputsValue) {
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

  _findDifferentCard(firstCard, secondCard, thirdCard) {
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

  _handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer) {
    let answerIsSolved;
    if (evt.target === this._findDifferentCard(firstCardAnswer, secondCardAnswer, thirdCardAnswer)) {
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

  _updateHeader(view) {
    view.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.header.updateLives(this.model.state);
    this.model.resetTime(initialState.time);
    this._startTimerRemaining(initialState.time);
    this._startLevelTimeDuration();
    this.header.updateTime(this.model.getCurrentTime());
  }

  _updateHeaderTime() {
    this.header.updateTime(this.model.getCurrentTime());
  }

  _showOneCardGameScreen(data, state, answersProgress) {
    const oneCardScreenView = new OneCardGameScreenView(data, state, answersProgress);
    this._updateHeader(oneCardScreenView);
    oneCardScreenView.onAnswer = (selectedInputValue) => {
      this._handleResultOfOneCardLevel(data, selectedInputValue);
      this._stopLevelTimeDuration();
      this._stopTimerRemaining();
      this._enterNextLevel(data);
    };
    return showScreen(oneCardScreenView.element);
  }

  _showTwoCardsGameScreen(data, state, answersProgress) {
    const twoCardsScreenView = new TwoCardsGameScreenView(data, state, answersProgress);
    this._updateHeader(twoCardsScreenView);
    twoCardsScreenView.onAnswer = (leftCardValue, rightCardValue) => {
      this._handleResultOfTwoCardsLevel(data, leftCardValue, rightCardValue);
      this._stopLevelTimeDuration();
      this._stopTimerRemaining();
      this._enterNextLevel(data);
    };
    return showScreen(twoCardsScreenView.element);
  }

  _showThreeCardsGameScreen(data, state, answersProgress) {
    const threeCardsScreenView = new ThreeCardsGameScreenView(data, state, answersProgress);
    this._updateHeader(threeCardsScreenView);
    const firstCardAnswer = data.answers[0].type;
    const secondCardAnswer = data.answers[1].type;
    const thirdCardAnswer = data.answers[2].type;
    threeCardsScreenView.onAnswer = (evt) => {
      this._handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
      this._stopLevelTimeDuration();
      this._stopTimerRemaining();
      this._enterNextLevel(data);
    };
    return showScreen(threeCardsScreenView.element);
  }

  startGame() {
    const selectedGameScreen = this.model.getGameLevels()[this.model.getCurrentLevelNumber()];
    this._chooseLevelType(selectedGameScreen);
  }

  _startLevelTimeDuration() {
    this.levelDuration = setTimeout(() => {
      let remain = this.model.getCurrentAnswerTime() + ONE_SECOND;
      this.model.setLevelTime(remain);
      this._startLevelTimeDuration(remain);
    }, ONE_SECOND);
  }

  _stopLevelTimeDuration() {
    clearTimeout(this.levelDuration);
    this.model.setLevelTime(0);
  }

  _startTimerRemaining(duration) {
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
        this._enterNextLevel(this.model.getCurrentLevelData());
        this.header.stopBlinkingTimer();
      } else if (remain === this._timerBlinkingLimit) {
        this.header.startBlinkingTimer();
        remain = this.model.getCurrentTime() - 1;
        this.model.saveResultTime(remain);
        this._updateHeaderTime();
        this._startTimerRemaining(remain);
      } else {
        remain = this.model.getCurrentTime() - 1;
        this.model.saveResultTime(remain);
        this._updateHeaderTime();
        this._startTimerRemaining(remain);
      }
    }, ONE_SECOND);
  }

  _stopTimerRemaining() {
    clearTimeout(this.timerRemaining);
  }

}

export default GameScreen;
