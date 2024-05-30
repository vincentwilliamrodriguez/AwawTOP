import Checklist from "./checklist.js";
import ProjectListManager from "./project-list.js";
import * as Helper from "./helper.js";
import * as Datefns from "date-fns";

const VIEW_FILTERS = {
  "all-tasks": (task) => true,
  "today": (task) => Datefns.isToday(task.dueDate),
  "this-week": (task) => Datefns.isThisWeek(task.dueDate),
  "high-alert": (task) => (task.priority >= 4),
  "project": (task) => true,
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
      isDone: false,
    }, options);
  }
}

export default class TaskListManager extends Helper.CRUD {
  projectList = new ProjectListManager();

  constructor () {
    super(Task);
    this.defaultProjectID = this.projectList.create({title: "Default"});
  }

  getTaskList(view = "all-tasks", projectID = null, showCompletedTasks = true) {
    Object.filter = (obj, predicate) => 
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );

    let filteredTasks = Object.filter(this.list, VIEW_FILTERS[view]);

    filteredTasks = Object.filter(filteredTasks, (task) => {
      return (!projectID || task.projectID === projectID); // if project is not given, all tasks pass the filter
    }); 

    filteredTasks = Object.filter(filteredTasks, (task) => {
      return (showCompletedTasks || !task.isDone)  // if showCompletedTasks is false, only include incomplete tasks
    });

    const sortedTasks = [];

    for (const [taskID, task] of Object.entries(filteredTasks)) {
      sortedTasks.push([taskID, task]);
    }

    sortedTasks.sort((itemA, itemB) => {
      return (+itemA[1].isDone - +itemB[1].isDone) ||    // incomplete tasks first
             (itemB[1].priority - itemA[1].priority) ||    // higher priority first 
             (itemA[1].dueDate.getTime() - itemB[1].dueDate.getTime());    // earlier date first
    });

    return sortedTasks;
  }

  create(options) {
    const modifiedOptions = Object.assign({projectID: this.defaultProjectID}, options);
    return super.create(modifiedOptions);
  }
}