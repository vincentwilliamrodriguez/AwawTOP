export default class LinkedList {
  #head = null;

  static Node = class {
    constructor(data = null, nextNode = null) {
      this.data = data;
      this.nextNode = nextNode;
    }
  };

  append(data) {
    if (this.head === null) {
      this.prepend(data);
    } else {
      this.tail.nextNode = new LinkedList.Node(data, null);
    }
  }

  prepend(data) {
    this.head = new LinkedList.Node(data, this.head);
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

  clear() {
    this.head = null;
  }

  contains(key) {
    return this.find(key).index !== null;
  }

  find(key) {
    const res = {index: null, data: null};

    if (this.head === null) {
      return res;
    }

    let cur = this.head;
    let curIndex = 0;

    while (cur !== null) {
      if ((cur.data.key === key)) {
        res.index = curIndex;
        res.data = cur.data;
        break;
      }

      cur = cur.nextNode;
      curIndex++;
    }

    return res;
  }

  toString() {
    let res = '';
    let cur = this.head;

    while (cur !== null) {
      res += `( ${cur.data.key}: ${cur.data.value} ) -> `
      cur = cur.nextNode;
    }

    res += 'null'
    return res;
  }

  entries() {
    let res = [];
    let cur = this.head;

    while (cur !== null) {
      res.push([cur.data.key, cur.data.value]);
      cur = cur.nextNode;
    }

    return res;
  }

  insertAt(data, index) {
    const newNode = new LinkedList.Node(data, null);

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