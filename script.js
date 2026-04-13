
let tasks = loadTasks();


const homePage = document.getElementById("homePage");
const taskPage = document.getElementById("taskPage");

const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const priorityInput = document.getElementById("priority");
const descriptionInput = document.getElementById("description");
const error = document.getElementById("error");
const submitBtn = document.getElementById("submitBtn");
const taskList = document.getElementById("taskList");


document.getElementById("goToTask").addEventListener("click", () => {
  homePage.style.display = "none";
  taskPage.style.display = "block";
});

document.getElementById("backHome").addEventListener("click", () => {
  taskPage.style.display = "none";
  homePage.style.display = "block";
});


function validateTitle(value) {
  if (value.length < 3) return "Minimum 3 characters required";

  const duplicate = tasks.some(
    t => t.title.toLowerCase() === value.toLowerCase()
  );

  if (duplicate) return "Title already exists";

  return "";
}

titleInput.addEventListener("input", () => {
  const msg = validateTitle(titleInput.value.trim());
  error.textContent = msg;
  submitBtn.disabled = !!msg;
});


function createTask(title, priority, description) {
  return {
    id: Date.now(),
    title,
    priority,
    description,
    createdAt: new Date().toISOString(),
    completed: false
  };
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = createTask(
    titleInput.value.trim(),
    priorityInput.value,
    descriptionInput.value.trim()
  );

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  form.reset();
  submitBtn.disabled = true;
});


const priorityOrder = { High: 1, Medium: 2, Low: 3 };

function sortTasks(data) {
  return [...data].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

 
function renderTasks() {
  taskList.innerHTML = "";

  const sorted = sortTasks(tasks);

  if (!sorted.length) {
    taskList.innerHTML = "<p>No tasks yet </p>";
    return;
  }

  sorted.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div class="task-text">
        <span class="task-title">${task.title}</span>
        <span class="badge ${task.priority.toLowerCase()}">${task.priority}</span>
      </div>
      <div class="actions">
        <button data-id="${task.id}" class="complete">✔</button>
        <button data-id="${task.id}" class="delete">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}


taskList.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains("delete")) {
    tasks = tasks.filter(t => t.id !== id);
  }

  if (e.target.classList.contains("complete")) {
    tasks = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
  }

  saveTasks();
  renderTasks();
});


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}


document.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const circle = document.createElement("span");
  circle.style.position = "absolute";
  circle.style.width = "80px";
  circle.style.height = "80px";
  circle.style.background = "rgba(255,255,255,0.5)";
  circle.style.borderRadius = "50%";
  circle.style.left = e.offsetX - 40 + "px";
  circle.style.top = e.offsetY - 40 + "px";
  circle.style.transform = "scale(0)";
  circle.style.animation = "ripple 0.5s linear";

  e.target.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
});

 
renderTasks();