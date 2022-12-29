// ANCHOR Load List and Drag and Drop

let currentDragElement;

function startDragging(title) {
	currentDragElement = title;
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(category) {
	let index = Tasks.findIndex((element) => element.Title == currentDragElement);
	Tasks[index].Status = category;
	loadTasks();
}

// ONLY FOR TESTING
document.addEventListener("DOMContentLoaded", () => {
	loadTasks();
});

function loadTasks() {
	document.querySelector("#toDo").innerHTML = "";
	document.querySelector("#inprogress").innerHTML = "";
	document.querySelector("#feedback").innerHTML = "";
	document.querySelector("#done").innerHTML = "";

	const template = document.querySelector("#task_card").content.cloneNode(true);
	Tasks.forEach((task) => {
		const todoList = document.querySelector("#" + task.Status);
		let tempContent = template.querySelectorAll("div, h4, span, img");
		tempContent[0].attributes[2].nodeValue = `startDragging("${task.Title}")`;
		tempContent[1].innerHTML = task.Category;
		tempContent[2].innerHTML = task.Title;
		tempContent[4].innerHTML = task.Description;
		todoList.appendChild(template);
	});
}

// ANCHOR open and close add new task
document.querySelector("#addTask_button").addEventListener("click", () => {
	document.getElementById("add-task").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
	document.querySelector(".cross-icon-task").classList.toggle("open");
});

document.querySelector(".cross-icon-task").addEventListener("click", () => {
	document.getElementById("add-task").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
	document.querySelector(".cross-icon-task").classList.toggle("open");
});
