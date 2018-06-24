import showScreen from './../showscreen-function.js';
import rulesScreen from './../rules-screen/rules-screen.js';
import GreetingScreenView from './greeting-screen-view.js';
import AbstractView from '../abstract-view.js';
import Application from '../application.js';

export default class GreetingScreen extends AbstractView {
  constructor() {
    super();
    this.view = new GreetingScreenView();
    this.view.onClick = this.onClick.bind(this);
  }

  get element() {
    return this.view.element;
  }

  onClick() {
    Application.showRules();
  }

  bind() {
  }

}
