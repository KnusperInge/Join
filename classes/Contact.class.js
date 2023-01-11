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

	constructor() {
		this.loadContactList();
		this.setButtons();


	}

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
			console.log(tempContent);

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
	// add event listener
	setButtons() {
		this.closeNewTask();
		this.openContactInfo();
		this.closeContactInfo();
		this.addNewContact();
	}
	closeNewTask() {
		document.querySelector(".close-icon").addEventListener("click", () => {
			document.querySelector(".newTask").classList.toggle("open");
			document.getElementById("overlay").classList.toggle("open");
			document.querySelector(".AddButton").classList.toggle("open");
		});
	}

	openContactInfo() {
		this.loadContactIds();
		this.ContactInfoEventListener();
	}

	loadContactIds() {
		contactList.forEach((contact) => {
			this.contactIDs.push(contact.ID);
		});
	}

	// ANCHOR open contact info
	ContactInfoEventListener() {
		this.contactIDs.forEach((id) => {
			document.getElementById(`${id}`).addEventListener("click", () => {
				// ToDo auslagern
				document.querySelector(".contact-right-container").classList.toggle("active");
				document.querySelector(".close_contact_info_tablet").classList.toggle("active");
				document.getElementById("contact-informations").classList.toggle("active");
				const contactInfoTemp = document.getElementById("contact_info_template").content.cloneNode(true);
				const tempContent = contactInfoTemp.querySelectorAll("div, img, span");
				const contact = contactList.find((contact) => contact.id == id);
				tempContent[3].innerHTML = contact.name + " " + contact.surname;
				tempContent[14].innerHTML = contact.email;
				tempContent[17].innerHTML = contact.phone;
				document.getElementById("contact-informations").innerHTML = "";
				document.getElementById("contact-informations").append(contactInfoTemp);
				document.querySelector(".edidContact").id = "edidContact" + id;
				// getInfosToAddNewTask();
				this.edidContact();
				this.openNewTask();
				this.closeNewTask();
			});
		});
	}

	closeContactInfo() {
		document.querySelector(".close_contact_info_tablet").addEventListener("click", () => {
			document.querySelector(".contact-right-container").classList.toggle("active");
			document.querySelector(".close_contact_info_tablet").classList.toggle("active");
			document.getElementById("contact-informations").classList.toggle("active");
			document.getElementById("contact-informations").innerHTML = "";
		});
	}

	// ANCHOR edid contact
	edidContact() { }

	// ANCHOR new task in contact info
	openNewTask() {
		document.querySelector(".addtask-box").addEventListener("click", () => {
			newTask = new Task();
			document.querySelector(".newTask").classList.toggle("open");
			document.getElementById("overlay").classList.toggle("open");
			document.querySelector(".AddButton").classList.toggle("open");
		});
	}

	// ANCHOR new task


	// ANCHOR new contact
	addNewContact() {
		document.querySelector(".add-contact").addEventListener("click", () => {
			document.getElementById("new-contact").classList.toggle("open");
			document.getElementById("overlay").classList.toggle("open");
			setTimeout(() => {
				document.getElementById("new-contact-content").classList.toggle("open");
			}, 300);
		});
		this.closeNewContact();
	}

	closeNewContact() {
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
	}



	// Create new Contact
	createContact() {
		this.ID = contactList.length;
		this.readInputs();
		this.splitname();
		this.createInitials();
		this.createRandomBgColor();
		this.newContact();
		console.log("Konakt:", contactList);
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
	}

}