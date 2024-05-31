import TaskListManager from "./task-list.js";
import * as Helper from "./helper.js";
import * as Datefns from "date-fns";


const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const sidebarElem = query(".sidebar");
const sidebarBtnElem = query(".sidebar-btn");
const taskInterfaceElem = query(".task-interface");
const interfaceQuery = taskInterfaceElem.querySelector.bind(taskInterfaceElem);

export default class DisplayManager {
  taskList = new TaskListManager();
  activeTaskID = "";
  activeView = "all-tasks";
  activeProject = null;
  showCompletedTasks = true;
  priorityColors = {
    "clr-alert-1": "#0a2e46cc",
    "clr-alert-2": "#0a610acc",
    "clr-alert-3": "#8e9627cc",
    "clr-alert-4": "#835417cc",
    "clr-alert-5": "#971010cc",
  };

  getActiveTask = () => {
    return this.taskList.read(this.activeTaskID);
  };

  focusOnProject(projectID) {
    query(`.filter[data-project-id="${projectID}"] .filter__title`).focus();
  }

  focusOnChecklistItem(itemID) {
    query(`.checklist-item[data-item-id="${itemID}"] .checklist-item__label`).focus();
  }

  printList(view, project) {
    const list = this.taskList.getTaskList(view, project);

    for (const [taskID, task] of list) {
      console.log(`${task.title}, with project ID of ${task.projectID}`);
    };
  }

  init() {
    const closeTaskInterface = () => {
      this.updateTaskDisplay();

      taskInterfaceElem.classList.add("task-interface--hidden");
      
      taskInterfaceElem.addEventListener("transitionend", taskInterfaceElem.close, {once: true});
    };

    // Sidebar toggle button
    sidebarBtnElem.addEventListener("click", () => {
      sidebarElem.classList.toggle("sidebar--hidden");
    });

    // Sidebar filter buttons
    queryAll(".filter").forEach(element => {
      element.addEventListener("click", (e) => {
        this.updateActiveFilter(e);
      });
    });

    // Show completed tasks toggle
    query(".completed-switch__checkbox").addEventListener("change", (e) => {
      this.showCompletedTasks = e.currentTarget.checked;
      this.updateTaskDisplay();
    });

    // New project button
    query(".sidebar__section--projects__new-btn").addEventListener("click", (e) => {
      const newProjectID = this.taskList.projectList.create({title: "Project"});
      this.updateProjectDisplay();
      this.focusOnProject(newProjectID);

      const newProjectElem = query(`.filter[data-project-id="${newProjectID}"]`)
      this.updateActiveFilter(null, newProjectElem);
    });

    // Updates main heading initially
    query(".main__header").innerHTML = query(".filter--active .filter__title").innerHTML;

    // New task button
    const getDefaultTaskOptions = () => {
      if (this.activeView === "project") {
        return {projectID: this.activeProject};
      }
      else if (this.activeView === "high-alert") {
        return {priority: 5};
      }
      else {
        return {};
      }
    };

    query(".task-list__new-btn").addEventListener("click", (e) => {
      const newTaskID = this.taskList.create( getDefaultTaskOptions() );
      this.activeTaskID = newTaskID;
      this.updateTaskDisplay();
      this.openTaskInterface();
    });

    // Closes task interface when clicking outside
    taskInterfaceElem.addEventListener("click", (e) => {
      closeTaskInterface();
    });

    query(".modal-children-wrapper").addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Closes task interface when clicking close button
    query(".top-bar__btn--close").addEventListener("click", (e) => {
      closeTaskInterface();
    });

    // Deletes task when user clicks delete button
    interfaceQuery(".top-bar__btn--delete").addEventListener("click", (e) => {
      this.taskList.delete(this.activeTaskID);
      closeTaskInterface();
    });

    // Updates task data whenever task interface is edited
    const updateActiveTaskElement = () => {

      const activeTaskElement = query(`.task[data-task-id="${this.activeTaskID}"]`);
      const activeTaskData = this.getActiveTask();

      this.updateTaskElement(activeTaskElement, activeTaskData);
    };

    const propertyNamePairs = {
      "#title": "title",
      "#description": "description",
      "#project": "projectID",
    }

    for (const [idName, propertyName] of Object.entries(propertyNamePairs)) {
      interfaceQuery(idName).addEventListener("input", (e) => {
        this.taskList.update(this.activeTaskID, {[propertyName]: e.currentTarget.value});
        updateActiveTaskElement();
      });
    }

    interfaceQuery("#is-done").addEventListener("input", (e) => {
      this.taskList.update(this.activeTaskID, {isDone: e.currentTarget.checked});
      updateActiveTaskElement();
    });

    interfaceQuery("#due-date").addEventListener("input", (e) => {
      this.taskList.update(this.activeTaskID, {dueDate: e.currentTarget.valueAsDate});
      updateActiveTaskElement();
    });
    
    for (let i = 1; i <= 5; i++) {
      interfaceQuery(`#priority-${i}`).addEventListener("change", (e) => {
        this.taskList.update(this.activeTaskID, {priority: i});
        updateActiveTaskElement();
      });
    }

    // Add checklist item button
    interfaceQuery(".checklist__new-btn").addEventListener("click", (e) => {
      const newItemID = this.getActiveTask().checklist.create();
      this.updateChecklistDisplay();
      this.focusOnChecklistItem(newItemID)
    });

    // Saves tasks and projects when user closes the app
    window.addEventListener("beforeunload", () => {
      this.taskList.save();
    });

    // Initially displays the tasks and projects
    this.updateTaskDisplay();
    this.updateProjectDisplay();
  }

