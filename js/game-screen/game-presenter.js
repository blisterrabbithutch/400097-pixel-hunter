import GameView from './game-view.js';
import {levels} from '../data.js';
import {AnswerPoints, AnswerTime} from '../enums.js';
import TwoCardsGameScreenView from './two-cards-game-screen-view.js';
import OneCardGameScreenView from './one-card-game-screen-view.js';
import ThreeCardsGameScreenView from './three-cards-game-screen-view.js';
//import {handleResultOfTwoCardsLevel, handleResultOfOneCardLevel, handleResultOfThreeCardsLevel} from '../utils.js';
import showScreen from '../showscreen-function.js';
import StatsScreenView from '../stats-screen/stats-screen-view.js';
import {userState} from '../utils.js';

class GameScreen {
  constructor(model) {
    this.model = model;
    this.view = new GameView();
  }

  get element() {
    return this.view.element;
  }

  enterNextLevel(data) {
    const numberOfScreen = Array.prototype.indexOf.call(levels, data);
    const nextLevel = levels[numberOfScreen + 1];
    if (nextLevel && this.model.currentLives() > 0) {
      if (nextLevel.levelType === `one-card`) {
        this.showOneCardGameScreen(nextLevel, this.model.state, this.model.currentAnswerProgress());
      } else if (nextLevel.levelType === `two-cards`) {
        this.showTwoCardsGameScreen(nextLevel, this.model.state, this.model.currentAnswerProgress());
      } else if (nextLevel.levelType === `three-cards`) {
        this.showThreeCardsGameScreen(nextLevel, this.model.state, this.model.currentAnswerProgress());
      }
    } else {
      const statsScreenView = new StatsScreenView(this.model.currentAnswerProgress(), this.model.state);
      showScreen(statsScreenView.element);
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
      time: AnswerTime.NORMAL,
      solved: answerIsSolved
    };
    this.model.saveAnswers(answerOnCard);
    return answerOnCard;
  };

  handleResultOfTwoCardsLevel(currentLevel, firstCardInputsValue, secondCardInputsValue) {
    let answerIsSolved;
    if (firstCardInputsValue === currentLevel.cards[0].rightAnswer && secondCardInputsValue === currentLevel.cards[1].rightAnswer) {
      answerIsSolved = true;
    } else {
      this.model.reduceLives();
      answerIsSolved = false;
    }
    let answerOnCard = {
      time: AnswerTime.NORMAL,
      solved: answerIsSolved
    };
    this.model.saveAnswers(answerOnCard);
    return answerOnCard;
  };

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
  };

  handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer) {
    let answerIsSolved;
    if (evt.target === this.findDifferentCard(firstCardAnswer, secondCardAnswer, thirdCardAnswer)) {
      answerIsSolved = true;
    } else {
      this.model.reduceLives();
      answerIsSolved = false;
    }
    let answerOnCard = {
      time: AnswerTime.NORMAL,
      solved: answerIsSolved
    };
    this.model.saveAnswers(answerOnCard);
    return answerOnCard;
  };

  showOneCardGameScreen(data, state, answersProgress) {
    const oneCardScreenView = new OneCardGameScreenView(data, state, answersProgress);
    const form = oneCardScreenView.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    oneCardScreenView.onAnswer = () => {
      this.handleResultOfOneCardLevel(data, firstCardRadioInputs.value);
      this.enterNextLevel(data);
    };
    return showScreen(oneCardScreenView.element);
  }

  showTwoCardsGameScreen(data, state, answersProgress) {
    const twoCardsScreenView = new TwoCardsGameScreenView(data, state, answersProgress);
    const form = twoCardsScreenView.element.querySelector(`.game__content`);
    const firstCardRadioInputs = form.elements.question1;
    const secondCardRadioInputs = form.elements.question2;
    twoCardsScreenView.onAnswer = () => {
      this.handleResultOfTwoCardsLevel(data, firstCardRadioInputs.value, secondCardRadioInputs.value);
      this.enterNextLevel(data);
    };
    return showScreen(twoCardsScreenView.element);
  }

  showThreeCardsGameScreen(data, state, answersProgress) {
    const threeCardsScreenView = new ThreeCardsGameScreenView(data, state, answersProgress);
    const firstCardAnswer = data.cards[0].rightAnswer;
    const secondCardAnswer = data.cards[1].rightAnswer;
    const thirdCardAnswer = data.cards[2].rightAnswer;
    threeCardsScreenView.onAnswer = (evt) => {
      this.handleResultOfThreeCardsLevel(evt, firstCardAnswer, secondCardAnswer, thirdCardAnswer);
      this.enterNextLevel(data);
    };
    return showScreen(threeCardsScreenView.element);
  }

  startGame() {
    this.model.restart();
    const selectedGameScreen = levels[this.model.currentLevelNumber()];
    if (selectedGameScreen && this.model.currentLives() > 0) {
      if (selectedGameScreen.levelType === `one-card`) {
        this.showOneCardGameScreen(selectedGameScreen, this.model.state, this.model.currentAnswerProgress());
      } else if (selectedGameScreen.levelType === `two-cards`) {
        this.showTwoCardsGameScreen(selectedGameScreen, this.model.state, this.model.currentAnswerProgress());
      } else if (selectedGameScreen.levelType === `three-cards`) {
        this.showThreeCardsGameScreen(selectedGameScreen, this.model.state, this.model.currentAnswerProgress());
      }
    }
  }

  //startGame(data) {
  //  const numberOfScreen = Array.prototype.indexOf.call(levels, data);
  //  const selectedGameScreen = levels[numberOfScreen];
  //  if (selectedGameScreen && userState.lives > 0) {
  //    if (selectedGameScreen.levelType === `one-card`) {
  //      this.showOneCardGameScreen(selectedGameScreen, userState);
  //    } else if (selectedGameScreen.levelType === `three-cards`) {
  //      this.showTwoCardsGameScreen(selectedGameScreen, userState);
  //    } else if (selectedGameScreen.levelType === `two-cards`) {
  //      this.showThreeCardsGameScreen(selectedGameScreen, userState);
  //    }
  //  }
  //}

}

export default GameScreen;
