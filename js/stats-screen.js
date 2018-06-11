import {getElementsFromMarkup, getFastAnswersValue, getSlowAnswersValue, getScore, getCompletedLevelsValue, getLevelProgressBar} from './utils.js';
import {showScreen} from './main.js';
import getGreetingScreenElement from './greeting-screen.js';
import getFooter from './footer.js';
import getHeader from './header.js';
import {initialState, levels, answers} from './data.js';
import {AnswerTime, AnswerPoints} from './enums.js';

const template = (answers) => `
<main class="central">
  <div class="result">
    <h1>Победа!</h1>
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
        ${initialState.lives}
        &nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;
        ${AnswerPoints.BONUS}
        </td>
        <td class="result__total">
        ${initialState.lives * AnswerPoints.BONUS}
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
        ${getScore(answers, initialState.lives)}
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
  ${getFooter().outerHTML}
</main>
`;
export default () => {
  const el = getElementsFromMarkup(template(answers));
  el.insertAdjacentElement(`afterbegin`, getHeader(initialState));
  return el;
};
