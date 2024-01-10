let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const task = {
      id: new Date().getTime(),
      text: taskText,
      completed: false,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

function toggleTaskStatus(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function updateTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const updatedText = prompt('Update task:', task.text);
    if (updatedText !== null) {
      task.text = updatedText;
      renderTasks();
    }
  }
}

function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.className = `list-group-item ${task.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskStatus(task.id));

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const updateButton = document.createElement('button');
    updateButton.className = 'btn btn-warning btn-sm ml-2';
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => updateTask(task.id));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm ml-2';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(updateButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}
