import {assert} from 'chai';
import {createTimer} from './utils.js';


describe(`Game timer`, () => {

  it(`Time must be considered`, () => {
    assert.equal(createTimer(3).time, 3);
  });

  it(`Timer tick method check`, () => {
    assert.equal(createTimer(1).tick().done, true);
    assert.equal(createTimer(10).tick().done, false);
    assert.equal(createTimer(10).tick().timeRemain, 9);
  });

});