  updateActiveFilter(e, optionalElem = null) {
    let targetFilterElem = (e) ? e.currentTarget : optionalElem;
    if (!targetFilterElem) { return; }

    const queryString = (this.activeView === "project") ? 
                          `.filter[data-project-id="${this.activeProject}"]` :
                          `.filter[data-filter="${this.activeView}"]`
    const activeFilterElem = query(queryString);
    
    if (activeFilterElem) {
      activeFilterElem.classList.remove("filter--active");
    }
    else {
      targetFilterElem = query(`.filter[data-filter="all-tasks"]`);
    }


    targetFilterElem.classList.add("filter--active");

    this.activeView = targetFilterElem.getAttribute("data-filter");
    this.activeProject = (this.activeView === "project") ? 
                    targetFilterElem.getAttribute("data-project-id") : null;

    query(".main__header").innerHTML = targetFilterElem.querySelector(".filter__title").innerHTML;
    this.updateTaskDisplay();
  }

  updateListDisplay(className, dataName, list, listElem, templateItemElem, modifyNewItemElem) {

    [...listElem.children].forEach((element) => {
      if (element.classList.contains(className) && !element.classList.contains("template")) {
        element.remove();
      }
    });

    for (const [itemID, item] of list) {
      const newItemElem = templateItemElem.cloneNode(true);
      newItemElem.classList.remove("template");
      newItemElem.setAttribute(dataName, itemID);

      modifyNewItemElem(newItemElem, itemID, item);
      listElem.appendChild(newItemElem);
    };

  }

  updateTaskDisplay() {
    this.taskList.save();

    const list = this.taskList.getTaskList(this.activeView, this.activeProject, this.showCompletedTasks);
    const taskListElem = query(".task-list");
    const templateTaskElem = query(".task.template");

    this.updateListDisplay("task", "data-task-id", list, taskListElem, templateTaskElem, (newTaskElem, taskID, task) => {

      // Shows task interface when expand button is clicked
      newTaskElem.querySelector(".task__expand-btn").addEventListener("click", (e) => {
        this.activeTaskID = taskID;
        this.openTaskInterface();
      });

      // Updates isDone when checkbox is clicked
      newTaskElem.querySelector(".task__is-done").addEventListener("click", (e) => {
        this.taskList.update(taskID, {isDone: e.currentTarget.checked});
        this.updateTaskDisplay();
      });

      this.updateTaskElement(newTaskElem, task);
    });
  }

