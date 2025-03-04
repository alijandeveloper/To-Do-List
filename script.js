// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const filters = document.querySelectorAll(".filter-btn");
    const themeToggle = document.querySelector(".theme-toggle");
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}" onclick="toggleTask(${index})">
                    ${task.text} <small>(${task.date})</small>
                </span>
                <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(li);
        });
    }
    
    window.addTask = function() {
        if (taskInput.value.trim()) {
            const now = new Date();
            const task = {
                text: taskInput.value,
                completed: false,
                date: now.toLocaleString()
            };
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    };
    
    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };
    
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };
    
    addTaskButton.addEventListener("click", addTask);
    filters.forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
            renderTasks(e.target.dataset.filter);
        });
    });

    // Fix: Dark Mode Toggle Working Now
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙"; // Change icon
    });

    // Ensure dark mode persists
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    renderTasks();
});