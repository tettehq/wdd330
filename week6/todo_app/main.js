import Todos from "./todos.js"

let task = new Todos("#taskList", "todos");
task.addTaskListener();
task.listTodos();