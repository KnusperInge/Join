let contactArray = [];
let letters = [];

async function loadContactList() {
    contactArray = await fetch('../json/contact.json');
    contactArray = await contactArray.json();
    loadLetters();
}

function loadLetters() {
    document.getElementById('contact-list').innerHTML = '';
    contactArray.forEach(element => {
        let letter = element['surname'].charAt(0).toUpperCase();
        if (letters.includes(letter) == false) {
            letters.push(letter);
        }
    });

    letters.sort();

    letters.forEach(letter => {
        letterSmall = letter.toLowerCase()
        document.getElementById('contact-list').innerHTML += `
            <div class="contact-lettercompartment">
                <span>${letter}</span>
                <hr>
                <div id="${letterSmall}-list">
                </div>
            </div>
        `;

        let list = document.getElementById(`${letterSmall}-list`);
        contactArray.forEach(contact => {
            if(contact['surname'].charAt(0) == letter) {
                list.innerHTML += `
                    <div class="listed-contact">
                        <img src="./img/info.png">
                        <div class="listed-contact-info">
                            <span>${contact['name']} ${contact['surname']}</span>
                            <span class="contact-mail">${contact['email']}</span>
                        </div>
                    </div>
                `;
            }
        });
    });
}