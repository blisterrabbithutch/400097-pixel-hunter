import getFooterMarkup from './../footer.js';
import AbstractView from './../abstract-view.js';
import Header from './../header.js';
import {getScore, getFastAnswersValue, getSlowAnswersValue, getCompletedLevelsValue, getLevelProgressBar} from './../utils.js';
import {AnswerPoints} from './../enums.js';
import showScreen from './../showscreen-function.js';
import {userState} from './../utils.js';

export default class StatsScreenView extends AbstractView {
  constructor(answers, state) {
    super();
    this.answers = answers;
    this.state = state;
  }

  getStatsTitle(userAnswers, state) {
    if (getScore(userAnswers, state.lives) === -1) {
      return `Проигрыш!`;
    } else {
      return `Победа!`;
    }
  }

  getStatsResult(userAnswers, state) {
    if (getScore(userAnswers, state.lives) === -1) {
      return `Fail!`;
    } else {
      return getScore(userAnswers, state.lives);
    }
  }

  template() {
    return `
      <main class="central">
        <div class="result">
          <h1>${this.getStatsTitle(this.answers, this.state)}</h1>
          <table class="result__table">
            <tr>
              <td class="result__number">1.</td>
              <td colspan="2">
                <ul class="stats">
                  ${getLevelProgressBar(this.answers)}
                </ul>
              </td>
              <td class="result__points">×&nbsp;
              ${AnswerPoints.NORMAL}
              </td>
              <td class="result__total">
              ${getCompletedLevelsValue(this.answers) * AnswerPoints.NORMAL}
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">
              ${getFastAnswersValue(this.answers)}
              &nbsp;<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">×&nbsp;
              ${AnswerPoints.BONUS}
              </td>
              <td class="result__total">
              ${getFastAnswersValue(this.answers) * AnswerPoints.BONUS}
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">
              ${this.state.lives}
              &nbsp;<span class="stats__result stats__result--alive"></span></td>
              <td class="result__points">×&nbsp;
              ${AnswerPoints.BONUS}
              </td>
              <td class="result__total">
              ${this.state.lives * AnswerPoints.BONUS}
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">
              ${getSlowAnswersValue(this.answers)}
              &nbsp;<span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">×&nbsp;
              ${AnswerPoints.BONUS}
              </td>
              <td class="result__total">
              ${-(getSlowAnswersValue(this.answers) * AnswerPoints.BONUS)}
              </td>
            </tr>
            <tr>
              <td colspan="5" class="result__total  result__total--final">
              ${this.getStatsResult(this.answers, this.state)}
              </td>
            </tr>
          </table>
        </div>
        ${getFooterMarkup()}
      </main>`;
  }

  onClick() { }

  bind() {
    this.element.insertAdjacentElement(`afterbegin`, new Header(this.state).element);
  }

}
