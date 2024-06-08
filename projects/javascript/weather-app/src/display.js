import * as Helper from './helper.js';
import * as DataManager from './logic.js';

const query = document.querySelector.bind(document);

// DataManager.update().then(() => {
//   updateDisplay();
//   console.log(DataManager.weatherData);
//   console.log(
//     `AWAW ${DataManager.weatherData.current.condition_icon} ${window.globals.tempUnit}`
//   );
// });
// DataManager.getAutocompleteList('Awaw').then((results) => {
//   console.log('Awp', results);
// });

export function init() {
  const dailyList = query('.daily .list');
  const templateItem = query('.daily .item.template');

  for (let i = 0; i < 5; i++) {
    const newItem = templateItem.cloneNode(true);
    newItem.classList.remove('template');

    if (i === 2) {
      newItem.classList.add('item--active');
    }

    newItem.addEventListener('click', () => {
      query('.daily .item--active').classList.remove('item--active');
      newItem.classList.add('item--active');
    });

    dailyList.appendChild(newItem);
  }
}

export function updateDisplay() {
  console.log('AWAW');
}