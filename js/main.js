import getMainScreenElement from './main-screen.js';

const bodyTag = document.querySelector(`body`);

const showScreen = (el) => {
  const oldScreen = bodyTag.querySelector(`.central`);
  bodyTag.replaceChild(el, oldScreen);
};
showScreen(getMainScreenElement());

export {showScreen};
