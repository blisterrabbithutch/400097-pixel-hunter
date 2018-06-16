import {getElementFromTemplate, getFastAnswersValue, getSlowAnswersValue, getCompletedLevelsValue, getLevelProgressBar, getStatsTitle, getStatsResult} from './utils.js';
import getFooterMarkup from './footer.js';
import getHeader from './header.js';
import {AnswerPoints} from './enums.js';

const template = (answers, state) => `
<main class="central">
  <div class="result">
    <h1>${getStatsTitle(answers, state)}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${getLevelProgressBar(answers)}
          </ul>
        </td>
        <td class="result__points">×&nbsp;
        ${AnswerPoints.NORMAL}
        </td>
        <td class="result__total">
        ${getCompletedLevelsValue(answers) * AnswerPoints.NORMAL}
        </td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">
        ${getFastAnswersValue(answers)}
        &nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;
        ${AnswerPoints.BONUS}
        </td>
        <td class="result__total">
        ${getFastAnswersValue(answers) * AnswerPoints.BONUS}
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
        ${getSlowAnswersValue(answers)}
        &nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;
        ${AnswerPoints.BONUS}
        </td>
        <td class="result__total">
        ${-(getSlowAnswersValue(answers) * AnswerPoints.BONUS)}
        </td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">
        ${getStatsResult(answers, state)}
        </td>
      </tr>
    </table>
  </div>
  ${getFooterMarkup()}
</main>
`;
export default (answers, state) => {
  const el = getElementFromTemplate(template(answers, state));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  return el;
};
