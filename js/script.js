setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");

let Tasks = [
  {
    Title: "Test1",
    Contacts: "Müller",
    Deadline: "24.12.22",
    Category: "Design",
    Description: "None",
    Priority: "Low",
    Subtaks: 0,
    Status: "toDo",
  },
];
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

//Loading Element
document.addEventListener("DOMContentLoaded", async () => {

  //Load from server
  currentDragElement = new DragandDrop();
  loadData();
  currentDragElement.loadTasks();
  console.log("Array:", Tasks);

  if (!document.querySelector("[item]").getAttribute("item") == "AddTask") {
    loadingPrps = new Loading();
  }
});

//Save and Load 
function saveData() {
  backend.setItem("Tasks", JSON.stringify(Tasks));
}
async function loadData() {
  await downloadFromServer();
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
  let dropdowns = document.querySelectorAll('.dropdown .list');
  if (id == 3) {
    false;
  } else {
    dropdowns[id].classList.toggle('active');
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
document.getElementById("TaskForm").addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();
  newTask.init();
  Tasks.push(newTask);
  saveData();
  newTask.clearForm();
}

document.querySelector("#clear-btn").addEventListener("click", (event) => {
  event.preventDefault();
  newTask.clearForm();
});

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
function allowDrop(event) {
  event.preventDefault();
}
let test
function startDragging(title) {
  test = title;
}
function drop(category) {
  let index = Tasks.findIndex((element) => element.Title == test);
  Tasks[index].Status = category;
  currentDragElement.loadTasks();
}