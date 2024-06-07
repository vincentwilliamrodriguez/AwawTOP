import * as Helper from './helper.js';
import * as Datefns from 'date-fns';
import _ from 'lodash';

window.globals.key = '56782529b35f4a1293434013240406';
window.globals.city = 'Cainta';
window.globals.tempUnit = 'Fahrenheit';

const endpoints = {
  forecast: () =>
    Helper.getData(
      `http://api.weatherapi.com/v1/forecast.json?key=${window.globals.key}&q=${window.globals.city}&days=3&aqi=no&alerts=no`
    ),

  history: (date) => {
    const dateString = Datefns.format(date, 'yyyy-MM-dd');
    return Helper.getData(`http://api.weatherapi.com/v1/history.json?key=${window.globals.key}&q=${window.globals.city}&dt=${dateString}
  `);
  },

  current: () =>
    Helper.getData(
      `http://api.weatherapi.com/v1/current.json?key=${window.globals.key}&q=${window.globals.city}&aqi=no`
    ),

  autocomplete: (inputText) =>
    Helper.getData(
      `http://api.weatherapi.com/v1/search.json?key=${window.globals.key}&q=${inputText}`
    ),
};

function adjustTempUnit(tempInCelsius) {
  const value =
    window.globals.tempUnit === 'Celsius'
      ? tempInCelsius
      : 1.8 * tempInCelsius + 32;

  return parseFloat(value.toFixed(1));
}

class Current {
  constructor(data) {
    ({
      location: { name: this.city, country: this.country },
      current: {
        last_updated_epoch: this.last_updated_epoch,
        temp_c: this._temp,
        feelslike_c: this._feelslike,
        humidity: this.humidity,
        wind_kph: this.wind_kph,
        wind_dir: this.wind_dir,
        condition: { text: this.condition_text, icon: this.condition_icon },
      },
    } = data);
  }

  get temp() {
    return adjustTempUnit(this._temp);
  }
  get feelslike() {
    return adjustTempUnit(this._feelslike);
  }
}

class Daily {
  constructor(data) {
    ({
      date_epoch: this.date_epoch,
      day: {
        avgtemp_c: this._avgtemp_c,
        daily_chance_of_rain: this.rain_chance,
        condition: { icon: this.condition_icon },
      },
    } = data);

    this.hourly = [];
    for (const hourData of data.hour) {
      this.hourly.push(new Hourly(hourData));
    }
  }

  get avgtemp() {
    return adjustTempUnit(this._avgtemp_c);
  }
}

class Hourly {
  constructor(hourData) {
    ({
      time_epoch: this.time_epoch,
      temp_c: this._temp,
      feelslike_c: this._feelslike,
      condition: { icon: this.condition_icon },
    } = hourData);
  }

  get temp() {
    return adjustTempUnit(this._temp);
  }
  get feelslike() {
    return adjustTempUnit(this._feelslike);
  }
}

export const weatherData = {};

export async function update() {
  for (const identifier in weatherData) {
    delete weatherData[identifier];
  }

  // For current
  const currentData = await endpoints.current();
  weatherData.current = new Current(currentData);

  // For 2 to 1 days ago
  weatherData.daily = [];
  const today = new Date();

  for (const noOfDays of [-2, -1]) {
    const date = Datefns.addDays(today, noOfDays);
    const historyData = await endpoints.history(date);
    const dayData = historyData.forecast.forecastday[0];
    weatherData.daily.push(new Daily(dayData));
  }

  // For today and 1 to 2 days from now
  const forecastData = await endpoints.forecast();
  const daysData = forecastData.forecast.forecastday;
  for (const dayData of daysData) {
    weatherData.daily.push(new Daily(dayData));
  }
}

export async function getAutocompleteList(inputText) {
  let data = await endpoints.autocomplete(inputText);
  data = data.map((city) => _.pick(city, ['name', 'country']));

  return data;
}
