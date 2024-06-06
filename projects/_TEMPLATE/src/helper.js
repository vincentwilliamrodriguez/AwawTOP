<<<<<<< HEAD
window.globals = {};

export function makeElement(
  tagName,
  classes,
  textContent = '',
  attributes = {}
) {
  const element = document.createElement(tagName);

  if (classes !== '') {
    element.classList.add(...classes.split(' '));
=======
export function makeElement(tagName, classes, textContent="", attributes={}) {
  const element = document.createElement(tagName);

  if (classes !== "") {
    element.classList.add(...classes.split(" "));
>>>>>>> origin/feature/library-validation
  }

  const node = document.createTextNode(textContent);
  element.appendChild(node);
<<<<<<< HEAD

=======
  
>>>>>>> origin/feature/library-validation
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

<<<<<<< HEAD
export class CRUD {
  list = {};
  generateID = () =>
    Math.floor(Math.random() * Math.pow(10, 15)).toString('16');

  constructor(itemClass) {
=======


export class CRUD {
  list = {}
  generateID = () => (Math.floor(Math.random() * Math.pow(10, 15)).toString("16"));

  constructor (itemClass) {
>>>>>>> origin/feature/library-validation
    this.itemClass = itemClass;
  }

  create(options) {
    const ID = this.generateID();
    this.list[ID] = new this.itemClass(options);
    return ID;
  }

  read(ID) {
    return this.list[ID];
  }

  update(ID, options) {
    if (!this.list[ID]) {
      return;
    }

    Object.assign(this.list[ID], options);
    return this.list[ID];
  }

  delete(ID) {
    const deletedItem = this.list[ID];
    delete this.list[ID];
    return deletedItem;
  }
}

export function isStorageAvailable(type) {
  let storage;
  try {
    storage = window[type];
<<<<<<< HEAD
    const x = '__storage_test__';
=======
    const x = "__storage_test__";
>>>>>>> origin/feature/library-validation
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
<<<<<<< HEAD
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
=======
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
>>>>>>> origin/feature/library-validation
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
