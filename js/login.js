setURL("https://gruppe-398.developerakademie.net/smallest_backend_ever");
let userDates = [];
let LoginBtn;
document.addEventListener("DOMContentLoaded", init);

user = {
	Name: "",
	Surname: "",
	Mail: "",
	Password: ""
}

async function init() {
	await downloadFromServer();
	userDates = JSON.parse(backend.getItem("UserDates")) || [];
	setBtns();
}

function setBtns() {
	loginBtn();

}

function loginBtn() {
	document.querySelector('#loginButton').addEventListener('click', () => {
		let mailInput = document.querySelector('#eMailInput');
		let pwInput = document.querySelector('#passwordInput');
		checkLogin(mailInput, pwInput);
	});
}

function checkLogin(mail, pw) {
	if (userDates.length == 0) {
		console.error("No Userdata available!");
	}

	for (let i = 0; i < userDates.length; i++) {
		if (userDates.Mail.includes(mail.value) && !mail.value == "") {
			let user = userDates[i];

			if (user.Password == pw.value && !pw.value == "") {
				let userName = userDates[i].Name;
				window.open((href = "./summary.html"), "_self");
				localStorage.removeItem('user');
				localStorage.setItem('user', JSON.stringify(userName));
				userDates = [];
			} else {
				document.querySelector('.LoginNote').innerHTML = "";
				document.querySelector('.LoginNote').innerHTML = "Wrong Password";
			}
		} else {
			document.querySelector('.LoginNote').innerHTML = "";
			document.querySelector('.LoginNote').innerHTML = "Wrong eMail";
		}
	}
}


addEventListener("animationend", () => {
	document.getElementById("loading-page").style = "display: none;";

});




function initLoginPage() {
	addEventListeners();
}

function addEventListeners() {
	document.getElementById("loginButton").addEventListener("click", setLogin);
	document.getElementById("signupButton").addEventListener("click");
}

function setLogin() {
	document.getElementById("eMailInput").value = "joinLogin@join.de";
	document.getElementById("passwordInput").value = "wasEinCoolesPassword";
}
