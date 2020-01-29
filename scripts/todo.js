const todoForm = document.querySelector(".todoForm-js");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todoList-js");

const TODOS_LS = "todos";
let todos = [];

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todos.filter(function(todo) {
        return todo.id !== parseInt(li.id);
    });
    todos = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text) {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    const span = document.createElement("span");
    const newID = todos.length + 1;

    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteTodo);
    deleteButton.classList.add("deleteButton");
    span.innerText = text + " ";
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.id = newID;
    li.classList.add("center");
    todoList.appendChild(li);
    const todoObject = {
        text: text,
        id: newID
    }
    todos.push(todoObject);
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();

    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadToDos() {
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if (loadedTodos !== null) {
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(todo) {
            paintTodo(todo.text);
        })
    } 
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();