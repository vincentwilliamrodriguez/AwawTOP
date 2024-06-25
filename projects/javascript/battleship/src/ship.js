export default class Ship {
  constructor(options) {
    const defaultOptions = {
      length: 1,
      hits: 0,
    };

    Object.assign(this, defaultOptions, options);
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
