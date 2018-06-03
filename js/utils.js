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

export {getElementsFromMarkup, showScreen};
