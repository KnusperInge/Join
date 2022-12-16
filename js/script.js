let Tasks=[];
let navItems = [];
let contactList=[];
let page = "";
let selectedConacts=document.querySelector('.selectedConacts');
let newTask= new Task();

function openboard() {
    open("/board.html", "_self");
}

function checkInput() {
    let input = document.querySelector('.input-title');
    if (input.value) {
        console.log('test');
        input.classList.add('black');
    } else {
        input.classList.remove('black');
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
   let dropdowns= document.querySelectorAll(".left-Container .dropdown .list");
   dropdowns[id].classList.toggle('active');
    if (!document.querySelector(".dropdown .active") && contactList.length > 0) {
      renderIcons();
      selectedConacts.classList.toggle("active");
    } else {
        selectedConacts.classList.remove("active");
        selectedConacts.innerHTML = "";
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
      selectedConacts.innerHTML += `<span>${firstletter}</span>`;
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
    newTask.clearForm();
    console.log(Tasks);
  }

  document.querySelector("#clear-btn").addEventListener("click", (event) => {
    event.preventDefault();
    newTask.clearForm();
  });