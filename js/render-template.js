import {updatePageContent} from './update-page-content.js';

import {mainScreenElement} from './main-screen.js';
import {greetingScreenElement} from './greeting-screen.js';
import {rulesScreenElement} from './rules-screen.js';
import {firstGameScreenElement} from './first-game-screen.js';
import {secondGameScreenElement} from './second-game-screen.js';
import {thirdGameScreenElement} from './third-game-screen.js';
import {statsScreenElement} from './stats-screen.js';



const renderTemplate = (templateBlock) => {
  const pageContainer = document.querySelector(`main.central`);
  pageContainer.innerHTML = ``;
  pageContainer.appendChild(templateBlock);
};

export {renderTemplate};
