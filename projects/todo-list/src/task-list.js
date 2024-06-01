import ProjectListManager from "./project-list.js";
import Checklist from "./checklist.js";
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

  create(options) {
    const modifiedOptions = Object.assign({projectID: this.defaultProjectID}, options);
    return super.create(modifiedOptions);
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
             (itemA[1].dueDate.getTime() - itemB[1].dueDate.getTime()) ||    // earlier date first
             (itemA[1].title.localeCompare(itemB[1].title));    // alphabetical order finally
    });

    return sortedTasks;
  }

  save() {
    if (!Helper.isStorageAvailable("localStorage")) {
      return;
    }
    
    localStorage.setItem("taskListData", JSON.stringify(this.list));
    localStorage.setItem("projectListData", JSON.stringify(this.projectList.list));
  }

  load() {
    if (!Helper.isStorageAvailable("localStorage")) {
      return;
    }

    const taskListData = localStorage.getItem("taskListData")
    const projectListData = localStorage.getItem("projectListData")

    if (taskListData) {
      Object.keys(this.list).forEach((taskID) => { this.delete(taskID) });

      this.projectList.list = JSON.parse(projectListData);
      this.list = JSON.parse(taskListData);
      
      for (const [taskID, task] of Object.entries(this.list)) {
        this.list[taskID].dueDate = new Date(task.dueDate);
        
        const checklist = new Checklist();
        checklist.list = task.checklist.list;
        this.list[taskID].checklist = checklist;
      }

    }
  }
}