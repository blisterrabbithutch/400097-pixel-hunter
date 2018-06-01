const updatePageContent = (template) => {
  const pageContainer = document.querySelector(`main.central`);
  const pageElement = document.createElement('div');
  pageElement.innerHTML = template;
  return pageElement;
};

export {updatePageContent};
