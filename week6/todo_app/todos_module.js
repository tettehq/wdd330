import * as utilities from "./utilities.js";
import * as ls from "./ls.js";

export default class Todos {
    constructor(parentID, key) {
        this._parent = utilities.qs(parentID);
        this._key = key;
    }

    addTodo() {
        const that = this;
        const addButton = utilities.qs("#add");
        utilities.onTouch(addButton, ()=>{
            let taskInput = utilities.qs("#addTask");
            if (taskInput.value === "") {
                alert("Enter a task to add to the list");
            }
            else {
                saveTodo(taskInput.value, that._key);
                taskInput.value = "";
            }
            that.listTodos(that._key);
        })
    }

    listTodos(key = this._key) {
        renderTodoList(getTodos(key), this._parent);
        const childList = Array.from(utilities.qs("#taskList").children);
        let counter = utilities.qs("#count");
        let count = childList.length;
        counter.innerHTML = count;
        this.removeTodo();
        this.completeTodo();
        this.filterTodo();
    }

    addTaskListener() {
        
    }

    removeTodo(key = this._key) {
        const that = this;
        let delButtons = Array.from(document.querySelectorAll(".delButton"));
        let list = getTodos(key);
        delButtons.forEach(button => {
            utilities.onTouch(button, deleteTodo)
        });

        function deleteTodo(event) {
            list.forEach(todo => {
                if (todo.id == event.target.previousSibling.classList) {
                    list.splice(list.indexOf(todo), 1);
                    ls.writeToLS(key, list);
                    that.listTodos(key);
                }
            })
            // event.target.parentElement.remove();
        }
    }

    completeTodo(key = this._key) {
        let tasks = Array.from(utilities.qsAll(".taskInfo input"));
        let list = getTodos(key);
        tasks.map(task => {
            utilities.onTouch(task, updateStatus);
        })

        function updateStatus(event) {
            list.map(todo => {
                if (todo.id == event.currentTarget.id) {
                    if(event.currentTarget.checked === true) {
                        todo.completed = true;
                        ls.writeToLS(key, list);
                    }
                    else {
                        todo.completed = false;
                        ls.writeToLS(key, list)
                    }
                }
            })
        }
    }

    filterTodo() {
        const filterButton = Array.from(utilities.qsAll(".filterBy"));
        const childList = Array.from(utilities.qs("#taskList").children);
        let completedButton = utilities.qs(".completed");
        let activeButton = utilities.qs(".active");
        let allButton = utilities.qs(".all");

        utilities.onTouch(completedButton, () => {
            filterButton.map(button => button.classList.remove("selected"));
            completedButton.classList.add("selected");
            let counter = utilities.qs("#count");
            let count = childList.length;
            childList.map(task => {
                task.classList.remove("hidden");
                if (task.firstElementChild.firstElementChild.checked === false) {
                    task.classList.add("hidden");
                    count -= 1;
                }
            })
            counter.innerHTML = count;
        })

        utilities.onTouch(activeButton, () => {
            filterButton.map(button => button.classList.remove("selected"));
            activeButton.classList.add("selected");
            let counter = utilities.qs("#count");
            let count = childList.length;
            childList.map(task => {
                task.classList.remove("hidden");
                if (task.firstElementChild.firstElementChild.checked === true) {
                    task.classList.add("hidden");
                    count -= 1;
                }
            })
            counter.innerHTML = count;
        })

        utilities.onTouch(allButton, () => {
            filterButton.map(button => button.classList.remove("selected"));
            allButton.classList.add("selected");
            let counter = utilities.qs("#count");
            let count = childList.length;
            childList.map(task => {
                task.classList.remove("hidden");
            })
            counter.innerHTML = count;
        })
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