let navItems = [];
let page = "";
document.addEventListener("DOMContentLoaded", async () => {
    await includeHtml();
    navItems = checkNavItem();
    page = checkItems();
    setActivelink();
})


async function includeHtml() {
    let includeElem = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElem.length; i++) {
        const element = includeElem[i];
        file = element.getAttribute("include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Element not Found';
        }
    }
}

function checkNavItem() {
    return document.querySelectorAll("nav ul li");
}

function checkItems() {
    let item = document.querySelector('[item]');
    let element = item.getAttribute("item");
    return element;
}
function setActivelink() {
    navItems.forEach((item) => {
        if (item.textContent == page) {
            item.classList.add('active');
        }
    })
}
function openboard() {
    open("/board.html", "_self");
}

function show(item, id) {
    let box = document.querySelectorAll('.textBox');
    let input = document.querySelectorAll(".option div input");
    input.forEach(item => {
        if (item.checked) {
            box[id].value = item.name;
            console.log(item);
        }
    })

    //box[id].value=item;
}
function openlist(id) {
    let dropdown = document.querySelectorAll('.dropdown');
    dropdown[id].classList.toggle('active');
}

function checkInput() {
    let input = document.querySelector('.input-title');
    if (input.value) {
        console.log('test');
        input.classList.add('black');
    } else {
        input.classList.remove('black');
    }

}


