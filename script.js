let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
function displayTasks(tasks, sectionId) {
    const section = document.getElementById(sectionId);
    section.innerHTML = '';
    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <div class="task-info">
                <p class="task-name">${task.name}</p>
                <p class="task-date">${task.date}</p>
                <p class="task-priority">${task.priority}</p>
            </div>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteItem(${tasks.indexOf(task)}, '${sectionId}')">Delete</button>
                <button class="tick-btn" onclick="toggleCompletion(${tasks.indexOf(task)}, '${sectionId}')">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        if (task.completed) {
            taskCard.classList.add('completed');
        }
        section.appendChild(taskCard);
    });
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemDate = document.getElementById('itemDate').value;
    const priority = document.getElementById('priority').value;
    const newItem = { name: itemName, date: itemDate, priority: priority, completed: false };
    todoList.push(newItem);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    updateDisplay();
}
function deleteItem(index, sectionId) {
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    updateDisplay();
}

function toggleCompletion(index, sectionId) {
    todoList[index].completed = !todoList[index].completed;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    updateDisplay();
}

function updateDisplay() {
    const today = new Date().toISOString().slice(0, 10);
    const todayTasks = todoList.filter(task => task.date === today);
    const futureTasks = todoList.filter(task => !task.completed && task.date > today);
    const completedTasks = todoList.filter(task => task.completed);
    displayTasks(todayTasks, 'todaysTasks');
    displayTasks(futureTasks, 'futureTasks');
    displayTasks(completedTasks, 'completedTasks');
}

updateDisplay();