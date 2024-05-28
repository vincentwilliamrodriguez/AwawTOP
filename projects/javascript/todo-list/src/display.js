import TaskListManager from "./task-list.js";
import * as Datefns from "date-fns";


const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const sidebarElem = query(".sidebar");
const sidebarBtnElem = query(".sidebar-btn");
const taskInterfaceElem = query(".task-interface");

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

    taskInterfaceElem.addEventListener("click", (e) => {
      taskInterfaceElem.close();
    });

    query(".template .task__expand-btn").addEventListener("click", (e) => {
      taskInterfaceElem.showModal();
    });

    query(".top-bar__btn--close").addEventListener("click", (e) => {
      taskInterfaceElem.close();
    });

    query(".modal-children-wrapper").addEventListener("click", (e) => {
      e.stopPropagation();
    });

    taskInterfaceElem.showModal();

    // add to new/expand button function
    query("#due-date").setAttribute("value", Datefns.format(new Date(), "yyyy-MM-dd"));
  }
}

