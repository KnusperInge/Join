let currentDragElement;

function startDragging(title) {
	currentDragElement = title;
	console.log("startDragging:" + currentDragElement);
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(category) {
	let index = Tasks.findIndex((element) => element.Title == currentDragElement);
	console.log(index);
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
	const template = document.querySelector("#task_card");
	const clonedTemp = template.content.cloneNode(true);

	for (let i = 0; i < Tasks.length; i++) {
		const currentTask = Tasks[i];
		const todoList = document.querySelector("#" + currentTask.Status);
		let tempContent = clonedTemp.querySelectorAll("div, h4, span, img");
		tempContent[0].attributes[2].nodeValue = `startDragging("${currentTask.Title}")`;
		tempContent[1].innerHTML = currentTask.Category;
		tempContent[2].innerHTML = currentTask.Title;
		tempContent[4].innerHTML = currentTask.Description;
		console.log(tempContent);
		todoList.appendChild(clonedTemp);
	}
}
