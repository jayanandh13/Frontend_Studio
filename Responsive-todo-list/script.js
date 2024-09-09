const inputbox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listContainer.appendChild(li);

        
        let span = document.createElement("span");
        span.innerHTML = "\u00D7"; 
        li.appendChild(span);
    }
    
    inputbox.value = ""; 
    saveData(); 
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); 
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); 
        saveData();
    }
}, false);

// Save the task list to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from localStorage on page load
function showTask() {
    let data = localStorage.getItem("data");
    if (data) {
        listContainer.innerHTML = data;
    }
}

showTask(); 
