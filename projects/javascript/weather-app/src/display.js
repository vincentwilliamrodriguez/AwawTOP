import * as Helper from './helper.js';
import * as DataManager from './logic.js';

DataManager.update().then(() => {
  updateDisplay();
  console.log(DataManager.weatherData);
  console.log(
    `AWAW ${DataManager.weatherData.current.condition_icon} ${window.globals.tempUnit}`
  );
});
// DataManager.getAutocompleteList('Awaw').then((results) => {
//   console.log('Awp', results);
// });

export function updateDisplay() {
  console.log('AWAW');
}