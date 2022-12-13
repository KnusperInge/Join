let arrayJ = [];

async function test() {
    arrayJ = await fetch('./json/contact.json');
    arrayJ = await arrayJ.json()
}