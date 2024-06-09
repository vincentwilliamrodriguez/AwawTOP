import * as Helper from './helper.js';
import * as DataManager from './logic.js';
import * as Datefns from 'date-fns';

const query = document.querySelector.bind(document);
const errorMessages = {
  1003: 'Please enter a location.',
  1006: 'Location not found.',
};

export function init() {
  // For search box
  const formElem = query('form.search-box-wrapper');
  const searchBoxElem = query('.search-box');
  const autocompleteElem = query('#cities');

  searchBoxElem.oninput = () => {
    searchBoxElem.setCustomValidity('');

    // Updates autocomplete list
    DataManager.getAutocompleteList(searchBoxElem.value).then((results) => {
      autocompleteElem.innerHTML = '';

      results.forEach((location) => {
        const cityName = `${location.name}, ${location.country}`;

        const locationElem = Helper.makeElement('option', '', '', {
          value: cityName,
        });

        autocompleteElem.appendChild(locationElem);
      });
    });
  };

  // Form validity
  formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formElem);
    const searchValue = query('.search-box').value;

    if (searchBoxElem.value === '') {
      searchBoxElem.setCustomValidity(errorMessages[1003]);
      searchBoxElem.reportValidity();
      return;
    }

    window.globals.city = searchValue;

    updateLoadingElem(true);
    DataManager.update()
      .then(() => {
        console.log('Awaw success', DataManager.weatherData);
        updateDisplay();
      })
      .catch((error) => {
        console.log(error.code, error);

        const validityMessage =
          errorMessages[error.code] || 'Cannot get location.';

        searchBoxElem.setCustomValidity(validityMessage);
        searchBoxElem.reportValidity();
        updateLoadingElem(false);
      });
  });

  // Temperature switch
  query('.temp-switch__checkbox').onchange = (e) => {
    window.globals.tempUnit = e.currentTarget.checked
      ? 'Fahrenheit'
      : 'Celsius';
    updateDisplay();
  };

  // For daily overview
  const dailyListElem = query('.daily .list');
  const dailyTemplateElem = query('.daily .item.template');
  window.globals.activeDayIndex = 2;

  for (let i = 0; i < 5; i++) {
    const newItem = dailyTemplateElem.cloneNode(true);
    newItem.classList.remove('template');

    newItem.addEventListener('click', () => updateActiveDay(newItem, i));
    dailyListElem.appendChild(newItem);

    if (i === window.globals.activeDayIndex) {
      updateActiveDay(newItem, i);
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

  // Initial update
  updateLoadingElem(true);
  DataManager.update().then(() => {
    updateDisplay();
  });
}

export function updateDisplay() {
  updateConnectors();

  if (DataManager.weatherData.daily === undefined) {
    return;
  }

  const updateText = (selector, value, base = document) => {
    base.querySelector(selector).textContent = value;
  };
  const updateProperty = (selector, property, base = document) => {
    Object.assign(base.querySelector(selector), property);
  };
  const convertTZ = (epoch) => {
    return new Date(epoch * 1000).toLocaleString('en-US', {
      timeZone: window.globals.timeZone,
    });
  };
  const formatTemp = (value) => `${value} °${window.globals.tempUnit[0]}`;

  // For current overview
  const currentData = DataManager.weatherData.current;

  updateText('.location__city', currentData.city);
  updateText('.location__country', currentData.country);

  const currentDate = convertTZ(currentData.localtime_epoch);
  updateText('.timedate__time', Datefns.format(currentDate, 'h:mm a'));
  updateText('.timedate__date', Datefns.format(currentDate, 'MMMM d, yyyy'));

  updateProperty('.condition__icon', { src: currentData.condition_icon });
  updateText('.condition__text', currentData.condition_text);

  updateText('.info--temp .info__temp', formatTemp(currentData.temp));
  updateText(
    '.info--temp .info__feelslike',
    `(${formatTemp(currentData.feelslike)})`
  );
  updateText('.info--humidity .info__value', `${currentData.humidity}%`);
  updateText('.info--wind .info__value', `${currentData.wind_kph} kph ${currentData.wind_dir}`);
  updateText('.info--uv .info__value', currentData.uv);

  // For daily overview
  DataManager.weatherData.daily.forEach((dayData, i) => {
    const dayElem = document.querySelectorAll('.daily .item:not(.template)')[i];

    const dayDate = convertTZ(dayData.date_epoch);
    updateText('.item__date', Datefns.format(dayDate, 'MMMM d (E)'), dayElem)
    updateProperty('.item__condition-icon', {src: dayData.condition_icon}, dayElem);
    updateText('.pair--avgtemp .pair__value', formatTemp(dayData.avgtemp), dayElem)
    updateText('.pair--rain-chance .pair__value', `${dayData.rain_chance}%`, dayElem)
  });

  const activeDayHourly = DataManager.weatherData.daily[window.globals.activeDayIndex].hourly;

  // For hourly overview
  activeDayHourly.forEach((hourData, i) => {
    const hourElem = document.querySelectorAll('.hourly .item:not(.template)')[i];

    const hourDate = convertTZ(hourData.time_epoch);
    updateText('.item__hour', Datefns.format(hourDate, 'h:mm a'), hourElem)
    updateProperty('.item__condition-icon', {src: hourData.condition_icon}, hourElem);
    updateText('.pair__temp', formatTemp(hourData.temp), hourElem)
    updateText('.pair__feelslike', `(${formatTemp(hourData.feelslike)})`, hourElem)
    updateText('.pair--rain-chance .pair__value', `${hourData.rain_chance}%`, hourElem)
  });

  // For hiding loading element when done
  updateLoadingElem(false);
}

function updateActiveDay(itemElem, i) {
  const currentActive = query('.daily .item--active');
  if (currentActive !== null) {
    currentActive.classList.remove('item--active');
  }

  itemElem.classList.add('item--active');

  window.globals.activeDayIndex = i;

  updateDisplay();
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

function updateLoadingElem(isLoading) {
  const loaderElem = query('.lds-ellipsis');

  if (isLoading) {
    loaderElem.classList.add('lds-ellipsis--active');
  } else {
    loaderElem.classList.remove('lds-ellipsis--active');
  }
}