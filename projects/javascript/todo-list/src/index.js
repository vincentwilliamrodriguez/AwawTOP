import DisplayManager from "./display.js";
import "./style.scss";

const display = new DisplayManager();

const taskList = display.taskList;
const projectList = taskList.projectList;

const projectTesting = projectList.create({title: "School"});
const projectTesting2 = projectList.create({title: "The Odin Project"});

const IDtesting = taskList.create({title: "Awaw1", description: "awsh", dueDate: new Date("2036-8-12"), isDone: true});
taskList.create({title: "Awp2", dueDate: new Date(), priority: 2});
taskList.create({title: "Awp3", projectID: projectTesting, dueDate: new Date("2024-5-12")});
taskList.create({title: "Awaw4", dueDate: new Date("2024-6-1")});
taskList.create();

console.log(taskList.defaultProjectID);

console.log("Awp change ", IDtesting);
taskList.update(IDtesting, {title:"AWAWAWAW", projectID: projectTesting});

display.printList("all-tasks");

const checklistTest = taskList.read(IDtesting).checklist;
checklistTest.create({isDone: true, title:"awawawwa"});
console.log("Awaw checklist", checklistTest.list);

display.init();