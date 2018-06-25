import {AnswerPoints, AnswerTime} from './../enums.js';
import {initialState} from './../game-settings.js';
import {levels} from '../data.js';
import {createTimer} from '../utils.js';

class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
  }

  get state() {
    return this._state;
  }

  restart() {
    this._state = {
      level: initialState.level,
      lives: initialState.lives,
      time: initialState.time,
      levelTime: initialState.levelTime,
      answers: []
    };
  }

  currentLevelNumber() {
    return this._state.level;
  }

  currentLevelData() {
    return levels[this._state.level];
  }

  currentLives() {
    return this._state.lives;
  }

  currentAnswerProgress() {
    return this._state.answers;
  }

  nextLevel() {
    this._state.level++;
  }

  reduceLives() {
    this._state.lives--;
  }

  saveAnswers(value) {
    this._state.answers.push(value);
  }

  currentTime() {
    return this._state.time;
  }

  set resetTime(newTime) {
    this._state.time = newTime;
  }

  setLevelTime(time) {
    this._state.levelTime = time;
  }

  getCurrentAnswerTime() {
    return this._state.levelTime;
  }

  tick() {
    this._state.time--;
  }

  saveResultTime(time) {
    this._state.time = time;
  }

}

export default GameModel;
