addEventListener("animationend", () => {
	document.getElementById("loading-page").style = "display: none;";
	initLoginPage();
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
