const INITIAL_LEVEL = 1;
const INITIAL_LIVES = 3;
const INITIAL_TIME = 30;
let userTimer = 30;
let userLives = 3;

const initialState = {
  level: INITIAL_LEVEL,
  lives: INITIAL_LIVES,
  time: INITIAL_TIME
};

let userState = {
  time: userTimer,
  lives: userLives,
  answers: []
};

export {initialState, userState};
