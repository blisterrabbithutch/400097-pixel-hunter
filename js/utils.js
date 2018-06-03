const getElementsFromMarkup = (markup) => {
  const pageElement = document.createElement(`template`);
  pageElement.innerHTML = markup;
  return pageElement.content;
};

const pageContainer = document.querySelector(`main.central`);
const showScreen = (templateEl) => {
  pageContainer.innerHTML = ``;
  pageContainer.appendChild(templateEl);
};

//здесь не работает повторная смена контента, потому что он переносится функцией и удаляется, после того как экран отработает.
// поэтому нужно клонировать дом-элемент. почему в консоли templateEl есть контент внутри фрагмента, а после cloneNode нету?

export {getElementsFromMarkup, showScreen};
