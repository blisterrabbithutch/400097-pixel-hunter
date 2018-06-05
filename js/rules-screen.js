import {getElementsFromMarkup, showScreen} from './utils.js';
import getFirstGameScreenElement from './first-game-screen.js';
import getGreetingScreenElement from './greeting-screen.js';

const template = `
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>
`;

export default () => {
  const el = getElementsFromMarkup(template);

  const inputEl = el.querySelector(`.rules__input`);
  const submitEl = el.querySelector(`.rules__button`);

  inputEl.addEventListener(`input`, function () {
    if (inputEl.value.length > 0) {
      submitEl.removeAttribute(`disabled`);
    } else if (inputEl.value.length === 0) {
      submitEl.setAttribute(`disabled`, ``);
    }
  });

  el.querySelector(`.rules__form`).addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    showScreen(getFirstGameScreenElement());
  });

  const backButton = el.querySelector(`.back`);
  backButton.addEventListener(`click`, function () {
    showScreen(getGreetingScreenElement());
  });

  return el;

};