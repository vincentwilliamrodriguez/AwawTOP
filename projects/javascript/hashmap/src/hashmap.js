import LinkedList from './linked-list.js';

function outOfBoundsHandler(target, index) {
  if (index < 0 || index >= target.length) {
    throw new Error('Trying to access index out of bound');
  }
  return target[index];
}

class Pair {
  constructor(key, value = null) {
    this.key = key;
    this.value = value;
  }
}

class HashMap {
  #buckets = [];

  capacity = 16;
  loadFactor = 0.8;

  constructor() {
    this.updateProxy();
    this.growBuckets(this.capacity);
  }

  updateProxy() {
    this.buckets = new Proxy(this.#buckets, {
      get: outOfBoundsHandler,
      set: outOfBoundsHandler,
    });
  }

  growBuckets(newSize) {
    const oldEntries = this.entries();
    this.capacity = newSize;
    this.#buckets = [];
    this.updateProxy();

    for (let i = 0; i < newSize; i++) {
      this.#buckets.push(new LinkedList());
    }

    for (const [key, value] of oldEntries) {
      this.set(key, value);
    }
  }

  getBucket(key) {
    return this.buckets[this.hash(key)];
  }

  toString() {
    let res = '';

    for (const [i, bucket] of this.buckets.entries()) {
      res += `${i}: ${bucket.toString()}\n`;
    }

    return res;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const bucket = this.getBucket(key);
    const newData = new Pair(key, value);

    const { index, data: oldData } = bucket.find(key);

    if (index === null) {
      bucket.append(newData);

      if (this.length() >= this.capacity * this.loadFactor) {
        this.growBuckets(this.capacity * 2);
      }
      
    } else {
      oldData.value = newData.value;
    }
  }

  get(key) {
    const bucket = this.getBucket(key);
    const { index, data } = bucket.find(key);

    if (index === null) {
      return null;
    } else {
      return data.value;
    }
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const bucket = this.getBucket(key);
    const { index } = bucket.find(key);

    if (index !== null) {
      bucket.removeAt(index);
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.buckets.reduce((totalItems, curBucket) => {
      return totalItems + curBucket.size;
    }, 0);
  }

  clear() {
    this.buckets.forEach((bucket) => {
      bucket.clear();
    });
  }

  keys() {
    return this.entries().map((entry) => entry[0]);
  }

  values() {
    return this.entries().map((entry) => entry[1]);
  }

  entries() {
    return this.buckets.reduce((totalEntries, curBucket) => {
      return totalEntries.concat(curBucket.entries());
    }, []);
  }
}

const awawMap = new HashMap();
awawMap.set('0', 123);
awawMap.set('11', 456);
awawMap.set('12', 'awaw');
awawMap.set('123', 'awaw');
awawMap.set('awaw', true);


awawMap.set('1', 123);
awawMap.set('13', 456);
awawMap.set('14', 'awawawaawawawaawwa');
awawMap.set('15', 'awaw');
awawMap.set('16', 'awaw');
awawMap.set('17', 'awaw');
awawMap.set('18', 'awaw');
console.log(awawMap.toString());
awawMap.set('awawp', true);
console.log(awawMap.toString());

