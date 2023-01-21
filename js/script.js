setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");
let Tasks = [],
	navItems = [],
	contactList = [];
let page = "";
let newTask, loadingPrps, currentDragElement;
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
	//console.log(Tasks);
}

function loadingClasses(item) {
	if (item == "Summary") {
		loadingPrps = new Loading();
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
	console.log(event);
	event.preventDefault();
	newTask.init();
	Tasks.push(newTask.finalTask());
	saveData();
	newTask.clearForm();
	loadData();
	console.log(Tasks.length);
}

// board.html

let elementOnDrag;

const lists = document.querySelectorAll(".bord-tasks-container-location");
lists.forEach((list) => {
	list.addEventListener("dragenter", dragEnter);
	list.addEventListener("dragover", dragOver);
	list.addEventListener("dragleave", dragLeave);
});

function dragEnter(event) {
	console.log(event);
	event.path[0].classList.add("taskListBorder");
}

function dragOver(event) {
	console.log(event);
}

function dragLeave(event) {
	console.log(event);
	event.path[0].classList.remove("taskListBorder");
}

function allowDrop(event) {
	// console.log(event);
	event.path[0].classList.add("test");
	event.preventDefault();
}

function startDragging(title) {
	elementOnDrag = title;
}

function drop(category) {
	event.path[0].classList.remove("taskListBorder");
	let index = Tasks.findIndex((element) => element.Title == elementOnDrag);
	Tasks[index].Status = category;
	saveData();
	console.log(Tasks);
	currentDragElement.loadTasks();
}
