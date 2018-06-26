import MainScreenView from './main-screen/main-screen-view.js';
import GreetingScreen from './greeting-screen/greeting-screen.js';
import RulesScreen from './rules-screen/rules-screen.js';
import GamePresenter from './game-screen/game-presenter.js';
import StatsScreen from './stats-screen/stats-screen-view.js';
import showScreen from './showscreen-function.js';
import GameModel from './game-screen/game-model.js';

export default class Application {
  static showMain() {
    const main = new MainScreenView();
    showScreen(main.element);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    showScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    showScreen(rules.element);
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    const game = new GamePresenter(model);
    showScreen(game.element);
    game.startGame();
  }

  static showStats(answers, state) {
    const statistics = new StatsScreen(answers, state);
    showScreen(statistics.element);
  }

}
