const addForm = document.querySelector("form.add");
const tasksUl = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const searchForm = document.querySelector(".search");
const messageSpan = document.querySelector(".message span");

let tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];


// update message
function updateMessage(){
    const taskLength = tasksUl.children.length;
    messageSpan.textContent = `You have ${taskLength} pending tasks.`;
};

// add task to DOM
function addTaskDOM(id, value){
        tasksUl.innerHTML += getTemplate(id, value);
}

// add task to local storage 
function addTask(value){
    const task = {
        id: Math.floor(Math.random()* 10000),
        value: addForm.task.value
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskDOM(task.id, value);
}

// template for tasks 
function getTemplate(id, value){
    return `<li data-id=${id}>
                <img src="./images/brush.png" alt="brush" class="brush">
                <i class="delete"></i>
                <span>${value}</span>
            </li>`
}

addForm.addEventListener("submit", event => {
    event.preventDefault();

    if(addForm.task.value.trim() === ""){
        return alert("Please add task");
    }

    addTask(addForm.task.value.trim());
    addForm.reset();
    updateMessage();
});

// loop and display in DOM
function getTask(){
    tasks.forEach(task => {
        tasksUl.innerHTML += getTemplate(task.id, task.value);
    });
}


// delete task from local storage 
function deleteTask(id){
    tasks = tasks.filter(task => {
        return task.id !== id;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// delete task
tasksUl.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        deleteTask(Number(event.target.parentElement.dataset.id));
        updateMessage();
    }
});

// delete all tasks
clearAll.addEventListener("click", event => {
    const taskItems = tasksUl.querySelectorAll("li");
    taskItems.forEach(item => item.remove());
    localStorage.setItem("tasks", "[]");
    updateMessage();
});


// search for task
function filterTask(term){
    Array.from(tasksUl.children)
    .filter(task => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.add("hide");
    });

    Array.from(tasksUl.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.remove("hide");
    });
}


searchForm.addEventListener("keyup", event => {
   const term = searchForm.task.value.trim().toLowerCase();
   filterTask(term);
});

// clear the search form
searchForm.addEventListener("click", event => {
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim();
        filterTask(term);
    }
})


function init(){
    getTask();
    updateMessage();
}

init();

