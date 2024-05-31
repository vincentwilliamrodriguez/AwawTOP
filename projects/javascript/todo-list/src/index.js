import DisplayManager from "./display.js";
import * as Datefns from "date-fns";
import "./style.scss";

// localStorage.clear();

const display = new DisplayManager();

const taskList = display.taskList;
const projectList = taskList.projectList;

const adjustToToday = (date) => Datefns.addDays(new Date(date), Datefns.differenceInCalendarDays(new Date(), new Date("2024-05-31")));

const debugProjectIDs = {
  "Default": taskList.defaultProjectID,
  "School": projectList.create({title: "School"}),
  "The Odin Project": projectList.create({title: "The Odin Project"}),
}

taskList.create({
  title: "Take a bath", 
  dueDate: adjustToToday("2024-05-31"),
  projectID: debugProjectIDs["Default"],
  description: "Take a bath for 20 minutes", 
});

taskList.create({
  title: "Walk the dog", 
  dueDate: adjustToToday("2024-06-02"),
  projectID: debugProjectIDs["Default"],
  description: "Take Awaw for a morning walk", 
  priority: 2,
});

taskList.create({
  title: "Visit grandma", 
  dueDate: adjustToToday("2024-06-10"),
  projectID: debugProjectIDs["Default"],
  description: "Take Awaw for a morning walk", 
  priority: 2,
});

taskList.create({
  title: "Do the limits homework", 
  dueDate: adjustToToday("2024-05-31"),
  projectID: debugProjectIDs["School"],
  description: "See pages 45-48 of the Basic Calculus textbook.", 
  priority: 4
});

taskList.create({
  title: "Presentation for Gen Chem", 
  dueDate: adjustToToday("2024-06-12"),
  projectID: debugProjectIDs["School"],
  description: "Group presentation on stoichiometry", 
  priority: 5
});

taskList.create({
  title: "Learn MutationObserver", 
  dueDate: adjustToToday("2024-05-31"),
  projectID: debugProjectIDs["Default"],
  description: "Watch videos about the MutationObserver API in JavaScript.", 
  priority: 3,
  isDone: true,
});

taskList.create({
  title: "JSON", 
  dueDate: adjustToToday("2024-05-26"),
  projectID: debugProjectIDs["The Odin Project"],
  description: "", 
  priority: 5,
  isDone: true,
});

taskList.create({
  title: "OOP Principles", 
  dueDate: adjustToToday("2024-05-28"),
  projectID: debugProjectIDs["The Odin Project"],
  description: "", 
  priority: 5,
  isDone: true,
});


const taskWithChecklist = taskList.create({
  title: "Project: Todo List", 
  dueDate: adjustToToday("2024-05-31"),
  projectID: debugProjectIDs["The Odin Project"],
  description: "Create a Todo List app that applies the SOLID principles.\n\nNote: Use both grids and flexboxes", 
  priority: 5
});
const debugChecklistItems = [
  {title: "Read and brainstorm", isDone: true},
  {title: "Create TaskListManager", isDone: true},
  {title: "Accomplish basic HTML and CSS", isDone: true},
  {title: "Accomplish DisplayManager", isDone: true},
  {title: "Create Checklist module", isDone: true},
  {title: "Add animations and debug tasks", isDone: false},
  {title: "Create storage manager", isDone: false},
] 

debugChecklistItems.forEach((item) => {
  taskList.read(taskWithChecklist).checklist.create(item);
});


taskList.load();
display.printList("all-tasks");
display.init();