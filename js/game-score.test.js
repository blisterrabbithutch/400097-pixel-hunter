import {assert} from 'chai';
import {getScore} from './utils.js';

let resultFirst = [
  {
    solved: true,
    time: 35000
  },
  {
    solved: true,
    time: 32000
  },
  {
    solved: true,
    time: 7000
  },
  {
    solved: true,
    time: 25000
  },
  {
    solved: true,
    time: 12000
  },
  {
    solved: true,
    time: 17000
  },
  {
    solved: true,
    time: 22000
  },
  {
    solved: true,
    time: 12000
  },
  {
    solved: true,
    time: 25000
  },
  {
    solved: true,
    time: 11000
  }
];

let resultSecond = [
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 7000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  }
];

let resultThird = [
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 7000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  }
];

let resultFour = [
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 7000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  }
];

let resultFifth = [
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 7000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 8000
  },
  {
    solved: true,
    time: 5000
  },
  {
    solved: true,
    time: 38000
  },
  {
    solved: false,
    time: 8000
  },
  {
    solved: false,
    time: 8000
  }
];

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
