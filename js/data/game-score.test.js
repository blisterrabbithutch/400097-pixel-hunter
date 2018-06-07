import {assert} from 'chai';
import {getScore} from '../utils.js';
import {resultFirst, resultSecond, resultThird, resultFour, resultFifth} from '../enums.js';

describe(`Score user points after game`, () => {

  it(`should update score. First - two timeouts, all - true`, () => {
    assert.equal(getScore(resultFirst, 1), 750);
  });

  it(`should update score. Second - all true and fast answer`, () => {
    assert.equal(getScore(resultSecond, 3), 1650);
  });

  it(`should update score. Third - nine answers`, () => {
    assert.equal(getScore(resultThird, 3), -1);
  });

  it(`should update score. Four - ten answers, but all false`, () => {
    assert.equal(getScore(resultFour, 0), 0);
  });

  it(`should update score. Fifth - two false and one timeout`, () => {
    assert.equal(getScore(resultFifth, 0), 1050);
  });

});
