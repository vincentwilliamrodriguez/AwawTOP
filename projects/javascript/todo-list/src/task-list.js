import Checklist from "./checklist.js";
import * as Helper from "./helper.js";
import * as Datefns from "date-fns";

const VIEW_FILTERS = {
  "all-tasks": (task) => true,
  "today": (task) => Datefns.isSameDay(task.dueDate, new Date()),
  "this-week": (task) => {
    const oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    return (task.dueDate <= oneWeek);
  },
  "high-alert": (task) => (task.priority >= 4),
};

class Task {
  constructor (options = {}){
    Object.assign(this, {
      title: "", 
      project: "Default",
      description: "", 
      dueDate: new Date(), 
      priority: 1, 
      notes: "",
      checklist: new Checklist(),
      isDone: false
    }, options);
  }
}


export default class TaskListManager {
  #list = {};

  getList(view = "all-tasks", project = null) {

    Object.filter = (obj, predicate) => 
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );

    let result = Object.filter(this.#list, VIEW_FILTERS[view]);
    result = Object.filter(result, (task) => (!project || task.project === project)); // if project is not given, all tasks pass the filter
    console.log("Awp:", project)
    return result;
  }

  createTask(options = {}) {
    const taskID = Helper.generateID();
    this.#list[taskID] = new Task(options);
    return taskID;
  }

  readTask(taskID) {
    return this.#list[taskID];
  }

  updateTask(taskID, options = {}) {
    Object.assign(this.#list[taskID], options);
  }

  deleteTask(taskID) {
    delete this.#list[taskID];
  }
}