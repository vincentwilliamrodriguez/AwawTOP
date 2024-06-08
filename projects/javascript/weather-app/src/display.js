import * as Helper from './helper.js';
import * as DataManager from './logic.js';

const query = document.querySelector.bind(document);

// DataManager.update().then(() => {
//   updateDisplay();
//   console.log(DataManager.weatherData);
//   console.log(
//     `AWAW ${DataManager.weatherData.daily[0].hourly[0]} ${window.globals.tempUnit}`
//   );
// });
// DataManager.getAutocompleteList('Awaw').then((results) => {
//   console.log('Awp', results);
// });

export function init() {
  // For daily overview
  const dailyListElem = query('.daily .list');
  const dailyTemplateElem = query('.daily .item.template');

  for (let i = 0; i < 5; i++) {
    const newItem = dailyTemplateElem.cloneNode(true);
    newItem.classList.remove('template');

    newItem.addEventListener('click', () => updateActiveDay(newItem));
    dailyListElem.appendChild(newItem);

    if (i === 2) {
      updateActiveDay(newItem);
    }
  }

  // For hourly overview
  const hourlyListElem = query('.hourly .list');
  const hourlyTemplateElem = query('.hourly .item.template');

  for (let i = 0; i < 24; i++) {
    const newItem = hourlyTemplateElem.cloneNode(true);
    newItem.classList.remove('template');

    hourlyListElem.appendChild(newItem);
  }

  // Updates connectors when window is resized
  window.onresize = updateConnectors.bind(this);
}

export function updateDisplay() {
  console.log('AWAW');
}

function updateActiveDay(itemElem) {
  const currentActive = query('.daily .item--active');
  if (currentActive !== null) {
    currentActive.classList.remove('item--active');
  }

  itemElem.classList.add('item--active');

  updateConnectors();
}

function updateConnectors() {
  const getPos = (selector) => query(selector).getBoundingClientRect();

  const line1 = query('.daily-hourly-connectors .line-1');
  const line2 = query('.daily-hourly-connectors .line-2');

  const mainPos = getPos('.main');
  const hourlyListPos = getPos('.hourly .list');
  const itemPos = getPos('.daily .item--active');

  line1.setAttribute('x1', `${itemPos.right}px`);
  line1.setAttribute('y1', `${itemPos.top - mainPos.top}px`);
  line1.setAttribute('x2', `${hourlyListPos.left}px`);
  line1.setAttribute('y2', `${hourlyListPos.top - mainPos.top}px`);

  line2.setAttribute('x1', `${itemPos.right}px`);
  line2.setAttribute('y1', `${itemPos.bottom - mainPos.top}px`);
  line2.setAttribute('x2', `${hourlyListPos.left}px`);
  line2.setAttribute('y2', `${hourlyListPos.bottom - mainPos.top}px`);
}