  updateTaskElement(taskElement, task) {
    taskElement.querySelector(".task__is-done").checked = task.isDone;
    taskElement.querySelector(".task__title").innerHTML = task.title;
    taskElement.querySelector(".task__date-display").innerHTML = Datefns.format(task.dueDate, "MMMM d, yyyy");
    taskElement.style.borderLeft = "5px solid " + this.priorityColors["clr-alert-" + task.priority];
  }

  openTaskInterface() {
    const task = this.getActiveTask();

    if (!task) {
      return;
    }

    // Updates checkbox, title, description, date, and priority
    interfaceQuery("#is-done").checked = task.isDone;
    interfaceQuery("#title").value = task.title;
    interfaceQuery("#description").value = task.description;
    interfaceQuery("#due-date").value = Datefns.format(task.dueDate, "yyyy-MM-dd");
    interfaceQuery(`#priority-${task.priority}`).checked = true;

    // Updates checklist
    this.updateChecklistDisplay();

    // Updates project dropdown value
    const projectDropdownElem = interfaceQuery("#project");
    projectDropdownElem.innerHTML = "";

    const projectList = this.taskList.projectList.list;

    for (const [projectID, project] of Object.entries(projectList)) {
      const optionElem = Helper.makeElement("option", "", project.title, {value: projectID});
      projectDropdownElem.appendChild(optionElem);
    };

    projectDropdownElem.value = task.projectID;


    taskInterfaceElem.showModal();
    taskInterfaceElem.classList.remove("task-interface--hidden");
  }

  updateProjectDisplay() {
    const list = Object.entries(this.taskList.projectList.list);
    const projectListElem = query(".sidebar__section--projects");
    const templateProjectElem = query(".filter.template");

    this.updateListDisplay("filter", "data-project-id", list, projectListElem, templateProjectElem, (newProjectElem, projectID, project) => {
      
      newProjectElem.addEventListener("click", (e) => {
        this.updateActiveFilter(e);
      });

      // When project title is clicked/edited, prevents switching active filter, and updates data and main heading
      const projectTitleElem = newProjectElem.querySelector(".filter__title");
      projectTitleElem.innerHTML = project.title;
      projectTitleElem.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      projectTitleElem.addEventListener("input", (e) => {
        this.taskList.projectList.update(projectID, {title: e.currentTarget.innerHTML});

        if (this.activeProject === projectID) {
          query(".main__header").innerHTML = e.currentTarget.innerHTML;
        }
      });

      newProjectElem.querySelector(".filter__btn--edit").addEventListener("click", (e) => {
        this.focusOnProject(projectID);
      });

      const deleteBtnElem = newProjectElem.querySelector(".filter__btn--delete");
      deleteBtnElem.addEventListener("click", (e) => {
        this.taskList.projectList.delete(projectID);
        this.updateProjectDisplay();
      });

      if (projectID === this.taskList.defaultProjectID) {
        deleteBtnElem.style.display = "none"; // hides delete button of default project
      }
    });
  }

  updateChecklistDisplay() {
    const checklistList = Object.entries(this.getActiveTask().checklist.list);
    const checklistElem = interfaceQuery(".checklist");
    const templateItemElem = query(".checklist-item.template");

    this.updateListDisplay("checklist-item", "data-item-id", checklistList, checklistElem, templateItemElem, (newItemElem, itemID, item) => {
      const checklist = this.getActiveTask().checklist;

      const itemCheckboxElem = newItemElem.querySelector(".checklist-item__checkbox");
      itemCheckboxElem.checked = item.isDone;
      itemCheckboxElem.addEventListener("change", (e) => {
        checklist.update(itemID, {isDone: e.currentTarget.checked});
      });

      const itemLabelElem = newItemElem.querySelector(".checklist-item__label");
      itemLabelElem.innerHTML = item.title;
      itemLabelElem.addEventListener("input", (e) => {
        checklist.update(itemID, {title: e.currentTarget.innerHTML});
      });

      newItemElem.querySelector(".checklist-item__delete-btn").addEventListener("click", (e) => {
        checklist.delete(itemID);
        this.updateChecklistDisplay();
      });
    });

  }
}

