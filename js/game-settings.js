const INITIAL_LEVEL = 1;
const INITIAL_LIVES = 3;
const INITIAL_TIME = 30

const initialState = {
  level: INITIAL_LEVEL,
  lives: INITIAL_LIVES,
  time: INITIAL_TIME
};

let userState = {
  time: 30,
  lives: 3,
  answers: []
};

export {initialState, userState};
