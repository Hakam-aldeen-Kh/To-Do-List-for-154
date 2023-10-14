let textBox = document.querySelector(".text-box");
let buttonAdd = document.querySelector(".button-add");
let allTasks = document.querySelector(".tasks");
let taskView;
let clearAll = document.querySelector(".clear");
let pinkCover = document.querySelector(".cover");
let taskArray = [];
let pForRandomText = document.querySelector(".random-txt");
let stopEvent = document.querySelector(".ok-button");
let txtCongArr = [
  "Sana güveniyorum",
  "seninle gurur duyuyorum",
  "Harika gidiyorsun",
  "Sen harikasın",
  "her zaman seninle olacağım",
  "Hareket etmeye devam et kahraman",
];

window.addEventListener("load", function () {
  if (window.localStorage.getItem("tasks")) {
    taskArray = JSON.parse(localStorage.getItem("tasks"));
    addToPage(taskArray);
  }
  textBox.focus();
});

function loadTasks() {}

buttonAdd.onclick = function (e) {
  if (textBox.value !== "") {
    add(textBox.value.trim());
    textBox.value = "";
  }
  e.preventDefault();
};

if (window.localStorage !== "") {
  let storedTask = window.localStorage.getItem("task");
}

function add(text) {
  const task = {
    id: Date.now(),
    title: text.trim(),
    completed: false,
  };
  taskArray.push(task);
  addToPage(taskArray);
  saveTasks(taskArray);
  textBox.value = "";
}

function addToPage(taskArray) {
  allTasks.innerHTML = "";
  taskArray.forEach((task) => {
    let onlyTask = document.createElement("div");
    let oneTask = document.createElement("div");
    let titleOfTask = task.title;
    let check = document.createElement("button");
    let classAfter = task.title.trim().split(" ");
    let classBefore = processing(classAfter);
    onlyTask.classList.add("one-task");
    onlyTask.classList.add(`task-${classBefore}`);
    check.classList.add("check-button");
    check.classList.add(`check-${classBefore}`);
    check.innerHTML = "&#x2713;";
    oneTask.appendChild(document.createTextNode(titleOfTask));
    onlyTask.appendChild(oneTask);
    onlyTask.appendChild(check);
    allTasks.appendChild(onlyTask);
    check.addEventListener("click", remove);
    clearAll.addEventListener("click", removeAll);
  });
}

taskView.appendChild(allTasks);

function remove(e) {
  let audio = document.querySelector("audio");
  let partOfClass = e.currentTarget.classList[1].split("-");
  let lastParts = partOfClass.slice(1, partOfClass.length);
  let afterProcessing = processing(lastParts);
  let elementToRemove = document.querySelector(`.task-${afterProcessing}`);
  if (elementToRemove) {
    allTasks.removeChild(elementToRemove);
    audio.play();
    eventTaskComplete();
    let indexToRemove = -1;
    taskArray.forEach((task, index) => {
      let titleDelete = afterProcessing.trim().split("-").join(" ");
      if (task.title === titleDelete) {
        indexToRemove = index;
      }
    });
    if (indexToRemove !== -1) {
      taskArray.splice(indexToRemove, 1);
      saveTasks(taskArray);
    }
  }
}

function removeAll() {
  while (allTasks.firstChild) {
    allTasks.removeChild(allTasks.firstChild);
  }
  taskArray = [];
  saveTasks();
}

function processing(str) {
  let classBefore = "";
  for (let i = 0; i < str.length - 1; i++) {
    classBefore += str[i].trim() + "-";
  }
  classBefore += str[str.length - 1];
  return classBefore;
}

function saveTasks(taskArray) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadTasks() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    taskArray = JSON.parse(storedTasks);
    taskArray.forEach((task) => {
      allTasks.appendChild(task);
    });
  }
}

function eventTaskComplete() {
  pinkCover.style.display = "block";
  let len = txtCongArr.length;
  let randomNum = getRndInteger(0, len);
  pForRandomText.textContent = txtCongArr[randomNum]
  stopEvent.addEventListener("click",function() {
    pinkCover.style.display = "none"; 
  })
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
