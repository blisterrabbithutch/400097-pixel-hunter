'use strict';

const ARROW = {
  LEFT: 37,
  RIGHT: 39
};

const templateCollectionScreens = document.querySelectorAll(`template`);

let templateScreens = Array.from(templateCollectionScreens);

const pageContainer = document.querySelector(`main.central`);

let currentPageNumber = 0;

const replacePageContent = () => {
  let selectedTemplate = templateScreens[currentPageNumber].cloneNode(true).content;
  pageContainer.innerHTML = ``;
  pageContainer.appendChild(selectedTemplate);
};

const renderTemplate = (pageNumber) => {
  pageNumber = pageNumber < 0 ? templateScreens.length - 1 : pageNumber;
  pageNumber = pageNumber >= templateScreens.length ? 0 : pageNumber;
  currentPageNumber = pageNumber;
  replacePageContent();
};

renderTemplate(currentPageNumber);

document.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === ARROW.LEFT) {
    renderTemplate(currentPageNumber - 1);
  } else if (evt.keyCode === ARROW.RIGHT) {
    renderTemplate(currentPageNumber + 1);
  }
});

const bodyTag = document.querySelector(`body`);
bodyTag.insertAdjacentHTML(`beforeEnd`, `<div class="arrows__wrap">
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
  </div>`);

const arrowWrapper = document.querySelector(`.arrows__wrap`);
arrowWrapper.addEventListener(`click`, function (evt) {
  if (evt.target === document.querySelector(`.arrows__btn:first-of-type`)) {
    renderTemplate(currentPageNumber - 1);
  } else if (evt.target === document.querySelector(`.arrows__btn:last-of-type`)) {
    renderTemplate(currentPageNumber + 1);
  }
});
