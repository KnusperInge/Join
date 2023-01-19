setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");

let Tasks = [];
let navItems = [];
let contactList = [];
let Categories = [];
let lastChosenEditor = [];
let page = "";

let newTask;
let loadingPrps;
let currentDragElement;

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
async function saveData() {
	await backend.setItem("Tasks", JSON.stringify(Tasks));
	await backend.setItem("Contacts", JSON.stringify(contactList));
	await backend.setItem("Categories", JSON.stringify(Categories));
	await backend.setItem("lastChosenEditor", JSON.stringify(lastChosenEditor));
}

async function loadData() {
	Tasks = (await JSON.parse(backend.getItem("Tasks"))) || [];
	contactList = (await JSON.parse(backend.getItem("Contacts"))) || [];
	Categories = (await JSON.parse(backend.getItem("Categories"))) || [];
	lastChosenEditor = (await JSON.parse(backend.getItem("lastChosenEditor"))) || [];
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
	//init();
	console.log(Tasks);
	currentDragElement.loadTasks();
}
