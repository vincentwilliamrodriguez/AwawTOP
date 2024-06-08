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

    if (i === 2) {
      newItem.classList.add('item--active');
    }

    newItem.addEventListener('click', (e) => {
      query('.daily .item--active').classList.remove('item--active');
      e.currentTarget.classList.add('item--active');
    });

    dailyListElem.appendChild(newItem);
  }

  // For hourly overview
  const hourlyListElem = query('.hourly .list');
  const hourlyTemplateElem = query('.hourly .item.template');

  for (let i = 0; i < 24; i++) {
    const newItem = hourlyTemplateElem.cloneNode(true);
    newItem.classList.remove('template');

    hourlyListElem.appendChild(newItem);
  }

  // For daily-hourly connectors
  const getPos = (elem) => elem.getBoundingClientRect();
  const mainElem = query('.main');
  const line1 = query('.daily-hourly-connectors .line-1')
  const line2 = query('.daily-hourly-connectors .line-2')

  line1.setAttribute('x1', '50px')
}

export function updateDisplay() {
  console.log('AWAW');
}