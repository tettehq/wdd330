import * as utilities from "./utilities.js";
import * as ls from "./ls.js";

export default class Todos {
    constructor(parentElementID, lsKey) {
        this.parentElement = utilities.qs(parentElementID);
        this.key = lsKey
    }

    addTodo() {
        let taskInput = utilities.qs("#addTask");
        console.log(taskInput.value);
        if (taskInput.value === "") {
            alert("Enter a task to add to the list");
        }

        else {
            saveTodo(taskInput.value, this.key);
            toDoList.concat(getTodos(this.key));
            taskInput.value = "";
        }
    }
    
    listTodos() {
        this.completeTodo;
        renderTodoList(toDoList);
    }

    addTaskListener() {
        utilities.onTouch(utilities.qs("#add"), this.addTodo);
        utilities.onTouch(utilities.qs("#add"), this.listTodos);
        utilities.onTouch(utilities.qs("#add"), this.removeTodo(".delButton"))
    }

    completeTodo() {}

    removeTodo(buttonClass) {
        toDoList.concat(getTodos(this.key))
        let buttonList = utilities.qsAll(buttonClass);
        if (buttonList !== null) {
            buttonList.forEach(button => {
                console.log(button.innerHTML);
                console.log(button.parentNode);
                button.addEventListener("touchend", deleteTodo());
                button.addEventListener("click", deleteTodo());
            })
        }
    }

    filterTodo() {}
    
}

const toDoList = [];
console.log(toDoList)

function deleteTodo (event) {
    toDoList.forEach(item => {
        if (item.id == event.currentTarget.parentNode.id) {
            console.log(event.currentTarget)
            event.currentTarget.parentNode.remove();
            toDoList.splice(toDoList.indexOf(item), 1);
        }
        else{
            console.log("list is empty");
        }
        return toDoList
    })    
}

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
    if (toDoList === null) {
        toDoList.concat(ls.readFromLS(key));
        return toDoList;
    }
    else {
        console.log(toDoList)
    }
}

function renderTodoList(list, element = utilities.qs("#taskList")) {
    console.log(element.innterHTML);
    element.innerHTML = ``
    list.forEach(item => {
        let taskInfo = document.createElement("li");
        taskInfo.classList.add("taskInfo");
        if (item.completed === false) {
            taskInfo.innerHTML = `<label for="${item.id}">
            <input type="checkbox" name="status" id="${item.id}"> ${item.content}
            </label>
            <button class="delButton">X</button>`;
            element.appendChild(taskInfo);
        }
        else {
            taskInfo.innerHTML = `<label for="${item.id}">
            <input type="checkbox" name="status" id="${item.id}" checked> ${item.content}
            </label>
            <button class="delButton">X</button>`;
            element.appendChild(taskInfo);
        }
    });
}
