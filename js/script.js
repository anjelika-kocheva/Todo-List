const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");


// update message
function updateMessage(){
    const taskLength = tasks.children.length;
    messageSpan.textContent = `You have ${taskLength} pending tasks.`;
}

updateMessage();


// add item
addForm.addEventListener("submit", event => {
    event.preventDefault();

    const value = addForm.task.value.trim();

    if(value.length){
        tasks.innerHTML += `<li>
                                <img src="./images/brush.png" alt="brush" class="brush">
                                <i class="delete"></i>
                                <span>${value}</span>
                            </li>`
        addForm.reset();
        updateMessage();
    }
});

// remove item
tasks.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
})

// remove all items
clearAll.addEventListener("click", event => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach(item => item.remove());
    updateMessage();
});


// search for terms
function filterTask(term){
    Array.from(tasks.children)
    .filter(task => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.add("hide");
    });

    Array.from(tasks.children)
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
