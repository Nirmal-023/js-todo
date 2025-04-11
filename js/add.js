function submitTask(event) {
    if (event) event.preventDefault();
  
    const inputEl = document.getElementById("taskInput");
    const taskText = inputEl.value.trim();
  
    if (taskText === "") {
      alert("Please enter a task!");
      inputEl.focus();
      return;
    }
  
    // Get existing todos from localStorage or fallback to []
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    // Create new task
    const newTodo = {
      id: Date.now(),
      title: taskText,
      completed: false
    };
  
    // Add to the top
    todos.unshift(newTodo);
  
    // Save back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  
    // Redirect to home
    window.location.href = "index.html";
  }
  
  // Handle "Enter" key
  document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      submitTask(e);
    }
  });
  