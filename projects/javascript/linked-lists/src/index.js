class LinkedList {
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


const awawList = new LinkedList();
awawList.append('B');
awawList.append('C');


console.log()
console.log('Initial List:'.padEnd(30) + awawList.toString());

awawList.append('D');
console.log('After appending:'.padEnd(30) + awawList.toString());

awawList.prepend('A');
console.log('After prepending:'.padEnd(30) + awawList.toString());

console.log()
console.log('Size:'.padEnd(30) + awawList.size);
console.log('Head value:'.padEnd(30) + awawList.head.value);
console.log('Tail value:'.padEnd(30) + awawList.tail.value);
console.log('Value at index 2:'.padEnd(30) + awawList.at(2).value);
console.log()

awawList.pop();
console.log('After popping:'.padEnd(30) + awawList.toString());
console.log('If list contains \'D\':'.padEnd(30) + awawList.contains('D'));
console.log('Index of \'B\':'.padEnd(30) + awawList.find('B'));

console.log();
console.log('To string:'.padEnd(30) + awawList.toString());


awawList.insertAt('BB', 2);
console.log('After inserting at index 2:'.padEnd(30) + awawList.toString());

awawList.removeAt(1);
console.log('After removing at index 1:'.padEnd(30) + awawList.toString());

console.log()
