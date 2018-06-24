import showScreen from './../showscreen-function.js';
import greetingScreen from './../greeting-screen/greeting-screen.js';
import RulesScreenView from './rules-screen-view.js';
import {levels} from './../data.js';
import gameScreen from './../game-screen.js';
import {createUserdata} from './../utils.js';
import AbstractView from '../abstract-view.js';
import Application from '../application.js';

export default class RulesScreen extends AbstractView {
  constructor() {
    super();
    this.view = new RulesScreenView();
    this.view.onFormSubmit = this.onFormSubmit.bind(this);
    this.view.onBackButton = this.onBackButton.bind(this);
  }

  get element() {
    return this.view.element;
  }

  onFormSubmit() {
    //createUserdata();
    //gameScreen(levels[0]);
    Application.showGame();
  }

  onBackButton() {
    Application.showGreeting();
  }

  bind() {
  }

}
