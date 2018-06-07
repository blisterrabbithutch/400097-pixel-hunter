import {assert} from 'chai';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

const fastAnswerTime = 10000;
const slowAnswerTime = 20000;
const answerTimeLimit = 30000;

let userResultFirst = [
  {
    truth: true,
    time: 35000
  },
  {
    truth: true,
    time: 32000
  },
  {
    truth: true,
    time: 7000
  },
  {
    truth: true,
    time: 25000
  },
  {
    truth: true,
    time: 12000
  },
  {
    truth: true,
    time: 17000
  },
  {
    truth: true,
    time: 22000
  },
  {
    truth: true,
    time: 12000
  },
  {
    truth: true,
    time: 25000
  },
  {
    truth: true,
    time: 11000
  }
];

let userResultSecond = [
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 7000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  }
];

let userResultThird = [
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 7000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  }
];

let userResultFour = [
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 7000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  }
];

let userResultFifth = [
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 7000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 8000
  },
  {
    truth: true,
    time: 5000
  },
  {
    truth: true,
    time: 38000
  },
  {
    truth: false,
    time: 8000
  },
  {
    truth: false,
    time: 8000
  }
];



const scoreAfterGame = (userResult, remainingLifes) => {
  let userPoints = 0;
  if (userResult.length < 10) {
    return -1;
  } else {
    for (let i = 0; i < userResult.length; i++) {
      let currentUser = userResult[i];
      if (currentUser.truth && currentUser.time > fastAnswerTime && currentUser.time < slowAnswerTime) {
        userPoints = userPoints + 100;
      } else if (currentUser.truth && currentUser.time < fastAnswerTime) {
        userPoints = userPoints + 150;
      } else if (currentUser.truth && currentUser.time > slowAnswerTime && currentUser.time < answerTimeLimit) {
        userPoints = userPoints + 50;
      }
    }
  }
  userPoints = userPoints + (remainingLifes * 50);
  return userPoints;
};

describe(`Score user points after game`, () => {

  it(`should update score. First - two timeouts, all - true`, () => {
    assert.equal(scoreAfterGame(userResultFirst, 1), 750);
  });

  it(`should update score. Second - all true and fast answer`, () => {
    assert.equal(scoreAfterGame(userResultSecond, 3), 1650);
  });

  it(`should update score. Third - nine answers`, () => {
    assert.equal(scoreAfterGame(userResultThird, 3), -1);
  });

  it(`should update score. Four - ten answers, but all false`, () => {
    assert.equal(scoreAfterGame(userResultFour, 0), 0);
  });

  it(`should update score. Fifth - two false and one timeout`, () => {
    assert.equal(scoreAfterGame(userResultFifth, 0), 1050);
  });

});

function timer(timeInput) {
  let timeRemain = timeInput;
  return {
    tick() {
      timeRemain--;
      let done = false;
      if (timeRemain === 0) {
        done = true;
      }
      return {
        "timeRemain": timeRemain,
        "done": done
      };
    },
    "timer": timeRemain
  };
}


describe(`Game timer`, () => {

  it(`Time must be considered`, () => {
    assert.equal(timer(3).timer, 3);
  });

  it(`Timer tick method check`, () => {
    assert.equal(timer(1).tick().done, true);
    assert.equal(timer(10).tick().done, false);
    assert.equal(timer(10).tick().timeRemain, 9);
  });

});
