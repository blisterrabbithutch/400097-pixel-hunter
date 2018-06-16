const bodyTag = document.querySelector(`body`);
const showScreen = (el) => {
  const oldScreen = bodyTag.querySelector(`.central`);
  bodyTag.replaceChild(el, oldScreen);
};

export default showScreen;
