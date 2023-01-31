setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");
let userDates = [];
let LoginBtn, file, Username, Usersurname, Usermail, Userpassword;
let bodyTag = document.querySelector("body");

user = {
	Name: "",
	Surname: "",
	Mail: "",
	Password: "",
};

document.addEventListener("DOMContentLoaded", init);
addEventListener("animationend", () => {
	document.getElementById("loading-page").style = "display: none;";
});

async function init() {
	await downloadFromServer();
	userDates = JSON.parse(backend.getItem("UserDates")) || [];
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

function signUpBtn() {
	document.querySelector("#signupButton").addEventListener("click", (event) => {
		event.preventDefault();
		loadTemplate(1);

	});
}

function forgotPwBtn() {
	document.querySelector("#forgotPasswordButton").addEventListener("click", (event) => {
		event.preventDefault();
		loadTemplate(2);
	});
}

async function loadTemplate(version) {
	if (version == 1) {
		file = "Temp/signUp.html";
		await loadHTMLTemplate();
		setAddNewUserBtn();
	}
	if (version == 2) {
		file = "Temp/forgot_password.html";
		loadHTMLTemplate();
	}
}

async function loadHTMLTemplate() {
	let resp = await fetch(file);
	bodyTag.innerHTML = await resp.text();
	bodyTag.style = "background-color: var(--color-blue);";
}

async function setAddNewUserBtn() {
	document.querySelector('#signUpForm').addEventListener("submit", async (event) => {
		event.preventDefault();
		Username = document.querySelector('.signUp-inputName');
		Usersurname = document.querySelector('.signUp-inputSurname');
		Usermail = document.querySelector('.signUp-inputMail');
		Userpassword = document.querySelector('.signUp-inputPassword');
		saveUserArr();
		backend.setItem("UserDates", JSON.stringify(userDates));
		clearInputfields();
		//userDates = JSON.parse(await backend.getItem("UserDates")) || [];
		window.open((href = "./index.html"), "_self");
	})
}

function saveUserArr() {
	userDates.push({
		Name: Username.value,
		Surname: Usersurname.value,
		Mail: Usermail.value,
		Password: Userpassword.value
	});

}
function clearInputfields() {
	Username.value = "",
		Usersurname.value = "",
		Usermail.value = "",
		Userpassword.value = ""
}

function checkLogin(mail, pw) {
	if (userDates.length == 0) {
		console.error("No Userdata available!");
	}

	for (let i = 0; i < userDates.length; i++) {
		if (userDates[i].Mail.includes(mail.value) && !mail.value == "") {
			let user = userDates[i];

			if (user.Password == pw.value && !pw.value == "") {
				let userName = userDates[i].Name;
				window.open((href = "./summary.html"), "_self");
				localStorage.removeItem('user');
				localStorage.setItem('user', JSON.stringify(userName));
				userDates = [];
			} else {
				document.querySelector(".LoginNote").innerHTML = "";
				document.querySelector(".LoginNote").innerHTML = "Wrong Password";
			}
		} else {
			document.querySelector(".LoginNote").innerHTML = "";
			document.querySelector(".LoginNote").innerHTML = "Wrong eMail";
		}
	}
}


