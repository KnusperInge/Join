let contactArray = [];
let letters = [];

document.addEventListener('DOMContentLoaded', () => {
  loadContactList();
});
async function loadContactList() {
  contactArray = await fetch('../json/contact.json');
  contactArray = await contactArray.json();
  await loadLetters();
}

async function loadLetters() {
  await loadLettersArray();
}

async function loadLettersArray() {
  document.getElementById('contact-list').innerHTML = '';
  contactArray.forEach((element) => {
    let letter = element.surname.charAt(0).toUpperCase();
    if (!includesLetter(letter)) {
      letters.push(letter);
    }
  });
  letters.sort();
  generateLetterList();
  random_bg_color();
}

function random_bg_color() {
  let icon = document.getElementById('contactIcon');
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = 'rgb(' + x + ',' + y + ',' + z + ')';
  icon.style.background = bgColor;
}

function generateLetterList() {
  letters.forEach((letter) => {
    const letterTemp = document
      .getElementById('letter_list_template')
      .content.cloneNode(true);
    const tempContent = letterTemp.querySelectorAll('div, span');
    tempContent[1].innerHTML = letter;
    tempContent[2].id = letter + '-list';
    document.getElementById('contact-list').appendChild(letterTemp);
    loadContacts(letter);
  });
}

function loadContacts(letter) {
  contactArray.forEach((contact) => {
    const contactListTemp = document
      .getElementById('contact_inList_template')
      .content.cloneNode(true);
    const tempContent = contactListTemp.querySelectorAll('div, img, span');
    tempContent[0].attributes.onclick.nodeValue = `openContactInfo("${contact.email}")`;
    tempContent[3].innerHTML = contact.name + ' ' + contact.surname;
    tempContent[4].innerHTML = contact.email;
    if (getSurChar(contact) == letter) {
      document.getElementById(letter + '-list').appendChild(contactListTemp);
    }
  });
}

function openContactInfo(currentMail) {
  const contactInfoTemp = document
    .getElementById('contact_info_template')
    .content.cloneNode(true);
  const tempContent = contactInfoTemp.querySelectorAll('div, img, span');
  const contact = contactArray.find(
    (contactArray) => contactArray.email === currentMail
  );
  tempContent[3].innerHTML = contact.name + ' ' + contact.surname;
  tempContent[14].innerHTML = contact.email;
  tempContent[17].innerHTML = contact.phone;
  document.getElementById('contact-informations').innerHTML = '';
  document.getElementById('contact-informations').append(contactInfoTemp);
  getInfosToAddNewTask();
}

// ANCHOR add new contact
document.querySelector('.add-contact').addEventListener('click', () => {
  document.getElementById('new-contact').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
  setTimeout(() => {
    document.getElementById('new-contact-content').classList.toggle('open');
  }, 300);
});

document
  .getElementById('submitFormNewContact')
  .addEventListener('submit', createNewContact);
function createNewContact(event) {
  const inputs = document.querySelector('.new-content-form');
  event.preventDefault();
  let addedContact = new newContact(inputs);

  console.log(addedContact);

  inputs.children[0].value = '';
  inputs.children[1].value = '';
  inputs.children[2].value = '';
}

// ANCHOR close new contact
let cancelAdd = document.querySelectorAll('.cancel_add');
cancelAdd[0].addEventListener('click', () => {
  document.getElementById('new-contact').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
  document.getElementById('new-contact-content').classList.toggle('open');
});

cancelAdd[1].addEventListener('click', () => {
  document.getElementById('new-contact').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
  document.getElementById('new-contact-content').classList.toggle('open');
});

// ANCHOR IF questions
function includesLetter(letter) {
  return letters.includes(letter);
}

function getSurChar(contact) {
  return contact.surname.charAt(0);
}

// ANCHOR open and close add new Task
function getInfosToAddNewTask() {
  document.querySelector('.addtask-box').addEventListener('click', () => {
    document.getElementById('add-task').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
    document.querySelector('.close-icon').classList.toggle('open');
  });
}

document.querySelector('.close-icon').addEventListener('click', () => {
  document.getElementById('add-task').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
  document.querySelector('.close-icon').classList.toggle('open');
});
