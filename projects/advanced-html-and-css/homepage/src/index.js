// window.globals = {};

import './style.scss';

// const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// window.addEventListener('load', updateScaleSize);
// window.addEventListener('resize', updateScaleSize);

// function updateScaleSize() {
//   if (window.innerWidth >= 600) {
//     for (const participantElem of $$('.participant')) {
//       const newWidth = 0.7 * getComputedStyle(participantElem).getPropertyValue('--width');
//       const newHeight = 0.7 * getComputedStyle(participantElem).getPropertyValue('--height');

//       console.log('awaw', getComputedStyle(participantElem).getPropertyValue('height'))

//       participantElem.style.width = `${newWidth}px`;
//       participantElem.style.height = `${newHeight}px`;
//     }
//   }
// }

// const participants = $$('.participant button:has(.material-symbols-outlined)');

for (const socialBtn of $$('.social-links button')) {
  socialBtn.onclick = () => window.open(`http://www.jojowiki.com/Funny_Valentine`);
}

for (const participantElem of $$('.participant')) {
  const participantName = participantElem.querySelector('.participant__name').textContent;
  const participantBtns = participantElem.querySelectorAll('button');

  for (const participantBtn of participantBtns) {
    participantBtn.onclick = () => window.open(`http://www.jojowiki.com/${participantName}`);
  }
}