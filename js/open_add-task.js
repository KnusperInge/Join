// for board.html
document
	.querySelector(".bord-search-container__button")
	.addEventListener("click", () => {
		document.getElementById("add-task").classList.toggle("open");
		document.getElementById("overlay").classList.toggle("open");
		document.querySelector(".cross-icon-task").classList.toggle("open");
	});

// for contact
function getInfosToAddNewTask() {
	document.querySelector(".addtask-box").addEventListener("click", () => {
		document.getElementById("add-task").classList.toggle("open");
		document.getElementById("overlay").classList.toggle("open");
		document.querySelector(".cross-icon-task").classList.toggle("open");
	});
}

document.querySelector(".cross-icon-task").addEventListener("click", () => {
	document.getElementById("add-task").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
	document.querySelector(".cross-icon-task").classList.toggle("open");
});
