document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const filters = document.querySelectorAll(".filter-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}" onclick="toggleTask(${index})">${task.text}</span>
                <button onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(li);
        });
    }