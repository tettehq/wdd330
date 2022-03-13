import Todos from "./todos_module.js"
import * as utilities from "./utilities.js"

const task = new Todos("#taskList", "todos");
window.addEventListener("load", () => {
    task.listTodos();
    task.addTodo();
    task.completeTodo();
    task.addTaskListener();
    task.filterTodo();
})

