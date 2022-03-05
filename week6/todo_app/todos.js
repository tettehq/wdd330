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
        renderTodoList(getTodos("todos"), this.parent);
        utilities.onTouch(utilities.qs("#add"), this.removeTodo);
    }

    addTaskListener() {
        utilities.onTouch(utilities.qs("#add"), this.addTodo);
        utilities.onTouch(utilities.qs("#add"), this.listTodos);
    }

    completeTodo() {}

    removeTodo() {
        let delButtons = Array.from(document.querySelectorAll(".delButton"));
        delButtons.forEach(button => {
            button.addEventListener("click", deleteTodo)
        });

        function deleteTodo(event, name="todos") {
            console.log(event.target.previousSibling);
            toDoList.forEach(todo => {
                if (todo.id == event.target.previousSibling.classList) {
                    toDoList.splice(toDoList.indexOf(todo), 1);
                    ls.writeToLS(name, toDoList);
                    console.log(toDoList);
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
        list.forEach(item => item.addEventListener("click", filterBy));
    }
    
}

const toDoList = [];

function saveTodo(task, key) {
    let todo = {
        id : new Date().getTime(),
        content : task,
        completed : false
    }

    toDoList.push(todo);
    ls.writeToLS(key, toDoList);
}

function getTodos(key) {
    if (toDoList.length === 0) {
        toDoList.concat(ls.readFromLS(key));
        return toDoList;
    }
    else {
        return toDoList;
    }
}

function renderTodoList(list, element = utilities.qs("#taskList")) {
    element.innerHTML = ``
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

function filterBy(event) {
    let completedButton = utilities.qs(".completed");
    let activeButton = utilities.qs(".active");
    let allButton = utilities.qs(".all");
    let childList = Array.from(utilities.qs("#taskList").children);

    switch (event.target) {
        case completedButton: 
            console.log('completed');
        case activeButton:
            console.log('active');
        case allButton:
            console.log('all');
    }
}
