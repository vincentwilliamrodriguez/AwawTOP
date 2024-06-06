import * as Helper from "./helper.js";

class ChecklistItem {
  constructor (options = {}) {
    Object.assign(this, {
      isDone: "",
      title: ""
    }, options);
  }
}

export default class Checklist extends Helper.CRUD {
  constructor() {
    super(ChecklistItem);
  }
}