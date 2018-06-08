import getMainScreenElement from './main-screen.js';

const pageContainer = document.querySelector(`.central`);

const showScreen = (templateEl) => {
  pageContainer.innerHTML = ``;
  pageContainer.appendChild(templateEl);
};

showScreen(getMainScreenElement());

export {showScreen};




