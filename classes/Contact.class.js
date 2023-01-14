class Contact {
	ID;
	Fullname;
	name;
	surname;
	initials;
	bgcolor;
	addedTasks;
	email;
	phone;
	openNewTaskBtn;
	closeNewTaskBtn;
	contactIDs = [];
	letters = [];
	contactToEdid = {};

	constructor() {
		this.loadContactList();
		this.setButtons();
	}

	// ANCHOR loading contacts
	loadContactList() {
		let target = document.getElementById("contact-list");
		target.innerHTML = "";
		this.initLettersArr();
		this.generateLetterList(target);
	}

	initLettersArr() {
		contactList.forEach((element) => {
			let letter = element.Surname.charAt(0);
			if (!this.includesLetter(letter)) {
				this.letters.push(letter);
			}
		});
		this.letters.sort();
	}

	includesLetter(letter) {
		return this.letters.includes(letter);
	}

	generateLetterList(target) {
		this.letters.forEach((letter) => {
			const letterTemp = document.getElementById("letter_list_template").content.cloneNode(true);
			const tempContent = letterTemp.querySelectorAll("div, span");


			// Was ist TempContent[1 oder 2]???

			tempContent[1].innerHTML = letter;
			tempContent[2].id = letter + "-list";
			target.appendChild(letterTemp);
			this.loadContacts(letter);
		});
	}

	loadContacts(letter) {
		contactList.forEach((contact) => {
			const contactListTemp = document.getElementById("contact_inList_template").content.cloneNode(true);
			const tempContent = contactListTemp.querySelectorAll("div, img, span");

			// Das besser auschreiben


			tempContent[0].id = contact.ID;
			tempContent[3].innerHTML = contact.Name + " " + contact.Surname;
			tempContent[4].innerHTML = contact.Mail;
			if (this.getSurChar(contact) == letter) {
				document.getElementById(letter + "-list").appendChild(contactListTemp);
			}
		});
	}

	getSurChar(contact) {
		return contact.Surname.charAt(0);
	}

	// ANCHOR add page event listener
	setButtons() {
		this.openContactInfo();
		this.closeContactInfo();
		this.addNewContact();
	}

	// ANCHOR open contact info
	openContactInfo() {
		this.loadContactIds();
		this.ContactInfoEventListener();
	}

	loadContactIds() {
		contactList.forEach((contact) => {
			this.contactIDs.push(contact.ID);
		});
	}

	ContactInfoEventListener() {
		this.contactIDs.forEach((id) => {
			document.getElementById(`${id}`).addEventListener("click", () => {
				document.querySelector(".contact-right-container").classList.toggle("active");
				document.querySelector(".close_contact_info_tablet").classList.toggle("active");
				document.getElementById("contact-informations").classList.toggle("active");
				const contactInfoTemp = document.getElementById("contact_info_template").content.cloneNode(true);
				const tempContent = contactInfoTemp.querySelectorAll("div, img, span");
				const contact = contactList.find((contact) => contact.ID == id);

				// Wer soll später wissen was tempContent[3]oder [17] war ? 
				tempContent[3].innerHTML = contact.Name + " " + contact.Surname;
				tempContent[14].innerHTML = contact.Mail;
				tempContent[17].innerHTML = contact.Phone;
				document.getElementById("contact-informations").innerHTML = "";
				document.getElementById("contact-informations").append(contactInfoTemp);
				document.querySelector(".edidContact").id = "edidContact" + contact.ID;

				this.edidContact(contact);
				// this.openNewTask();
				// this.closeNewTask();
			});
		});
	}

	// only mobile
	closeContactInfo() {
		document.querySelector(".close_contact_info_tablet").addEventListener("click", () => {
			document.querySelector(".contact-right-container").classList.toggle("active");
			document.querySelector(".close_contact_info_tablet").classList.toggle("active");
			document.getElementById("contact-informations").innerHTML = "";
			document.getElementById("contact-informations").classList.toggle("active");
		});
	}

	// ANCHOR new task in contact info
	openNewTask() {
		document.querySelector(".addtask-box").addEventListener("click", () => {
			newTask = new Task();
			document.getElementById("overlay").classList.toggle("open");
			document.querySelector(".newTask").classList.toggle("open");
			document.querySelector(".AddButton").classList.toggle("open");
		});
	}

	// ANCHOR new contact
	addNewContact() {
		document.querySelector(".add-contact").addEventListener("click", () => {
			document.querySelector(".new-contact-buttons").appendChild(this.getButtonTemplate(1));
			this.closeContactEdidCreateWindow(1);
			this.setNewContactStyle();
		});
	}

	setNewContactStyle() {
		document.getElementById("overlay").classList.toggle("open");
		document.getElementById("new-contact").classList.toggle("open");
		setTimeout(() => {
			document.getElementById("new-contact-content").classList.toggle("open");
		}, 300);
		this.setCreateEdidContactEvent("newContact");
	}

	createContact() {
		this.ID = contactList.length;
		this.readInputs();
		this.splitname();
		this.createInitials();
		this.createRandomBgColor();
		this.newContact();
		console.log("Contacts:", contactList);
	}

	readInputs() {
		this.Fullname = document.querySelector("#input-name").value;
		this.phone = document.querySelector("#input-phone").value;
		this.email = document.querySelector("#input-email").value;
	}

	splitname() {
		let splitname = this.Fullname.split(" ");
		this.name = splitname[0];
		this.surname = splitname[1];
	}

	createInitials() {
		let firstletter = this.name.charAt(0).toUpperCase();
		let secondletter = this.surname.charAt(0).toUpperCase();
		this.initials = firstletter + secondletter;
	}

	createRandomBgColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var alpha = 0.75;
		this.bgcolor = `rgba(${r},${g},${b},${alpha})`;
	}

	newContact() {
		contactList.push({
			ID: this.ID,
			Name: this.name,
			Surname: this.surname,
			Initials: this.initials,
			Mail: this.email,
			Phone: this.phone,
			BgColor: this.bgcolor,
		});
		saveData();
		loadData();
		setTimeout(() => {
			this.loadContactList();
			this.resetNewContactField();
		}, 300);
	}

	// ANCHOR edid contact
	edidContact(contact) {
		document.querySelector(`#edidContact${contact.ID}`).addEventListener("click", () => {
			document.getElementById("overlay").classList.toggle("open");
			document.getElementById("new-contact").classList.toggle("open");
			setTimeout(() => {
				document.getElementById("new-contact-content").classList.toggle("open");
			}, 300);
			this.setEdidButtons();
			this.SetValues(contact);
			this.setEdidButtonID(contact);
			// this.setDeleteButton();
		});
	}

	setEdidButtons() {
		document.querySelector(".new-contact-buttons").appendChild(this.getButtonTemplate(2));
	}

	SetValues(contact) {
		document.querySelector("#input-name").value = contact.Name + " " + contact.Surname;
		document.querySelector("#input-phone").value = contact.Phone;
		document.querySelector("#input-email").value = contact.Mail;
	}

	getButtonTemplate(version) {
		if (version == 1) {
			let temp = document.querySelector("#create-buttons-template");
			return temp.content.cloneNode(true);
		} else if (version == 2) {
			this.closeContactEdidCreateWindow(2);
			let temp = document.querySelector("#save-button-template");
			return temp.content.cloneNode(true);
		}
	}

	setEdidButtonID(contact) {
		// button id = index in contactList + 200 to unique id in html code
		document.querySelector(".save-edided-contact").id = contact.ID + 234;
		this.setCreateEdidContactEvent("edidContact");
	}

	saveEdid() {
		let index = this.contactListIndex();
		this.setNewValues(index);
	}

	contactListIndex() {
		let id = document.querySelector(".save-edided-contact").id - 234;
		return contactList.findIndex((i) => i.ID === id);
	}

	setNewValues(i) {
		this.readInputs();
		this.splitname();
		contactList[i].Name = this.name;
		contactList[i].Surname = this.surname;
		contactList[i].Mail = this.email;
		contactList[i].Phone = this.phone;

		saveData();
		loadData();
		setTimeout(() => {
			this.loadContactList();
			this.resetNewContactField();
		}, 300);
	}

	// ANCHOR delete contact
	deleteContact() {
		let index = document.querySelector(".save-edided-contact").id - 234;
		contactList.splice(index, 1);

		saveData();
		loadData();
		setTimeout(() => {
			this.loadContactList();
			this.resetNewContactField();
		}, 300);
	}

	closeEdidContact() {
		document.querySelector(".cancel_edid").addEventListener("click", () => {
			document.getElementById("overlay").classList.toggle("open");
			document.getElementById("edidContact").classList.toggle("open");
			document.getElementById("edidContact-content").classList.toggle("open");
		});
	}

	// ANCHOR set button event
	setCreateEdidContactEvent(event) {
		if (event == "newContact") {
			document.querySelector("#submitFormNewContact").addEventListener("submit", newContact);
		} else if (event == "edidContact") {
			document.querySelector("#submitFormNewContact").addEventListener("submit", saveEdidInScript);
		}
	}

	// ANCHOR set buttons for edid and create window
	closeContactEdidCreateWindow(version) {
		let cancelAdd = document.querySelectorAll(".cancel_add");
		if (version == 1) this.setCancelButton(cancelAdd);
		else if (version == 2) this.setEdidButton(cancelAdd);
	}
	// Dopplungen entfernen und Auslagern 

	setCancelButton(cancelAdd) {
		cancelAdd[0].addEventListener("click", () => {
			document.getElementById("overlay").classList.toggle("open");
			document.getElementById("new-contact").classList.toggle("open");
			document.querySelector(".new-contact-buttons").innerHTML = "";
			document.getElementById("new-contact-content").classList.toggle("open");
			this.resetFormInput();
		});

		cancelAdd[1].addEventListener("click", () => {
			document.getElementById("overlay").classList.toggle("open");
			document.getElementById("new-contact").classList.toggle("open");
			document.querySelector(".new-contact-buttons").innerHTML = "";
			document.getElementById("new-contact-content").classList.toggle("open");
			this.resetFormInput();
		});
	}

	setEdidButton(cancelAdd) {
		cancelAdd[0].addEventListener("click", () => {
			document.getElementById("overlay").classList.toggle("open");
			document.getElementById("new-contact").classList.toggle("open");
			document.querySelector(".new-contact-buttons").innerHTML = "";
			document.getElementById("new-contact-content").classList.toggle("open");
			this.resetFormInput();
		});
	}

	// ANCHOR reset edid and create window
	resetNewContactField() {
		this.resetFormInput();
		this.clearButtons();
		this.toggleClassOpen();
	}

	resetFormInput() {
		document.querySelector("#input-name").value = "";
		document.querySelector("#input-phone").value = "";
		document.querySelector("#input-email").value = "";
	}

	clearButtons() {
		document.querySelector(".new-contact-buttons").innerHTML = "";
	}

	toggleClassOpen() {
		document.getElementById("overlay").classList.toggle("open");
		document.getElementById("new-contact").classList.toggle("open");
		document.getElementById("new-contact-content").classList.toggle("open");
	}
}
