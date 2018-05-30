// собрать все ссылки template в общий массив
// нужно перебрать все темплейты и добавить их в массив

const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

const allTemplateScreensCollection = document.querySelectorAll("template");

let allTemplateScreensArray = [];
// циклом вставляем новые элементы массива
for (let i = 0; i < allTemplateScreensCollection.length; i++) {
  allTemplateScreensArray[i] = allTemplateScreensCollection[i];
}


// отрисовка функции, аргумент который будет порядковый номер темплейта, которая будет отрисовывать контент в main.central

let renderedContent = document.querySelector('main.central');

let currentPageNumber = 0;
const renderTemplate = (pageNumber) => {
//здесь происходит замена контента в main

  //  1. берем нужный элемент темплейта
  // логика для работы с переключениями страниц
  pageNumber = pageNumber < 0 ? allTemplateScreensArray.length - 1 : pageNumber;
  pageNumber = pageNumber >= allTemplateScreensArray.length ? 0 : pageNumber;
  currentPageNumber = pageNumber;
  let selectedTemplate = allTemplateScreensArray[currentPageNumber].innerHTML;
  //создаем дом элемент
  let container = document.createElement('div');
  container.classList.add('inserted__content');
  container.innerHTML = selectedTemplate;
  renderedContent.innerHTML = '';
  renderedContent.appendChild(container);
};

renderTemplate(0);

// ? как решить это через replaceChild

// логика события нажатия на кнопки


document.addEventListener('keydown', function(evt) {
  if (evt.keyCode == ARROW_LEFT) {
  renderTemplate(currentPageNumber - 1);
  }
  else if (evt.keyCode == ARROW_RIGHT) {
    renderTemplate(currentPageNumber + 1);
  }
});

// отрисовка стрелок и логика нажатия на них

//вставляем стрелки

const arrowsNavigationHTML = `
<div class="arrows__wrap">
  <style>
.arrows__wrap {
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
}
.arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
}
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>
`;

// сейчас мы получили результат в виде строки, а нам надо в виде дом-узла
const arrowsBlock = document.createElement('div');
arrowsBlock.innerHTML = arrowsNavigationHTML;

const bodyTag = document.querySelector('body');
bodyTag.appendChild(arrowsBlock);

// добавим событие клика на добавленные стрелки и используем механизм всплытия событий, добавив его на контейнер с кнопками

document.querySelector('.arrows__wrap').addEventListener('click', function(evt) {
  console.log(evt.target);
  if (evt.target == document.querySelector('.arrows__btn:first-of-type')) {
    renderTemplate(currentPageNumber - 1);
  }
  else if (evt.target == document.querySelector('.arrows__btn:last-of-type')) {
    renderTemplate(currentPageNumber + 1);
  }
});
