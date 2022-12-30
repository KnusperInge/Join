// ANCHOR Load List and Drag and Drop




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
