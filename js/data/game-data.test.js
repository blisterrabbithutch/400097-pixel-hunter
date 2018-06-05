import {assert} from 'chai';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

//здесь нужно описывать новые тесты для новых функций, а потом TDD(написание функций через тестирование)

const scoreAfterGame = (userAnswers, remainingLifes) => {
  let userPoints = 0;
//  нужно обработать ответы пользователя. каждый правильный +100 очков, быстрый ответ еще +50, медленный -50.
  if (userAnswers.length < 10) {
    return -1;
  } else {
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] ) {
        userPoints = userPoints + 100;
      }
    }
  }
  userPoints = userPoints + (remainingLifes * 50);
//за каждую оставшуюся жизнь +50

//  на выходе функция получает количество набранных очков.
  return userPoints;
};


//начало тестирования

describe(`Score user points after game`, () => {

  it(`should update score`, () => {
    assert.equal(scoreAfterGame(['first answer', 'second answer'], 10), -1);
    assert.equal(scoreAfterGame(['first answer', 'second', '3', '4', '5', '6', '7', '8', '9', '10', '11'], 10), 1600);
  });

});
