import * as utilities from "./utilities.js";
import * as ls from "./ls.js";

export default class Todos {
    constructor(parentElementID, lsKey) {
        this.parent = utilities.qs(parentElementID);
        this.key = lsKey
    }

    addTodo() {
        let taskInput = utilities.qs("#addTask").value;
        console.log(taskInput);
        if (taskInput === "") {
            alert("Enter a task to add to the list");
        }

        else {
            saveTodo(taskInput, this.key);
            toDoList.concat(getTodos(this.key));
            this.listTodos
        }
    }

    listTodos() {    
        return renderTodoList(toDoList, this.parent);
    }
    

    addTaskListener() {
        utilities.onTouch(utilities.qs("#add"), this.addTodo);
    }
    
}

const toDoList = [];
console.log(toDoList)

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

function renderTodoList(list, element) {
    element.innerHTML = ``
    list.forEach(item => {
        let taskInfo = document.createElement("li");
        taskInfo.classList.add("taskInfo");
        if (item.completed === false) {
            taskInfo.innerHTML = `<label for="task">
            <input type="checkbox" name="status" id="task"> ${item.content}
            </label>
            <button class="delButton">X</button>`;
            element.appendChild(taskInfo);
        }
        else {
            taskInfo.innerHTML = `<label for="task">
            <input type="checkbox" name="status" id="task" checked> ${item.content}
            </label>
            <button class="delButton">X</button>`;
            element.appendChild(taskInfo);
        }
    });
}
