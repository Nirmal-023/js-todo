const listContainer = document.getElementById("list-container");

let todos = [];

// Load from localStorage or fetch from online JSON URL
function loadInitialTodos() {
  const stored = localStorage.getItem("todos");

  if (stored) {
    todos = JSON.parse(stored);
    renderTodos();
  } else {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        todos = data;
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      })
      .catch(err => console.error("Failed to fetch todos:", err));
  }
}

// Render all todos
function renderTodos() {
  listContainer.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = todo.title;
    taskSpan.classList.add("task-text");
    taskSpan.onclick = () => toggleComplete(todo.id);
    li.appendChild(taskSpan);

    const editBtn = document.createElement("span");
    editBtn.innerHTML = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editTodo(todo.id, taskSpan);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTodo(todo.id);
    li.appendChild(deleteBtn);

    if (todo.completed) li.classList.add("checked");

    listContainer.appendChild(li);
  });
}

// Toggle complete status
function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Delete task
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Edit task
function editTodo(id, taskSpan) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = taskSpan.textContent;
  input.classList.add("edit-input");

  taskSpan.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => saveEdit(id, input));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveEdit(id, input);
  });
}

// Save edited task
function saveEdit(id, input) {
  const newTitle = input.value.trim();
  if (!newTitle) {
    alert("Task can't be empty!");
    return;
  }

  todos = todos.map(todo =>
    todo.id === id ? { ...todo, title: newTitle } : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Initial call
loadInitialTodos();
