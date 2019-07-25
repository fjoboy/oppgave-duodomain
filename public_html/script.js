"use strict";

//Compiled from es6 to es2015 using babeljs

var tasks = 0;
var listSection = document.getElementById("list-section"),
    newTaskSection = document.getElementById("new-task-section"),
    viewTaskSection = document.getElementById("view-task-section");
var sections = [listSection, newTaskSection, viewTaskSection];

/**
 * Creates a new task if user inputs are valid
 */
function createTask() {
  var title = document.getElementById("new-task-title").value;
  var description = document.getElementById("new-task-description").value;
  var due = document.getElementById("new-task-due").value;

  if (!emptyValues(title, description, due)) {
    var task = {
      title: title,
      description: description,
      due: due,
      created: new Date()
    };
    tasks++; //success, insert created task into DOM

    insertTask(task);
    displayPopupMessage("Gjøremål opprettet");
    displayListSection();
  } else {
    //error, user input not valid
    displayPopupMessage("Alle felter må fylles ut.", false);
  }
}

/**
 * Creates a new task element and insert it into DOM
 * @param {object} task object to be inserted
 */
function insertTask(task) {
  var taskItemsParentElement = document.getElementById("task-items"); //container element

  var taskItemContainerElement = document.createElement("li");
  taskItemContainerElement.classList += "task-item "; //task title

  var taskItemTitleElement = document.createElement("span");
  taskItemTitleElement.classList += "task-item-title ";
  taskItemTitleElement.innerHTML = task.title; //delete icon

  var taskItemDeleteElement = document.createElement("img");
  taskItemDeleteElement.src = "./icons/x.svg";
  taskItemDeleteElement.alt = "X";
  taskItemDeleteElement.classList = "x "; //task data

  taskItemContainerElement.dataset.title = task.title;
  taskItemContainerElement.dataset.description = task.description;
  taskItemContainerElement.dataset.due = task.due;
  taskItemContainerElement.dataset.created = task.created.toISOString(); //insert task info into view task section when clicked

  taskItemTitleElement.onclick = function () {
    insertTaskDetails(taskItemContainerElement);
    displayViewTaskSection();
  }; //remove when clicked


  taskItemDeleteElement.onclick = function () {
    taskItemContainerElement.remove();
    tasks--;
    checkIfnoTasks();
  }; //append to DOM


  taskItemContainerElement.append(taskItemTitleElement, taskItemDeleteElement);
  taskItemsParentElement.prepend(taskItemContainerElement);
}

/**
 * Inserts details of a given task element into DOM
 * @param {object} taskElement representing task
 */
function insertTaskDetails(taskElement) {
  //container element
  var taskOverViewElement = document.getElementById("task-overview");
  taskOverViewElement.innerHTML = ""; //task title

  var taskTitleElement = document.createElement("h2");
  taskTitleElement.classList += "task-overview-title ";
  taskTitleElement.innerHTML = taskElement.dataset.title; //task description

  var taskDescriptionElement = document.createElement("p");
  taskDescriptionElement.classList += "task-overview-description";
  taskDescriptionElement.innerHTML = taskElement.dataset.description; //task due

  var taskDueElement = document.createElement("span");
  taskDueElement.classList += "task-overview-due";
  taskDueElement.innerHTML = "Frist ".concat(taskElement.dataset.due); //append to DOM

  taskOverViewElement.append(taskTitleElement, taskDescriptionElement, taskDueElement); //remove when clicked

  var taskCompleteBtn = document.getElementById("task-complete-btn");

  taskCompleteBtn.onclick = function () {
    taskElement.remove();
    tasks--;
    displayListSection();
  };
}

function hideAllSections() {
  for (var _i = 0, _sections = sections; _i < _sections.length; _i++) {
    var section = _sections[_i];
    section.style.display = "none";
  }
}

function displayNewTaskSection() {
  hideAllSections();
  newTaskSection.style.display = "grid";
}

function displayListSection() {
  hideAllSections();
  listSection.style.display = "grid";
  checkIfnoTasks();
}

function displayViewTaskSection() {
  hideAllSections();
  viewTaskSection.style.display = "grid";
}

/**
 * Checks if there are no task to display, shows no-task message if not
 */
function checkIfnoTasks() {
  var noListItemsMessage = document.getElementById("no-tasks-msg");
  noListItemsMessage.style.display = tasks === 0 ? "block" : "none";
}

/**
 * Checks if any of given inputs are empty strings, blank strings, null or undefined. return false if not
 */
function emptyValues() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  for (var _i = 0, _values = values; _i < _values.length; _i++) {
    var value = _values[_i];
    if (!value || /^\s*$/.test(value)) return true;
  }

  return false;
}

/**
 * Displays a message on page
 * @param {string} message to display
 * @param {boolean} success if false error
 * @param {number} milliseconds duration to display
 */
function displayPopupMessage(message) {
  var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var milliseconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
  //popup element
  var popupElement = document.createElement("span");
  popupElement.classList += "popup-message ";
  popupElement.innerHTML = message;

  if (success) {
    popupElement.classList += "animated fadeIn";
    popupElement.style.color = "green";
  } else {
    popupElement.classList += "animated shake";
    popupElement.style.color = "red";
  }

  document.body.append(popupElement); //remove after given time

  setTimeout(function () {
    popupElement.remove();
  }, milliseconds);
}