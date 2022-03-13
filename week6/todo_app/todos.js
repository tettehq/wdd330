import * as utilities from "./utilities.js";
import * as ls from "./ls.js";

export default class Todos {
    constructor(parentElementID, key) {
        this.parent = utilities.qs(parentElementID);
        this.key = key
    }

    addTodo() {
        let taskInput = utilities.qs("#addTask");
        if (taskInput.value === "") {
            alert("Enter a task to add to the list");
        }

        else {
            saveTodo(taskInput.value, "todos");
            taskInput.value = "";
        }
    }
    
    listTodos() {
        console.log(getTodos("todos"));
        renderTodoList(getTodos("todos"), this.parent);
        utilities.onTouch(utilities.qs("#add"), this.removeTodo);
    }

    addTaskListener() {
        utilities.onTouch(utilities.qs("#add"), this.addTodo);
        utilities.onTouch(utilities.qs("#add"), this.listTodos);
        utilities.onTouch(utilities.qs("#add"), this.completeTodo);
    }

    completeTodo() {
        let tasks = Array.from(utilities.qsAll(".taskInfo input"));
        let list = getTodos("todos");
        tasks.forEach(task => {
            task.addEventListener("click", () => {
                list.forEach(todo => {
                    tasks.forEach(task => {
                        if (todo.id == task.id) {
                            if (task.checked === true) {
                                todo.completed = true;
                                ls.writeToLS("todos", list)
                            }
                            else {
                                todo.completed = false;
                                ls.writeToLS("todos", list)
                            }
                        }
                        else{
                            console.log("hmmm")
                        }
                    })
                })
            })
        })
    }

    removeTodo() {
        let delButtons = Array.from(document.querySelectorAll(".delButton"));
        let list = getTodos("todos");
        delButtons.forEach(button => {
            button.addEventListener("click", deleteTodo)
        });

        function deleteTodo(event, name="todos") {
            console.log(event.target.previousSibling);
            list.forEach(todo => {
                if (todo.id == event.target.previousSibling.classList) {
                    list.splice(list.indexOf(todo), 1);
                    ls.writeToLS(name, list);
                    console.log(list);
                }
                else {
                    console.log(todo.id);
                }
            })
            event.target.parentElement.remove();
        }
    }

    filterTodo() {
        let list = Array.from(utilities.qsAll(".filterBy"));
        list.forEach(item => utilities.onTouch(item, filterBy));
        list.forEach(item => utilities.onTouch(item, this.addTaskListener));
    }
    
}

const toDoList = [];

function saveTodo(task, key) {
    let todo = {
        id : new Date().getTime(),
        content : task,
        completed : false
    }

    if (getTodos(key) == null) {
        toDoList.push(todo);
        ls.writeToLS(key, toDoList);
        console.log("oh");
    }

    else {
        let list = getTodos(key);
        list.push(todo)
        ls.writeToLS(key, list)
    }
}

function getTodos(key) {
    if (toDoList.length === 0) {
        return ls.readFromLS(key)
    }
    else {
        return toDoList;
    }
}

function renderTodoList(list, element = utilities.qs("#taskList")) {
    element.innerHTML = ``
    if (list !== null) {
        list.forEach(item => {
            let taskInfo = document.createElement("li");
            taskInfo.classList.add("taskInfo");
            if (item.completed === false) {
                taskInfo.innerHTML = `<label for="${item.id}" class="${item.id}">
                <input type="checkbox" name="status" id="${item.id}"> ${item.content}
                </label><button class="delButton">X</button>`;
                element.appendChild(taskInfo);
            }
            else {
                taskInfo.innerHTML = `<label for="${item.id}" class="${item.id}">
                <input type="checkbox" name="status" id="${item.id}" checked> ${item.content}
                </label><button class="delButton">X</button>`;
                element.appendChild(taskInfo);
            }
        });
    }
}

function filterBy(event) {
    let completedButton = utilities.qs(".completed");
    let activeButton = utilities.qs(".active");
    let allButton = utilities.qs(".all");
    let childList = Array.from(utilities.qs("#taskList").children);
    console.log(childList)
    let count = utilities.qs("#count");
    let filtered = [];

    switch (event.currentTarget) {
        case activeButton:
            console.log('active');
            getTodos("todos").forEach(todo => {
                if(todo.completed === false) {
                    filtered.push(todo);
                    count.textContent = filtered.length;
                    renderTodoList(filtered, utilities.qs("#taskList"));
                }
            })
            break;
        case completedButton: 
            console.log('completed');
            getTodos("todos").forEach(todo => {
                if(todo.completed === true) {
                    filtered.push(todo);
                    count.textContent = filtered.length;
                    renderTodoList(filtered, utilities.qs("#taskList"));
                }
            })
            break;
        case allButton:
            console.log('all');
            renderTodoList(getTodos("todos"), utilities.qs("#taskList"));
            count.textContent = getTodos("todos").length;
            break;
        default:
            renderTodoList(getTodos("todos"), utilities.qs("#taskList"));
            count.textContent = getTodos("todos").length;
            break;
    }
}
