import TaskListManager from "./task-list.js";
import * as Datefns from "date-fns";

export default class DisplayManager {
  taskList = new TaskListManager();

  printList(view, project) {
    const list = this.taskList.getTaskList(view, project);

    for (const [taskID, task] of Object.entries(list)) {
      console.log(`${task.title}, with project ID of ${task.projectID}`);
    };
  }
}

