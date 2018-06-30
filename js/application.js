import MainScreenView from './main-screen/main-screen-view.js';
import GreetingScreen from './greeting-screen/greeting-screen.js';
import RulesScreen from './rules-screen/rules-screen.js';
import GamePresenter from './game-screen/game-presenter.js';
import StatsScreen from './stats-screen/stats-screen-view.js';
import showScreen from './showscreen-function.js';
import GameModel from './game-screen/game-model.js';
import Loader from './loader.js';
import adaptServerData from './game-data-adapter.js';

let gameData;

export default class Application {

  static start() {
    Loader.loadData().
        then((data) => (gameData = adaptServerData(data))).
        then(() => Application.showMain()).
        catch((err) => new Error(err));
  }

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

  static showGame(username) {
    const model = new GameModel(gameData, username);
    const game = new GamePresenter(model);
    game.startGame();
  }

  static showStats(answers, state, username) {
    const statistics = new StatsScreen(answers, state, username);
    showScreen(statistics.element);
    Loader.saveResults(state, username).
        then(() => Loader.loadResults(username)).
        then((data) => statistics.renderAllStatistic(data)).
        catch(Application.showError);
  }

}
