let contactArray = [];
let letters = [];

// load templates
const contactInfoTemp = document.getElementById("contact_info_template").content.cloneNode(true);

document.addEventListener("DOMContentLoaded", () => {
	loadContactList();
});
async function loadContactList() {
	contactArray = await fetch("../json/contact.json");
	contactArray = await contactArray.json();
	await loadLetters();
}

async function loadLetters() {
	await loadLettersArray();
	letters.sort();
	await generateLetterList();
}

async function loadLettersArray() {
	document.getElementById("contact-list").innerHTML = "";
	contactArray.forEach((element) => {
		let letter = element.surname.charAt(0).toUpperCase();
		if (!includesLetter(letter)) {
			letters.push(letter);
		}
	});
}

async function generateLetterList() {
	const letterTemp = document.getElementById("letter_list_template").content.cloneNode(true);
	letters.forEach((letter) => {
		let span = letterTemp.querySelectorAll("span");
		console.log(span);
		span[0].innerHTML = letter;
		document.getElementById("contact-list").appendChild(letterTemp);

		letterSmall = letter.toLowerCase();
		loadContacts(letter);
	});
}

function loadContacts(letter) {
	const contactListTemp = document.getElementById("contact_inList_template").content.cloneNode(true);
	contactArray.forEach((contact) => {
		if (getSurChar(contact) == letter) {
			document.getElementById(`${letterSmall}-list`).innerHTML += generateContactListHTML(contact);
		}
	});
}

function openContactInfo(currentMail) {
	let contact = contactArray.find((contactArray) => contactArray.email === currentMail);
	document.getElementById("contact-informations").innerHTML = generateContactInfoHTML(contact);
	getInfosToAddNewTask();
}

// ANCHOR add new contact
document.querySelector(".add-contact").addEventListener("click", () => {
	document.getElementById("new-contact").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
	setTimeout(() => {
		document.getElementById("new-contact-content").classList.toggle("open");
	}, 300);
});

let inputs = document.querySelector(".new-content-form");
inputs.addEventListener("submit", createNewContact);
function createNewContact(event) {
	event.preventDefault();
	let name = inputs.children[0];
	name = name.value.split(" ");

	let firstName = name.slice(0, 1);
	let surName = name.slice(1);
	let phone = inputs.children[1];
	let email = inputs.children[2];

	let contactArrayToPush = {
		name: `${firstName}`,
		surname: `${surName}`,
		icon: "./img/info.png",
		addedTasks: [],
		email: `${email}`,
		number: [
			{
				landline: "",
			},
			{
				mobile: `${phone}`,
			},
		],
	};

	console.log(contactArrayToPush);

	name.value = "";
	phone.value = "";
	email.value = "";
}

// ANCHOR close new contact
let cancelAdd = document.querySelectorAll(".cancel_add");
cancelAdd[0].addEventListener("click", () => {
	document.getElementById("new-contact").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
	document.getElementById("new-contact-content").classList.toggle("open");
});

cancelAdd[1].addEventListener("click", () => {
	document.getElementById("new-contact").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
	document.getElementById("new-contact-content").classList.toggle("open");
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
	document.querySelector(".addtask-box").addEventListener("click", () => {
		document.getElementById("add-task").classList.toggle("open");
		document.getElementById("overlay").classList.toggle("open");
		document.querySelector(".close-icon").classList.toggle("open");
	});
}

document.querySelector(".close-icon").addEventListener("click", () => {
	document.getElementById("add-task").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
	document.querySelector(".close-icon").classList.toggle("open");
});
