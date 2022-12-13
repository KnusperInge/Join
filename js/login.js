let contacts = [];


addEventListener('animationend', () => document.getElementById('loading-page').style = 'display: none;');

async function loadContacts() {
    contacts = await fetch('./json/contact.json');
    contacts = await contacts.json()
}