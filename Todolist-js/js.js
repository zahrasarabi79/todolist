const todoInput = document.querySelector(".works");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todos");

todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", checkremove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
// وقتی که اولین بار  صفحه داکیومت دام رو باز کردی
// این فانکشن گت لوکال تو دوز را صدا بزن

function addToDo(_e) {
  _e.preventDefault();
  // از اونجایی که دکمه سابمیت رو زدیم.
  // هر بار که بزنیم اطلاعات ذخیره می کنه و صفحه رفرش میشه یعنی اطلاعات از روز صفحه پاک میشه
  //  ولی ما این رو نمی خوایم برا همین در فانکشن دکمه  این کد وارد می کنیم .
  console.log(_e);
  // get to do value
  // creat nea to do
  // add to dom
  // reset input
  const todoDiv = document.createElement("div");

  todoDiv.classList.add("todo");
  const newTodo =   `
    <li>${todoInput.value}</li>
    <span><i class="fa-solid fa-square-check"></i></span>
    <span><i class="fa-solid fa-trash"></i></span>
    <span><i class="fa-solid fa-pen-to-square"></i></span>
  `;
  todoDiv.innerHTML = newTodo;
  //   append to dom
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}
function checkremove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  console.log(item.parentElement.parentElement);
  if (classList[1] === "fa-square-check") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  } else if (classList[1] === "fa-trash") {
    const todo = item.parentElement.parentElement;
    removeLocalTodS(todo);
    todo.remove();
  }
}
function filterTodos(e) {
  console.log(e.target.value);
  console.log(todoList.childNodes);
  const todos = [...todoList.childNodes];

  todos.forEach((todo) => {
    console.log(todo, e.target.value);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complited":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplited":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");

    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todo}</li>
    <span><i class="fa-solid fa-square-check"></i></span>
    <span><i class="fa-solid fa-trash"></i></span>
    <span><i class="fa-solid fa-pen-to-square"></i></span>
  `;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodS(todo) {
  // باید اسم رو ببینیم با اسم داخل کادر مقایسه کنیم اگر درست بود خود متن به همراه کادر (پدربزرگ)
  // را حذف کنیم .
  // console.log(todo.children[0].innerText);
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filterTodos));
}
