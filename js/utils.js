const getElementsFromMarkup = (markup) => {
  const pageElement = document.createElement(`template`);
  pageElement.innerHTML = markup;
  return pageElement.content;
};

const pageContainer = document.querySelector(`main.central`);
const showScreen = (templateBlock) => {
  pageContainer.innerHTML = ``;
  pageContainer.appendChild(templateBlock);
};

export {getElementsFromMarkup, showScreen};
