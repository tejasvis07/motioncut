document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector(".task-text").innerText,
                completed: taskItem.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (text, completed = false) => {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.innerText = text;

        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.addEventListener("click", () => deleteTask(li));

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.className = "edit";
        editButton.addEventListener("click", () => editTask(taskText));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", () => deleteTask(li));

        li.appendChild(radioButton);
        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        if (completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", (e) => {
            if (e.target !== editButton && e.target !== deleteButton && e.target !== radioButton) {
                li.classList.toggle("completed");
                saveTasks();
            }
        });

        taskList.appendChild(li);
        saveTasks();
    };

    // Edit task
    const editTask = (taskText) => {
        const newText = prompt("Edit your task:", taskText.innerText);
        if (newText !== null) {
            taskText.innerText = newText;
            saveTasks();
        }
    };

    // Delete task
    const deleteTask = (taskItem) => {
        taskItem.remove();
        saveTasks();
    };

    // Add task
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTaskButton.click();
        }
    });

    loadTasks();
});
