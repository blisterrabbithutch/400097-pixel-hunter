import {updatePageContent} from './update-page-content.js';

import {renderTemplate} from './render-template.js';

import {greetingScreenElement} from './greeting-screen.js';

const mainScreenElement = updatePageContent(`
<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</div>
`);


document.querySelector(`.intro__asterisk`).addEventListener(`click`, function () {
  renderTemplate(greetingScreenElement);
});

export {mainScreenElement};
