import TaskListManager from "./task-list.js";
import * as Datefns from "date-fns";


const sidebarElem = document.querySelector(".sidebar");
const sidebarBtnElem = document.querySelector(".sidebar-btn");

export default class DisplayManager {
  taskList = new TaskListManager();

  printList(view, project) {
    const list = this.taskList.getTaskList(view, project);

    for (const [taskID, task] of Object.entries(list)) {
      console.log(`${task.title}, with project ID of ${task.projectID}`);
    };
  }

  init() {
    sidebarBtnElem.addEventListener("click", () => {
      sidebarElem.classList.toggle("sidebar--hidden");
    });
  }
}

