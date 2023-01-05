setURL('https://gruppe-398.developerakademie.net/smallest_backend_ever');

let Tasks = [];
let navItems = [];
let contactList = [];
let page = '';

let newTask;
let loadingPrps;
let currentDragElement;

//general functions

function openboard() {
  window.open((href = './board.html'), '_self');
}

// open/close task- Sidemenu

//document.querySelector('#addTask_button').addEventListener('click', () => {
//   document.querySelector('.newTask').classList.remove('d-none');
// });
// document.querySelector('.close-icon').addEventListener('click', () => {
//   document.querySelector('.newTask').classList.add('d-none');

// });


//Loading Element
document.addEventListener('DOMContentLoaded', init);

async function init() {
  let item = document.querySelector('[item]').getAttribute('item');
  await downloadFromServer();
  loadData();
  loadingClasses(item);
}

function loadingClasses(item) {
  if (item == "Summary") { loadingPrps = new Loading(); }
  else if (item == "Board") { currentDragElement = new DragandDrop(); }
  else if (item == "AddTask") { newTask = new Task(); }
  else { console.error('404 not found', item); }
}

//Save and Load
function saveData() {
  backend.setItem('Tasks', JSON.stringify(Tasks));

}

async function loadData() {
  Tasks = JSON.parse(backend.getItem('Tasks')) || [];

}

//Task.html functions
function checkInput(field) {
  let input = document.querySelector(`.${field}`);
  if (input.value) {
    input.classList.add('blackTextColor');
  } else {
    input.classList.remove('blackTextColor');
  }
}








function inviteContact() {
  document.getElementById('searchContacts').classList.remove('d-none');
  document.getElementById('dropdownContacts').classList.add('d-none');
  openList();
}


function handleForm(event) {
  event.preventDefault();
  newTask.init();
  Tasks.push(newTask);
  saveData();
  newTask.clearForm();
}

function addCategory(id) {
  let input = document.querySelector('.cagetorgy-input');
  //input.innerHTML="";
  let Category = checkCategory(id);
  input.value = Category;
  if (!input.value == '') {
    newTask.Category = Category;
  }
}

function checkCategory(id) {
  let catlist = document.querySelectorAll('.category div');
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
  //init();
  console.log(Tasks);
  currentDragElement.loadTasks();
}
