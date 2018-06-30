import {initialState} from './../game-settings.js';

class GameModel {
  constructor(data, username) {
    this.data = data;
    this.username = username;
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

  getUsername() {
    return this.username;
  }

  getCurrentLevelNumber() {
    return this._state.level;
  }

  getGameLevels() {
    return this.data;
  }

  getCurrentLevelData() {
    return this.getGameLevels()[this._state.level];
  }

  getCurrentLives() {
    return this._state.lives;
  }

  getCurrentAnswerProgress() {
    return this._state.answers;
  }

  changeNextLevel() {
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
