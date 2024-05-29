export function makeElement(tagName, classes, textContent="", attributes={}) {
  const element = document.createElement(tagName);

  if (classes !== "") {
    element.classList.add(...classes.split(" "));
  }

  const node = document.createTextNode(textContent);
  element.appendChild(node);
  
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

export function generateID() {
  return Math.floor(Math.random() * Math.pow(10, 15)).toString("16");
}

export class CRUD {
  list = {}

  constructor (itemClass) {
    this.itemClass = itemClass;
  }

  create(options) {
    const ID = generateID();
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