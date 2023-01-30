setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");
let Tasks = [],
	navItems = [],
	contactList = [];
let page = "";
let newTask, loadingPrps, currentDragElement, user;
let elementOnDrag;
let Categories = [
	{
		name: "Sales",
		id: 0,
		Color: "rgb(240, 128, 128)",
	},
	{
		name: "Development",
		id: 1,
		Color: "rgb(142,229,238)",
	},
	{
		name: "Marketing",
		id: 2,
		Color: "rgb(118,238,198)",
	},
];
//general functions
function openboard() {
	window.open((href = "./board.html"), "_self");
}

//Loading Element
document.addEventListener("DOMContentLoaded", init);

async function init() {
	let item = document.querySelector("[item]").getAttribute("item");
	await downloadFromServer();
	await loadData();
	loadingClasses(item);
}

function loadingClasses(item) {
	if (item == "Summary") {
		loadingPrps = new Loading();
		loadUser();
	} else if (item == "Board") {
		currentDragElement = new DragandDrop();
		document.querySelector("#addTask_button").addEventListener("click", () => {
			window.open((href = "./task.html"), "_self");
		});
	} else if (item == "AddTask") {
		newTask = new Task();
		document.getElementById("TaskForm").addEventListener("submit", handleForm);
	} else if (item == "Contacts") {
		contact = new Contact();

		document.getElementById("TaskForm").addEventListener("submit", handleForm);
		//newTask = new Task();
	} else {
		console.error(`404 no Classes available for ${item}`);
	}
}

//Save and Load
function saveData() {
	backend.setItem("Tasks", JSON.stringify(Tasks));
	backend.setItem("Contacts", JSON.stringify(contactList));
	backend.setItem("Categories", JSON.stringify(Categories));
}

function loadData() {
	Tasks = JSON.parse(backend.getItem("Tasks")) || [];
	contactList = JSON.parse(backend.getItem("Contacts")) || [];
	Categories = JSON.parse(backend.getItem("Categories")) || [];
}

function loadUser() {
	user = JSON.parse(localStorage.getItem("user"));
	if (user == null) {
		user = "Guest";
	}
	addUserName();
}

function addUserName() {
	let content = document.querySelectorAll(".first-line span");
	content[1].innerText = user;
}

//Task.html functions
function checkInput(field) {
	let input = document.querySelector(`.${field}`);
	if (input.value) {
		input.classList.add("blackTextColor");
	} else {
		input.classList.remove("blackTextColor");
	}
}

function inviteContact() {
	document.getElementById("searchContacts").classList.remove("d-none");
	document.getElementById("dropdownContacts").classList.add("d-none");
	openList();
}

function handleForm(event) {
	event.preventDefault();
	newTask.init();
	Tasks.push(newTask.finalTask());
	saveData();
	newTask.clearForm();
	loadData();
	newTask.showNote();
}

// ANCHOR board.html drag and drop
function allowDrop(event) {
	event.preventDefault();
}

function startDragging(title) {
	elementOnDrag = title;
}

function drop(category) {
	let index = Tasks.findIndex((element) => element.Title == elementOnDrag);
	Tasks[index].Status = category;
	saveData();
	currentDragElement.loadTasks();
}
