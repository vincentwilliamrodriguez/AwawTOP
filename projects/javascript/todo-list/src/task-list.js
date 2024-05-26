import Checklist from "./checklist.js";
import ProjectListManager from "./project-list.js";
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
      projectID: "",
      description: "", 
      dueDate: new Date(), 
      priority: 1, 
      notes: "",
      checklist: new Checklist(),
      isDone: false
    }, options);
  }
}

export default class TaskListManager extends Helper.CRUD {
  projectList = new ProjectListManager();

  constructor () {
    super(Task);
    this.defaultProjectID = this.projectList.create({title: "Awaw"});
  }

  getTaskList(view = "all-tasks", projectID = null) {
    Object.filter = (obj, predicate) => 
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );

    let result = Object.filter(this.list, VIEW_FILTERS[view]);
    result = Object.filter(result, (task) => (!projectID || task.projectID === projectID)); // if project is not given, all tasks pass the filter
    return result;
  }

  create(options) {
    const modifiedOptions = Object.assign({projectID: this.defaultProjectID}, options);
    return super.create(modifiedOptions);
  }
}