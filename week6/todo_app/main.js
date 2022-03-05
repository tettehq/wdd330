import Todos from "./todos.js"

let task = new Todos("#taskList", "todos");
window.addEventListener("load", () => {
    task.listTodos();
    task.filterTodo();
})
task.addTaskListener();