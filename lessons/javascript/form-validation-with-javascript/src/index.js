import './style.scss';

const query = document.querySelector.bind(document);
const getById = document.getElementById.bind(document);

const arePasswordsSame = () =>
  getById('password').value === getById('confirm-password').value;

const validityData = {
  email: {
    validityList: (validity) => [validity.valueMissing, validity.typeMismatch],
    messages: [
      'Please provide your e-mail.',
      'Please enter a proper e-mail address.',
    ],
  },

  country: {
    validityList: (validity) => [validity.valueMissing],
    messages: ['Please select your country.'],
  },

  zipcode: {
    validityList: (validity) => [
      validity.valueMissing,
      validity.patternMismatch,
    ],
    messages: [
      'Please enter your zipcode.',
      'Please provide a valid zipcode (e.g., 12345 or 12345-6789).',
    ],
  },

  password: {
    validityList: (validity) => [
      validity.valueMissing,
      validity.tooShort,
      validity.tooLong,
      validity.patternMismatch,
    ],
    messages: [
      'Please enter your password.',
      'Password must have at least 8 characters.',
      'Password must not exceed 20 characters.',
      'Please include at least one uppercase letter, lowercase letter, and number.',
    ],
  },

  'confirm-password': {
    validityList: (validity) => [validity.valueMissing, !arePasswordsSame()],
    messages: ['Please retype your password.', 'Passwords do not match.'],
  },
};

function updateValidity(inputElem, inputName) {
  inputElem.setCustomValidity(' ');

  const validityList = validityData[inputName].validityList(inputElem.validity);

  if (inputName === 'confirm-password') {
  }

  const errorIndex = validityList.findIndex((error) => error);

  if (errorIndex === -1) {
    inputElem.setCustomValidity('');
  } else {
    const messageList = validityData[inputName].messages;
    inputElem.setCustomValidity(messageList[errorIndex]);
  }
}

const inputNames = [
  'email',
  'country',
  'zipcode',
  'password',
  'confirm-password',
];

inputNames.forEach((inputName) => {
  updateValidity(getById(inputName), inputName);
  
  getById(inputName).oninput = (e) => {
    updateValidity(e.currentTarget, inputName);
  };

  getById(inputName).onchange = () => {
    getById(inputName).reportValidity();
  };
});

query('.form__button').addEventListener('click', (e) => {
  for (const inputName of inputNames) {
    // if input is invalid, this shows the error message and prevents button from submitting

    if (!getById(inputName).reportValidity()) {
      e.preventDefault();
      return;
    }
  }

  alert('High Five! :)');
});
