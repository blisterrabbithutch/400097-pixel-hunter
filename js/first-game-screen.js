import {getElementsFromMarkup, showScreen} from './utils.js';
import secondGameScreen from './second-game-screen.js';

const firstGameScreenElement = getElementsFromMarkup(`
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">NN</h1>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
    </div>
  </header>
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
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
`);

// здесь событие на radio если оба checked то вызывается функция

const gameAnswerButtons = firstGameScreenElement.querySelectorAll('.game__answer>input');

const gameContentCards = firstGameScreenElement.querySelector('.game__content');
const gameCards = firstGameScreenElement.querySelectorAll('.game__option');
const gameCardFirst = firstGameScreenElement.querySelector('.game__option:first-child');
const gameCardSecond = firstGameScreenElement.querySelector('.game__option:last-child');



// первая карточка должна иметь выбранный ответ и вторая должна иметь выбранный ответ
// событие на карточку - если хотя бы одна кнопка нажата( два события по модификатору на каждую карточку), ей дается класс --checked и если этот класс есть у обоих карточек -
// рендер следующего экрана

//for (let i = 0; i < gameCard.length; i++) {
//  console.log(gameCard[i]);
//  const gameAnswerButtonPhoto = gameCard.querySelector('.game__answer--photo');
//  const gameAnswerButtonPaint = gameCard.querySelector('.game__answer--paint');
//  gameAnswerButtonPaint.addEventListener('click', function(evt) {
//    console.log(evt.target);
//    console.log('Paint');
//  });
//  gameAnswerButtonPhoto.addEventListener('click', function(evt) {
//    console.log(evt.target);
//    console.log('Photo');
//  });
//
//};

//как грамотно сделать это место? через for?

const gameAnswerButtonPhotoFirst = gameCardFirst.querySelector('.game__answer--photo>input');
const gameAnswerButtonPhotoSecond = gameCardSecond.querySelector('.game__answer--photo>input');
const gameAnswerButtonPaintFirst = gameCardFirst.querySelector('.game__answer--paint>input');
const gameAnswerButtonPaintSecond = gameCardSecond.querySelector('.game__answer--paint>input');

gameAnswerButtonPhotoFirst.addEventListener('click', function(evt) {
  gameAnswerButtonPhotoFirst.parentElement.classList.remove('game__answer--checked');
  gameAnswerButtonPaintFirst.parentElement.classList.remove('game__answer--checked');
  this.parentElement.classList.add('game__answer--checked');
}, true);
gameAnswerButtonPaintFirst.addEventListener('click', function(evt) {
  gameAnswerButtonPhotoFirst.parentElement.classList.remove('game__answer--checked');
  gameAnswerButtonPaintFirst.parentElement.classList.remove('game__answer--checked');
  this.parentElement.classList.add('game__answer--checked');
}, true);

gameAnswerButtonPhotoSecond.addEventListener('click', function(evt) {
  gameAnswerButtonPhotoSecond.parentElement.classList.remove('game__answer--checked');
  gameAnswerButtonPaintSecond.parentElement.classList.remove('game__answer--checked');
  this.parentElement.classList.add('game__answer--checked');
}, true);
gameAnswerButtonPaintSecond.addEventListener('click', function(evt) {
  gameAnswerButtonPhotoSecond.parentElement.classList.remove('game__answer--checked');
  gameAnswerButtonPaintSecond.parentElement.classList.remove('game__answer--checked');
  this.parentElement.classList.add('game__answer--checked');
}, true);

//теперь если обе карточки содержат по одному такому модификатору - функция рендера

for (let i = 0; i < gameAnswerButtons.length; i++) {
  gameAnswerButtons[i].addEventListener('change', function() {

    if ( gameAnswerButtonPhotoFirst.parentElement.classList.contains('game__answer--checked') && gameAnswerButtonPhotoSecond.parentElement.classList.contains('game__answer--checked') ) {
      showScreen(secondGameScreen);
    } else if ( gameAnswerButtonPhotoFirst.parentElement.classList.contains('game__answer--checked') && gameAnswerButtonPaintSecond.parentElement.classList.contains('game__answer--checked') ) {
      showScreen(secondGameScreen);
    } else if ( gameAnswerButtonPaintFirst.parentElement.classList.contains('game__answer--checked') && gameAnswerButtonPaintSecond.parentElement.classList.contains('game__answer--checked') ) {
      showScreen(secondGameScreen);
    } else if ( gameAnswerButtonPaintFirst.parentElement.classList.contains('game__answer--checked') && gameAnswerButtonPhotoSecond.parentElement.classList.contains('game__answer--checked') ) {
      showScreen(secondGameScreen);
    }

  });
};

export default firstGameScreenElement;
