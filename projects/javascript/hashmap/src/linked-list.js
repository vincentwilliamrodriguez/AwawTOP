export default class LinkedList {
  #head = null;

  static Node = class {
    constructor(value = null, nextNode = null) {
      this.value = value;
      this.nextNode = nextNode;
    }
  };

  append(value) {
    if (this.head === null) {
      this.prepend(value);
    } else {
      this.tail.nextNode = new LinkedList.Node(value, null);
    }
  }

  prepend(value) {
    this.head = new LinkedList.Node(value, this.head);
  }

  get size() {
    let count = 0;
    let cur = this.head;

    while (cur !== null) {
      count++;
      cur = cur.nextNode;
    }

    return count;
  }

  get head() {
    return this.#head;
  }

  set head(node) {
    this.#head = node;
  }

  get tail() {
    if (this.head === null) {
      return null;
    }

    let tail = this.head;

    while (tail.nextNode !== null) {
      tail = tail.nextNode;
    }

    return tail;
  }

  at(index) {
    let res = this.head;

    for (let curIndex = 0; curIndex < index; curIndex++) {
      res = res.nextNode;

      if (res === null) {
        break;
      }
    }

    return res;
  }

  pop() {
    return this.removeAt(this.size - 1);
  }

  contains(value) {
    return this.find(value) !== null;
  }

  find(value) {
    if (this.head === null) {
      return null;
    }

    let cur = this.head;
    let curIndex = 0;

    while (cur !== null) {
      if (cur.value === value) {
        return curIndex;
      }

      cur = cur.nextNode;
      curIndex++;
    }

    return null;
  }

  toString(value) {
    let res = '';
    let cur = this.head;

    while (cur !== null) {
      res += `( ${cur.value} ) -> `
      cur = cur.nextNode;
    }

    res += 'null'
    return res;
  }

  insertAt(value, index) {
    const newNode = new LinkedList.Node(value, null);

    if (index < 0) {
      index = index + this.size + 1;
    }

    let prev = null;
    let cur = this.head;
    let curIndex = 0;

    while (cur !== null && curIndex !== index) {
      prev = cur;
      cur = cur.nextNode;
      curIndex++;
    }

    if (prev === null) {
      this.head = newNode;
      newNode.nextNode = cur;
    } else {
      prev.nextNode = newNode;
      newNode.nextNode = cur;
    }
  }

  removeAt(index) {
    if (this.head === null) {
      return null;
    }

    if (index < 0) {
      index = index + this.size;
    }

    let prev = null;
    let cur = this.head;
    let curIndex = 0;

    while (curIndex !== index) {
      if (cur === null) {
        return null;
      }

      prev = cur;
      cur = cur.nextNode;
      curIndex++;
    }

    if (prev === null) {
      this.head = cur.nextNode;
    } else {
      prev.nextNode = cur.nextNode;
    }

    return cur;
  }
}