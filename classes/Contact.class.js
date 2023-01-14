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
	async loadContactList() {
		let target = document.getElementById("contact-list");
		target.innerHTML = "";
		this.initLettersArr();
		this.generateLetterList(target);
	}

	initLettersArr() {
		contactList.forEach((element) => {
			let letter = element.Surname.charAt(0).toLowerCase();
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
			letterTemp.getElementById("letterListLetter").innerHTML = letter.toUpperCase();
			letterTemp.querySelector(".letterListID").id = letter + "-list";
			target.appendChild(letterTemp);
			this.loadContacts(letter);
		});
	}

	loadContacts(letter) {
		contactList.forEach((contact) => {
			const contactListTemp = document.getElementById("contact_inList_template").content.cloneNode(true);
			contactListTemp.querySelector(".listed-contact").id = contact.ID;
			contactListTemp.getElementById("listContactName").innerHTML = this.setNameHtml(contact);
			contactListTemp.getElementById("listContactMail").innerHTML = contact.Mail;
			if (this.getSurChar(contact).toLowerCase() == letter) {
				document.getElementById(letter + "-list").appendChild(contactListTemp);
			}
		});
	}

	// ANCHOR set name first char to upper case
	setNameHtml(contact) {
		return this.setFirstName(contact) + " " + this.setSurname(contact);
	}

	setFirstName(contact) {
		return contact.Name.charAt(0).toUpperCase() + contact.Name.slice(1);
	}

	setSurname(contact) {
		return contact.Surname.charAt(0).toUpperCase() + contact.Surname.slice(1);
	}

	getSurChar(contact) {
		return contact.Surname.charAt(0).toLowerCase();
	}

	// ANCHOR add page event listener
	async setButtons() {
		this.openContactInfo();
		this.mobileCloseContactInfoBtn();
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
				this.setContactInfoStyle();
				const contactInfoTemp = document.getElementById("contact_info_template").content.cloneNode(true);
				const contact = contactList.find((contact) => contact.ID == id);
				contactInfoTemp.getElementById("infoName").innerHTML = this.setNameHtml(contact);
				contactInfoTemp.getElementById("infoMail").innerHTML = contact.Mail;
				contactInfoTemp.getElementById("infoPhone").innerHTML = contact.Phone;
				contactInfoTemp.querySelector(".edidContact").id = "edidContact" + contact.ID;
				document.getElementById("contact-informations").append(contactInfoTemp);
				this.edidContact(contact);
				// this.openNewTask();
				// this.closeNewTask();
			});
		});
	}

	setContactInfoStyle() {
		document.querySelector(".contact-right-container").classList.add("active");
		document.querySelector(".close_contact_info_tablet").classList.add("active");
		document.getElementById("contact-informations").classList.add("active");
		document.getElementById("contact-informations").innerHTML = "";
	}

	async closeContactInfo() {
		document.getElementById("contact-informations").innerHTML = "";
		document.getElementById("contact-informations").classList.remove("active");
		document.querySelector(".close_contact_info_tablet").classList.remove("active");
		document.querySelector(".contact-right-container").classList.remove("active");
	}

	// only mobile
	mobileCloseContactInfoBtn() {
		document.querySelector(".close_contact_info_tablet").addEventListener("click", () => {
			this.closeContactInfo();
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
		document.getElementById("overlay").classList.add("open");
		document.getElementById("new-contact").classList.add("open");
		document.getElementById("new-contact-content").classList.add("open");
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
		this.saveLoadReload();
	}

	// ANCHOR edid contact
	edidContact(contact) {
		document.querySelector(`#edidContact${contact.ID}`).addEventListener("click", () => {
			document.getElementById("overlay").classList.add("open");
			document.getElementById("new-contact").classList.add("open");
			document.getElementById("new-contact-content").classList.add("open");
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
		this.saveLoadReload();
	}

	// ANCHOR delete contact
	deleteContact() {
		let index = document.querySelector(".save-edided-contact").id - 234;
		contactList.splice(index, 1);
		this.saveLoadReload();
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

	setCancelButton(cancelAdd) {
		cancelAdd[0].addEventListener("click", () => {
			this.resetNewContactField();
		});

		cancelAdd[1].addEventListener("click", () => {
			this.resetNewContactField();
		});
	}

	setEdidButton(cancelAdd) {
		cancelAdd[0].addEventListener("click", () => {
			this.resetNewContactField();
		});
	}

	// ANCHOR save, load and reload page
	async saveLoadReload() {
		await saveData();
		await this.resetNewContactField();
		await this.closeContactInfo();
		await this.loadContactList();
		await this.setButtons();
	}

	// ANCHOR reset edid and create window
	async resetNewContactField() {
		this.resetFormInput();
		this.clearButtons();
		this.removeClassOpen();
	}

	resetFormInput() {
		document.querySelector("#input-name").value = "";
		document.querySelector("#input-phone").value = "";
		document.querySelector("#input-email").value = "";
	}

	clearButtons() {
		document.querySelector(".new-contact-buttons").innerHTML = "";
	}

	removeClassOpen() {
		document.getElementById("new-contact-content").classList.remove("open");
		document.getElementById("new-contact").classList.remove("open");
		document.getElementById("overlay").classList.remove("open");
	}
}
