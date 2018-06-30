import getFooterMarkup from './../footer.js';
import AbstractView from './../abstract-view.js';
import Header from './../header.js';
import {getElementFromTemplate, getScore, getFastAnswersValue, getSlowAnswersValue, getCompletedLevelsValue, getLevelProgressBar} from './../utils.js';
import {AnswerPoints} from './../enums.js';

let archiveStats = [];

export default class StatsScreenView extends AbstractView {
  constructor(answers, state, username) {
    super();
    this.answers = answers;
    this.state = state;
    this.username = username;
  }

  _getStatsTitle(userAnswers, state) {
    if (getScore(userAnswers, state.lives) === -1) {
      return `Проигрыш!`;
    } else {
      return `Победа!`;
    }
  }

  _getStatsResult(userAnswers, state) {
    if (getScore(userAnswers, state.lives) === -1) {
      return `Fail!`;
    } else {
      return getScore(userAnswers, state.lives);
    }
  }

  renderAllStatistic(statsArr) {
    this._statsTableContainer = this.element.querySelector(`.result`);
    for (let i = 0; i < statsArr.length; i++) {
      this._statsTableContainer.insertAdjacentElement(`afterend`, (getElementFromTemplate(this._templateGameStats(statsArr[i], i))));
    }
  }

  get template() {
    return `
      <main class="central">
        <div class="result">
          <h1>${this._getStatsTitle(this.answers, this.state)}</h1>

        </div>
        ${getFooterMarkup()}
      </main>`;
  }

  _templateGameStats(state, i) {
    return `
      <table class="result__table">
        <tr>
          <td class="result__number">${i + 1}</td>
          <td colspan="2">
            <ul class="stats">
              ${getLevelProgressBar(state.answers)}
            </ul>
          </td>
          <td class="result__points">×&nbsp;
          ${AnswerPoints.NORMAL}
          </td>
          <td class="result__total">
          ${getCompletedLevelsValue(state.answers) * AnswerPoints.NORMAL}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">
          ${getFastAnswersValue(state.answers)}
          &nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;
          ${AnswerPoints.BONUS}
          </td>
          <td class="result__total">
          ${getFastAnswersValue(state.answers) * AnswerPoints.BONUS}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">
          ${state.lives}
          &nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;
          ${AnswerPoints.BONUS}
          </td>
          <td class="result__total">
          ${state.lives * AnswerPoints.BONUS}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">
          ${getSlowAnswersValue(state.answers)}
          &nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;
          ${AnswerPoints.BONUS}
          </td>
          <td class="result__total">
          ${-(getSlowAnswersValue(state.answers) * AnswerPoints.BONUS)}
          </td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">
          ${this._getStatsResult(state.answers, state)}
          </td>
        </tr>
      </table>
    `;
  }

  _saveNewGameStatistics(state) {
    archiveStats.push(state);
  }

  onClick() { }

  bind() {
    this._saveNewGameStatistics(this.state);
    //this.renderAllStatistic(archiveStats);
    this.element.insertAdjacentElement(`afterbegin`, new Header(this.state).element);
  }

}
