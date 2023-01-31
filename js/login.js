setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");
let userDates = [];
let LoginBtn, file, Username, Usersurname, Usermail, Userpassword;
let bodyTag = document.querySelector("body");
let animationEndEvent = true;

user = {
	Name: "",
	Surname: "",
	Mail: "",
	Password: "",
};

document.addEventListener("DOMContentLoaded", async () => {
	await loadTemplate(0);
	init();
});

addEventListener("animationend", () => {
	if (animationEndEvent) {
		document.getElementById("loading-page").style = "display: none;";
	}
});

async function init() {
	await downloadFromServer();

	setBtns();
}

function setBtns() {
	loginBtn();
	signUpBtn();
	forgotPwBtn();
}

function loginBtn() {
	document.querySelector("#loginButton").addEventListener("click", () => {
		let mailInput = document.querySelector("#eMailInput");
		let pwInput = document.querySelector("#passwordInput");
		checkLogin(mailInput, pwInput);

	});
}

function checkLogin(mail, pw) {
	console.log("Klick");
	userDates = JSON.parse(backend.getItem("UserDates")) || [];
	if (userDates.length == 0) {
		console.error("No Userdata available!");
	}

	for (let i = 0; i < userDates.length; i++) {
		if (userDates[i].Mail.includes(mail.value) && !mail.value == "") {
			let user = userDates[i];
			checkPW(user, pw, mail);
		} else
			if (!user.Mail.includes(mail.value) && !mail.value == "") {
				document.querySelector(".LoginNote").innerHTML = "";
				document.querySelector(".LoginNote").innerHTML = "The email or password you entered is incorrect.";
			}

	}
}

function checkPW(user, pw, mail) {
	if (user.Password == pw.value && !pw.value == "") {
		let userName = user.Name;
		window.open((href = "./summary.html"), "_self");
		localStorage.removeItem("user");
		localStorage.setItem("user", JSON.stringify(userName));
		userDates = [];
	} else if (user.Mail == mail.value && !pw.value == "" && !user.Password.includes(pw.value)) {
		console.log("PW falsch");
		document.querySelector(".LoginNote").innerHtml = "";
		document.querySelector(".LoginNote").innerHTML = "The email or password you entered is incorrect.";
	}
}

function signUpBtn() {
	document.querySelector("#signupButton").addEventListener("click", (event) => {
		event.preventDefault();
		loadTemplate(1);
	});
}
async function setAddNewUserBtn() {
	document.querySelector("#signUpForm").addEventListener(
		"submit",
		async (event) => {
			event.preventDefault();
			saveUserArr();
			backend.setItem("UserDates", JSON.stringify(userDates));
			clearInputfields();
			userDates = JSON.parse(await backend.getItem("UserDates")) || [];
			file = "Temp/login.html";
			loadHTMLTemplate(true);
		},
		{ once: true }
	);
}

function saveUserArr() {
	Username = document.querySelector(".signUp-inputName");
	Usersurname = document.querySelector(".signUp-inputSurname");
	Usermail = document.querySelector(".signUp-inputMail");
	Userpassword = document.querySelector(".signUp-inputPassword");
	userDates.push({
		Name: Username.value,
		Surname: Usersurname.value,
		Mail: Usermail.value,
		Password: Userpassword.value,
	});
}
function clearInputfields() {
	(Username.value = ""), (Usersurname.value = ""), (Usermail.value = ""), (Userpassword.value = "");
}

function forgotPwBtn() {
	document.querySelector("#forgotPasswordButton").addEventListener("click", (event) => {
		event.preventDefault();
		loadTemplate(2);
		setTimeout(() => {
			setForgotPwEvent();
		}, 200);
	});
}

function setForgotPwEvent() {
	document.getElementById("senResetPwMailButton").addEventListener("click", (event) => {
		event.preventDefault();
		loadTemplate(3);
	});
}

async function loadTemplate(version) {
	if (version == 0) {
		file = "Temp/login.html";
		await loadHTMLTemplate();
	}
	if (version == 1) {
		file = "Temp/signUp.html";
		await loadHTMLTemplate();
		setAddNewUserBtn(true);
	}
	if (version == 2) {
		file = "Temp/forgot_password.html";
		await loadHTMLTemplate(true);
	}
	if (version == 3) {
		file = "Temp/reset_password.html";
		await loadHTMLTemplate(true);
		loadChangePasswordEvent();
	}
}

async function loadHTMLTemplate(blueBackground) {
	let resp = await fetch(file);
	bodyTag.innerHTML = await resp.text();
	if (blueBackground) bodyTag.style = "background-color: var(--color-blue);";
}

function loadChangePasswordEvent() {
	document.querySelector("button").addEventListener("click", (event) => {
		animationEndEvent = false;
		event.preventDefault();
		document.querySelector(".alertChangePW").classList.add("alertChangePWloaded");
		setTimeout(() => {
			location.reload();
		}, 500);
	});
}
