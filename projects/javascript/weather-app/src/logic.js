import * as Helper from './helper.js';
import * as Datefns from 'date-fns';

window.globals.key = '56782529b35f4a1293434013240406';
window.globals.city = 'Cainta';
window.globals.tempUnit = 'Celsius';

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
};

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
}

export const weatherData = {};

// For current
endpoints.current().then((data) => (weatherData.current = new Current(data)));

// For 2 to 1 days ago
weatherData.daily = [];
const today = new Date();

for (const noOfDays of [-2, -1]) {
  const date = Datefns.addDays(today, noOfDays);
  endpoints.history(date).then((data) => {
    const dayData = data.forecast.forecastday[0];
    weatherData.daily.push(new Daily(dayData));
  });
}

// For today and 1 to 2 days from now
endpoints.forecast().then((data) => {
  const daysData = data.forecast.forecastday;
  for (const dayData of daysData) {
    weatherData.daily.push(new Daily(dayData));
  }
});

setTimeout(() => console.log(weatherData), 500); 
