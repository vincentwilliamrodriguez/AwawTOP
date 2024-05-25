import DisplayManager from "./display.js";

const display = new DisplayManager();
const taskList = display.taskList;
const IDtesting = taskList.createTask({title: "Awaw1", dueDate: new Date("2036-8-12")});
taskList.createTask({title: "Awp2", dueDate: new Date(), priority: 4});
taskList.createTask({title: "Awp3", project: "Awaw", dueDate: new Date("2024-5-12")});
taskList.createTask({title: "Awaw4", dueDate: new Date("2024-6-1")});

display.printList();

console.log("Awp ", IDtesting);
taskList.updateTask(IDtesting, {title:"AWAWAWAW"});

display.printList("all-tasks", "Awaw");