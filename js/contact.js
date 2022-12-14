let contactArray = [];
let letters = [];

async function loadContactList() {
    contactArray = await fetch('../json/contact.json');
    contactArray = await contactArray.json();
    loadLetters();
}

function loadLetters() {
    loadLettersArray()
    letters.sort();
    generateLetterList()
}

function loadLettersArray() {
    document.getElementById('contact-list').innerHTML = '';
    contactArray.forEach(element => {
        let letter = element.surname.charAt(0).toUpperCase();
        if (!includesLetter(letter)) {
            letters.push(letter);
        }
    });
}

function generateLetterList() {
    letters.forEach(letter => {
        letterSmall = letter.toLowerCase()
        document.getElementById('contact-list').innerHTML += generateLetterHTML(letter, letterSmall);
        loadContacts(letter)
    });
}

function loadContacts(letter) {
    contactArray.forEach(contact => {
        if (getSurChar(contact) == letter) {
            document.getElementById(`${letterSmall}-list`).innerHTML += generateContactListHTML(contact);
        }
    });
}

function openContactInfo(currentMail) {
    let contact = contactArray.find(contactArray => contactArray.email === currentMail)
    document.getElementById('contact-informations').innerHTML = generateContactInfoHTML(contact);
}



// ANCHOR IF questions
function includesLetter(letter) {
   return letters.includes(letter)
}

function getSurChar(contact) {
   return  contact.surname.charAt(0)
}


// ANCHOR HTML include
function generateLetterHTML(letter, letterSmall) {
    return `
        <div class="contact-lettercompartment">
            <span>${letter}</span>
            <hr>
            <div id="${letterSmall}-list">
            </div>
        </div>
    `;
}

function generateContactListHTML(contact) {
    return `
        <div class="listed-contact" onclick="openContactInfo('${contact.email}')">
            <img src="./img/info.png">
            <div class="listed-contact-info">
                <span>${contact.name} ${contact.surname}</span>
                <span class="contact-list-mail">${contact.email}</span>
            </div>
        </div>
    `;
}

function generateContactInfoHTML(contact) {
    return `
        <div class="contact-header">
            <img src="${contact.icon}" class="contact-img">
            <div>
                <span>${contact.name} ${contact.surname}</span>
                <div class="addtask-box">
                    <img src="./img/plus_Icon.png">
                    <span>Add Task</span>
                </div>
            </div>
        </div>
        <div class="contact-mid">
            <span>Contact Information</span>
            <div>
                <img src="./img/pencil.png">
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="contact-mail">
            <span>E-Mail</span>
            <span>${contact.email}</span>
        </div>
        <div class="contact-number">
            <span>Mobil</span>
            <span>${contact.number[1].mobile}</span>
        </div>
    `;
}