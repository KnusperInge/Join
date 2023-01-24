setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");
let Tasks = [],
	navItems = [],
	contactList = [];
let page = "";
let newTask, loadingPrps, currentDragElement, user;
let Categories = [
	{
		name: "Sales",
		id: 0,
		Color: "",
	},
	{
		name: "Development",
		id: 1,
		Color: "",
	},
	{
		name: "Marketing",
		id: 2,
		Color: "",
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
		// newTask = new Task();
	} else {
		console.error(`404 no Classes available for ${item}`);
	}
}
//new contact from contact.class - return false to prevent form reset
function addNewContact() {
	contact.createContact();
	return false;
}

//save contact after edid from contact.class - return false to prevent form reset
function saveEdidInScript() {
	contact.saveEdid();
	return false;
}

//delete contact from contact.class
function deleteShwonContact() {
	contact.deleteContact();
	contact.saveLoadReload();
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
	user = JSON.parse(localStorage.getItem('user'));
	if (user == null) {
		user = 'Guest';

	}
	addUserName();
}
function addUserName() {
	let content = document.querySelectorAll('.first-line span');
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

// board.html
let elementOnDrag;

const lists = document.querySelectorAll(".bord-tasks-container-location");
lists.forEach((list) => {
	list.addEventListener("dragstart", startDraggingElement);
	list.addEventListener("dragenter", dragEnter);
	list.addEventListener("dragleave", dragLeave);
	list.addEventListener("drop", dropEvent);
});

function dragEnter(event) {
	if (event.path[1].className == "bord-tasks-container") event.target.classList.add("taskListBorder");
}

function dragLeave(event) {
	event.path[0].classList.remove("taskListBorder");
}

function allowDrop(event) {
	event.preventDefault();
}

function startDragging(title) {
	elementOnDrag = title;
}

function startDraggingElement(event) {
	// toDo || inProgress || awaitFeedback || Done
	let draggedFrom = event.composedPath()[1];
	const tasksFromDragged = [...document.getElementById(draggedFrom.id).children];
	tasksFromDragged.forEach((task) => {
		if (task.id == event.target.id) {
			task.classList.add("hideTask");
		}
	});
}

function drop(category) {
	let index = Tasks.findIndex((element) => element.Title == elementOnDrag);
	Tasks[index].Status = category;
	saveData();
	currentDragElement.loadTasks();
}

function dropEvent(event) {
	event.path[0].classList.remove("taskListBorder");
}
