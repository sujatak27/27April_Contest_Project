// let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
// function displayTasks(tasks, sectionId) {
//   const section = document.getElementById(sectionId);
//   section.innerHTML = "";
//   tasks.forEach((task) => {
//     const taskCard = document.createElement("div");
//     taskCard.classList.add("task-card");
//     taskCard.innerHTML = `
//             <div class="task-info">
//                 <p class="task-name">${task.name}</p>
//                 <p class="task-date">${task.date}</p>
//                 <p class="task-priority">${task.priority}</p>
//             </div>
//             <div class="task-actions">
//                 <button class="delete-btn" onclick="deleteItem(${tasks.indexOf(
//                   task
//                 )}, '${sectionId}')">Delete</button>
//                 <button class="tick-btn" onclick="toggleCompletion(${tasks.indexOf(
//                   task
//                 )}, '${sectionId}')">${
//       task.completed ? "Undo" : "Complete"
//     }</button>
//             </div>
//         `;
//     if (task.completed) {
//       taskCard.classList.add("completed");
//     }
//     section.appendChild(taskCard);
//   });
// }

// function addItem() {
//   const itemName = document.getElementById("itemName").value;
//   const itemDate = document.getElementById("itemDate").value;
//   const priority = document.getElementById("priority").value;
//   const newItem = {
//     name: itemName,
//     date: itemDate,
//     priority: priority,
//     completed: false,
//   };
//   todoList.push(newItem);
//   localStorage.setItem("todoList", JSON.stringify(todoList));
//   updateDisplay();
// }
// function deleteItem(index, sectionId) {
//   todoList.splice(index, 1);
//   localStorage.setItem("todoList", JSON.stringify(todoList));
//   updateDisplay();
// }

// function toggleCompletion(index, sectionId) {
//   todoList[index].completed = !todoList[index].completed;
//   localStorage.setItem("todoList", JSON.stringify(todoList));
//   updateDisplay();
// }

// function updateDisplay() {
//   const today = new Date().toISOString().slice(0, 10);
//   const todayTasks = todoList.filter((task) => task.date === today);
//   const futureTasks = todoList.filter(
//     (task) => !task.completed && task.date > today
//   );
//   const completedTasks = todoList.filter((task) => task.completed);
//   displayTasks(todayTasks, "todaysTasks");
//   displayTasks(futureTasks, "futureTasks");
//   displayTasks(completedTasks, "completedTasks");
// }

// updateDisplay();

const titleInput = document.querySelector(".titleInput");
const dateInput = document.querySelector(".dateInput");
const priorityInput = document.querySelector(".priorityInput");
const btn = document.querySelector(".btn");

let todos = JSON.parse(localStorage.getItem("todo")) || [];

btn.addEventListener("click", () => {
  const title = titleInput.value;
  const date = dateInput.value;
  const priority = priorityInput.value;
  const id = "id" + Math.random().toString(16).slice(2);
  const todo = { id, title, date, priority, isCompleted: false };
  todos.push(todo);
  localStorage.setItem("todo", JSON.stringify(todos));
  displayTodo(todos);
});

const todoWrapper = document.querySelector("#todaysTasks");

const displayTodo = (todos) => {
  let content = "";
  console.log(todos);
  todoWrapper.innerHTML = "";
  todos?.forEach((todo, i) => {
    content += `<li id=${todo.id} > <span class='index'>${
      i + 1
    }</span> <span class='title'>${todo.title}</span>  <span>${
      todo.date
    }</span> <span>${todo.priority}</span>  <span > <input id=${
      todo.id
    } type='checkbox'  class='checkboxInput' ${
      todo.isCompleted && "checked"
    } /> <span id='isCompleted'> ${
      todo.isCompleted ? "completed" : "pending"
    }  </span>  </span>   <button class='delete'  id=${todo.id} >delete</button>

    <button class='update' id=${todo.id}>update</button>
    </li>`;
  });
  todoWrapper.innerHTML = content;
  console.log(todoWrapper);
};

const ul = document.getElementById("todaysTasks");

ul.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches("input")) {
    const checked = target.checked;
    const span = e.target.nextElementSibling;
    if (checked) span.innerText = "Completed";
    else span.innText = "Pending";
    todos = todos.map((todo) => {
      if (todo.id === e.target.id) todo.isCompleted = checked;
      return todo;
    });
    localStorage.setItem("todo", JSON.stringify(todos));
    displayTodo(todos);
  }

  //delete button code
  if (e.target.matches(".delete")) {
    e.target.parentElement.remove();
    todos = todos.filter((todo) => todo.id !== e.target.id);
    localStorage.setItem("todo", JSON.stringify(todos));
    displayTodo(todos);
  }

  if (e.target.matches(".update")) {
    const value = window.prompt("Update value");
    if (value.length) {
      const li = e.target.parentElement;
      const titleSpan = li.querySelector(".title");
      console.log(titleSpan, li);
      titleSpan.innerText = value;

      todos = todos.map((todo) => {
        if (todo.id === e.target.id) todo.title = value;
        return todo;
      });
      localStorage.setItem("todo", JSON.stringify(todos));
    }
  }
});

displayTodo(todos);
