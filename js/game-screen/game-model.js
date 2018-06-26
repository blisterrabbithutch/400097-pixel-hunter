import {initialState} from './../game-settings.js';
import {levels} from '../data.js';

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

  getCurrentLevelNumber() {
    return this._state.level;
  }

  getCurrentLevelData() {
    return levels[this._state.level];
  }

  getCurrentLives() {
    return this._state.lives;
  }

  getCurrentAnswerProgress() {
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

  getCurrentTime() {
    return this._state.time;
  }

  resetTime(newTime) {
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
