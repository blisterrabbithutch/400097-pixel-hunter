import RulesScreenView from './rules-screen-view.js';
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
    Application.showGame(this.view.getUsername());
  }

  onBackButton() {
    Application.showGreeting();
  }

  bind() {
  }

}
