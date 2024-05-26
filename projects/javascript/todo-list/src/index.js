import DisplayManager from "./display.js";

const display = new DisplayManager();
const taskList = display.taskList;
const projectList = taskList.projectList;

const projectTesting = projectList.create({title: "awaw"});
console.log(projectTesting)

const IDtesting = taskList.create({title: "Awaw1", dueDate: new Date("2036-8-12")});
taskList.create({title: "Awp2", dueDate: new Date(), priority: 4});
taskList.create({title: "Awp3", projectID: projectTesting, dueDate: new Date("2024-5-12")});
taskList.create({title: "Awaw4", dueDate: new Date("2024-6-1")});
taskList.create();

console.log(taskList.defaultProjectID);

console.log("Awp change ", IDtesting);
taskList.update(IDtesting, {title:"AWAWAWAW", projectID: projectTesting});

display.printList("all-tasks");