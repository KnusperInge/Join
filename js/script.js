let navItems;
document.addEventListener("DOMContentLoaded", () => {
    includeHtml();
   checkNav();
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

function checkNav(){
    if(document.querySelector("nav").innerHTML==""){
       console.log(document.querySelector("nav"));
    }
}