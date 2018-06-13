import {getElementFromTemplate, getFastAnswersValue, getSlowAnswersValue, getCompletedLevelsValue, getLevelProgressBar, getStatsTitle, getStatsResult} from './utils.js';
import getFooter from './footer.js';
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
    <!--
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    --!>
  </div>
  ${getFooter()}
</main>
`;
export default (answers, state) => {
  const el = getElementFromTemplate(template(answers, state));
  el.insertAdjacentElement(`afterbegin`, getHeader(state));
  return el;
};
