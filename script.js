let tasks = 0;
const listSection = document.getElementById("list-section"), newTaskSection = document.getElementById("new-task-section"), viewTaskSection = document.getElementById("view-task-section");
let sections = [listSection, newTaskSection, viewTaskSection];

/**
 * Creates a new task if user inputs are valid
 */
function createTask(){

    let title = document.getElementById("new-task-title").value;
    let description = document.getElementById("new-task-description").value;
    let due = document.getElementById("new-task-due").value;

    if(!emptyValues(title, description, due)){
        let task = {
            title,
            description,
            due,
            created : new Date()
        }
        tasks++;

        //success, insert created task into DOM
        insertTask(task);
        displayPopupMessage("Gjøremål opprettet");
        displayListSection();

    }else{

        //error, user input not valid
        displayPopupMessage("Alle felter må fylles ut.", false);
    }
}

/**
 * Creates a new task element and insert it into DOM
 * @param {object} task object to be inserted
 */
function insertTask(task){

    let taskItemsParentElement = document.getElementById("task-items");

    //container element
    let taskItemContainerElement = document.createElement("li");
    taskItemContainerElement.classList += "task-item ";

    //task title
    let taskItemTitleElement = document.createElement("span");
    taskItemTitleElement.classList += "task-item-title ";
    taskItemTitleElement.innerHTML = task.title;

    //delete icon
    let taskItemDeleteElement = document.createElement("img");
    taskItemDeleteElement.src = "./icons/x.svg";
    taskItemDeleteElement.alt = "X";
    taskItemDeleteElement.classList = "x ";

    //task data
    taskItemContainerElement.dataset.title = task.title;
    taskItemContainerElement.dataset.description = task.description;
    taskItemContainerElement.dataset.due = task.due;
    taskItemContainerElement.dataset.created = task.created.toISOString();

    //insert task info into view task section when clicked
    taskItemTitleElement.onclick = ()=>{
        insertTaskDetails(taskItemContainerElement);
        displayViewTaskSection();
    }

    //remove when clicked
    taskItemDeleteElement.onclick = ()=>{
        taskItemContainerElement.remove();
        tasks--;
        checkIfnoTasks();
    }

    //append to DOM
    taskItemContainerElement.append(taskItemTitleElement, taskItemDeleteElement);
    taskItemsParentElement.prepend(taskItemContainerElement); 
}

/**
 * Inserts details of a given task element into DOM
 * @param {object} taskElement representing task
 */
function insertTaskDetails(taskElement){
    
    //container element
    let taskOverViewElement = document.getElementById("task-overview");
    taskOverViewElement.innerHTML = "";

    //task title
    let taskTitleElement = document.createElement("h2");
    taskTitleElement.classList += "task-overview-title ";
    taskTitleElement.innerHTML = taskElement.dataset.title;

    //task description
    let taskDescriptionElement = document.createElement("p");
    taskDescriptionElement.classList += "task-overview-description";
    taskDescriptionElement.innerHTML = taskElement.dataset.description;

    //task due
    let taskDueElement = document.createElement("span");
    taskDueElement.classList += "task-overview-due";
    taskDueElement.innerHTML = `Frist ${taskElement.dataset.due}`;

    //append to DOM
    taskOverViewElement.append(taskTitleElement,taskDescriptionElement,taskDueElement);

    //remove when clicked
    let taskCompleteBtn = document.getElementById("task-complete-btn");
    taskCompleteBtn.onclick = ()=>{
        taskElement.remove();
        tasks--;
        displayListSection();
    }
}


function hideAllSections(){
    for(let section of sections){
        section.style.display = "none";
    }
}

function displayNewTaskSection(){
    hideAllSections();
    newTaskSection.style.display = "grid";
}

function displayListSection(){
    hideAllSections(); 
    listSection.style.display = "grid";

    checkIfnoTasks();
}

function displayViewTaskSection(){
    hideAllSections(); 
    viewTaskSection.style.display = "grid";
}

/**
 * Checks if there are no task to display, shows no-task message if not
 */
function checkIfnoTasks(){
    let noListItemsMessage = document.getElementById("no-tasks-msg");
    noListItemsMessage.style.display = (tasks === 0) ? "block" : "none";
}

/**
 * Checks if any of given inputs are empty strings, blank strings, null or undefined. return false if not
 */
function emptyValues(...values){
    for(let value of values){
        if(!value || /^\s*$/.test(value)) return true;
    }
    return false;
}

/**
 * Displays a message on page
 * @param {string} message to display
 * @param {boolean} success if false error
 * @param {number} milliseconds duration to display
 */
function displayPopupMessage(message, success = true, milliseconds = 3000){

    //popup element
    let popupElement = document.createElement("span");
    popupElement.classList += "popup-message "
    popupElement.innerHTML = message;

    if(success){
        popupElement.classList += "animated fadeIn";
        popupElement.style.color = "green";
    }else{
        popupElement.classList += "animated shake";
        popupElement.style.color = "red";
    }
    
    document.body.append(popupElement);

    //remove after given time
    setTimeout(()=>{
        popupElement.remove();
    },milliseconds);


}