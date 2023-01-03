setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");

let Tasks = [];
let navItems = [];
let contactList = [];
let page = "";
let selectedContacts = document.querySelector(".selectedContacts");
let newTask = new Task();
let loadingPrps;
let currentDragElement;

//general functions

function openboard() {
	window.open((href = "./board.html"), "_self");
}

// open/close task- Sidemenu
if (window.location.pathname == "/contact.html") {
	document.querySelector("#addTask_button").addEventListener("click", (event) => {
		document.querySelector(".newTask").classList.remove("d-none");
		console.log(event);
	});
	document.querySelector(".close-icon").addEventListener("click", (event) => {
		document.querySelector(".newTask").classList.add("d-none");
		console.log(event);
	});
}

//Loading Element
document.addEventListener("DOMContentLoaded", testinit);

async function testinit() {
	await downloadFromServer();
	//Load from server
	loadData();

	// console.log("Tasks Array:", Tasks);
	let item = document.querySelector("[item]").getAttribute("item");

	if (item === "AddTask" || item === "Board") {
		console.log('Nicht gefunden ', item);
	}
	if (item === "Board") {
		currentDragElement = new DragandDrop();
		currentDragElement.loadTasks();
	} else {
		loadingPrps = new Loading();
	}
}

//Save and Load
function saveData() {
	backend.setItem("Tasks", JSON.stringify(Tasks));
}

async function loadData() {
	Tasks = JSON.parse(backend.getItem("Tasks")) || [];
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
function changePriority(str) {
	if (str == 1) {
		newTask.aktivateUrgent();
	} else if (str == 2) {
		newTask.aktivateMedium();
	} else {
		newTask.aktivateLow();
	}
}

// Script for Dropdown Menus
function openList(id) {
	let dropdowns = document.querySelectorAll(".dropdown .list");
	if (id == 3) {
		false;
	} else {
		dropdowns[id].classList.toggle("active");
	}

	if (!document.querySelector(".dropdown .active") && contactList.length > 0) {
		renderIcons();
		selectedContacts.classList.toggle("active");
	} else {
		selectedContacts.classList.remove("active");
		selectedContacts.innerHTML = "";
	}
}

function addContact(id) {
	let selectableObject = document.querySelectorAll(".list div");
	let checkedChild = selectableObject[id].lastElementChild;
	let contact = selectableObject[id].innerText;
	if (!checkedChild.checked && !checkArr(contact)) {
		checkedChild.checked = true;
		contactList.push(contact);
	} else {
		contactList.splice(contactList.indexOf(contact), 1);
		checkedChild.checked = false;
	}
}

function checkArr(contact) {
	return contactList.includes(contact);
}

function renderIcons() {
	contactList.forEach((element) => {
		let firstletter = element.charAt(0).toUpperCase();
		selectedContacts.innerHTML += `<span>${firstletter}</span>`;
	});
}

function inviteContact() {
	document.getElementById("searchContacts").classList.remove("d-none");
	document.getElementById("dropdownContacts").classList.add("d-none");
	openList();
}

// handle Task Forms
if (window.location.pathname == "/task.html") {
	document.getElementById("TaskForm").addEventListener("submit", handleForm);

	document.querySelector("#clear-btn").addEventListener("click", (event) => {
		event.preventDefault();
		newTask.clearForm();
	});
}

function handleForm(event) {
	event.preventDefault();
	newTask.init();
	Tasks.push(newTask);
	saveData();
	newTask.clearForm();
}

function addCategory(id) {
	let input = document.querySelector(".cagetorgy-input");
	//input.innerHTML="";
	let Category = checkCategory(id);
	input.value = Category;
	if (!input.value == "") {
		newTask.Category = Category;
	}
}

function checkCategory(id) {
	let catlist = document.querySelectorAll(".category div");
	return catlist[id].textContent;
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
	testinit();
	console.log(Tasks);
	currentDragElement.loadTasks();
}
