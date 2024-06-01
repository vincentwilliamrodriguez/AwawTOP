import * as Helper from "./helper.js";

class Project {
  constructor (options = {}) {
    Object.assign(this, {
      title: ""
    }, options);
  }
}

export default class TaskListManager extends Helper.CRUD {
  constructor () {
    super(Project);
  }
}