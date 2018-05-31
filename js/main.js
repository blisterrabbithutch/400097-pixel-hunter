'use strict';

const ARROW = {
  LEFT: 37,
  RIGHT: 39
};

const templateElements = Array.from(document.querySelectorAll(`template`));

const pageContainer = document.querySelector(`main.central`);

let currentPageNumber = 0;

const updatePageContent = (template) => {
  pageContainer.innerHTML = ``;
  pageContainer.appendChild(template);
};

const showTemplateByNumber = (pageNumber) => {
  pageNumber = pageNumber < 0 ? templateElements.length - 1 : pageNumber;
  pageNumber = pageNumber >= templateElements.length ? 0 : pageNumber;
  currentPageNumber = pageNumber;
  let selectedTemplate = templateElements[currentPageNumber].cloneNode(true).content;
  updatePageContent(selectedTemplate);
};

showTemplateByNumber(currentPageNumber);

document.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === ARROW.LEFT) {
    showTemplateByNumber(currentPageNumber - 1);
  } else if (evt.keyCode === ARROW.RIGHT) {
    showTemplateByNumber(currentPageNumber + 1);
  }
});

const bodyTag = document.querySelector(`body`);
bodyTag.insertAdjacentHTML(`beforeEnd`, `
<div class="arrows__wrap">
  <style>
.arrows__wrap {
  position: absolute;
  top: 95px;
  left: 50%;
  margin-left: -56px;
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
`);

const arrowWrapper = document.querySelector(`.arrows__wrap`);
const leftArrow = document.querySelector(`.arrows__btn:first-of-type`);
const rightArrow = document.querySelector(`.arrows__btn:last-of-type`);
arrowWrapper.addEventListener(`click`, function (evt) {
  if (evt.target === leftArrow) {
    showTemplateByNumber(currentPageNumber - 1);
  } else if (evt.target === rightArrow) {
    showTemplateByNumber(currentPageNumber + 1);
  }
});
