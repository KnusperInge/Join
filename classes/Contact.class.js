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

	constructor() {
		// temporary loading local contact.json
		this.loadContactList();
		this.addEventListener();
	}

	async loadContactList() {
		contactList = await fetch("../json/contact.json");
		contactList = await contactList.json();
		this.loadLettersArray();
	}

	loadLettersArray() {
		document.getElementById("contact-list").innerHTML = "";
		contactList.forEach((element) => {
			let letter = element.surname.charAt(0).toUpperCase();
			if (!this.includesLetter(letter)) letters.push(letter);
		});
		letters.sort();
		this.generateLetterList();
		// random_bg_color();
	}

	includesLetter(letter) {
		return letters.includes(letter);
	}

	generateLetterList() {
		letters.forEach((letter) => {
			const letterTemp = document.getElementById("letter_list_template").content.cloneNode(true);
			const tempContent = letterTemp.querySelectorAll("div, span");
			tempContent[1].innerHTML = letter;
			tempContent[2].id = letter + "-list";
			document.getElementById("contact-list").appendChild(letterTemp);
			this.loadContacts(letter);
		});
	}

	loadContacts(letter) {
		contactList.forEach((contact) => {
			const contactListTemp = document.getElementById("contact_inList_template").content.cloneNode(true);
			const tempContent = contactListTemp.querySelectorAll("div, img, span");
			tempContent[0].id = contact.id;
			tempContent[3].innerHTML = contact.name + " " + contact.surname;
			tempContent[4].innerHTML = contact.email;
			if (this.getSurChar(contact) == letter) {
				document.getElementById(letter + "-list").appendChild(contactListTemp);
			}
		});
	}

	getSurChar(contact) {
		return contact.surname.charAt(0);
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
	}

	// add event listener
	addEventListener() {
		this.closeNewTask();
		this.openContactInfo();
	}

	// added in contact info
	openNewTask() {
		this.openNewTaskBtn = document.querySelector(".addtask-box").addEventListener("click", () => {
			document.querySelector(".newTask").classList.toggle("open");
			document.getElementById("overlay").classList.toggle("open");
			document.querySelector(".AddButton").classList.toggle("open");
		});
	}

	closeNewTask() {
		this.closeNewTaskBtn = document.querySelector(".close-icon").addEventListener("click", () => {
			document.querySelector(".newTask").classList.toggle("open");
			document.getElementById("overlay").classList.toggle("open");
			document.querySelector(".AddButton").classList.toggle("open");
		});
	}

	openContactInfo() {
		this.loadContactIds();
		// this.openNewTask();
	}

	loadContactIds() {
		contactList.forEach((contact) => {
			this.contactIDs = contact.id;
			console.log(this.contact);
		});
	}
}
