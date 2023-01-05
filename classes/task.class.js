class Task {
  Title;
  Contacts = [];
  editors = [];
  selectedContacts;
  Deadline;
  Category;
  Description;
  Priority;
  Subtaks = [];
  Status;
  prioBtns;
  dropDownBtns;
  contactbtns;
  catagoryBtns;


  constructor() {
    this.setPriorityBtn();
    this.setDropdownBtn();
    this.setContactBtn();
    this.setCategoryBtn();
    this.setAddBtn();
    this.setClearBtn();
  }

  setPriorityBtn() {
    this.prioBtns = document.querySelectorAll('.priority-container .priority');

    this.prioBtns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        let id = event.target.id;
        this.aktivatePriorityBtn(id)
      });
    });
  }

  aktivatePriorityBtn(id) {
    if (id == 0) {
      this.aktivateUrgent(id);
    }
    else if (id == 1) {
      this.aktivateMedium(id);
    }
    else {
      this.aktivateLow(id);
    }
  }

  setDropdownBtn() {
    this.dropDownBtns = document.querySelectorAll('.dropdown');
    this.dropDownBtns.forEach((btn) => {
      btn.firstElementChild.addEventListener('click', (event) => {
        let id = event.target.id;
        this.openList(id);
      });
    });
  }

  openList(i) {
    let dropdowns = document.querySelectorAll('.dropdown > .list');
    dropdowns[i].classList.toggle('active');
    this.toogleList();


  }
  toogleList() {
    if (!document.querySelector('.dropdown .active') && this.editors.length > 0) {
      this.renderIcons();
      this.selectedContacts.classList.toggle('active');
    } else {
      this.selectedContacts.classList.remove('active');
      this.selectedContacts.innerHTML = '';
    }
  }

  setContactBtn() {
    this.selectedContacts = document.querySelector('.selectedContacts');
    this.contactbtns = document.querySelectorAll('.contacts div');
    this.contactbtns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        let id = event.target.id;
        this.addContact(id);
      });
    });
  }

  addContact(id) {
    let checkedChild = this.contactbtns[id].lastElementChild;
    let editor = this.contactbtns[id].innerText;
    this.fillEditorsArr(editor, checkedChild);

  }
  checkArr(editor) {
    return this.editors.includes(editor);
  }

  fillEditorsArr(editor, checkedChild) {
    if (!checkedChild.checked && !this.checkArr(editor)) {
      checkedChild.checked = true;
      this.editors.push(editor);
    } else {
      this.editors.splice(this.editors.indexOf(editor), 1);
      checkedChild.checked = false;
    }
  }

  renderIcons() {
    this.editors.forEach((element) => {
      let firstletter = element.charAt(0).toUpperCase();
      this.selectedContacts.innerHTML += `<span>${firstletter}</span>`;
    });
  }

  setCategoryBtn() {
    this.catagoryBtns = document.querySelectorAll('.category div');
    this.catagoryBtns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        let id = event.target.id;
        this.addCategory(id);
      });
    });
  }
  addCategory(id) {
    const input = document.querySelector('.cagetorgy-input');
    input.value = this.catagoryBtns[id].textContent;
    this.openList(1);
    if (!input.value == '') {
      this.Category = this.catagoryBtns[id].textContent;
    }
  }

  setAddBtn() {
    document.querySelector('.AddButton').addEventListener('click', this.handleForm);
  }

  setClearBtn() {
    document.querySelector('#clear-btn').addEventListener('click', this.clearForm);

  }

  handleForm(event) {
    event.preventDefault();
    init();
    this.Tasks.push(newTask);
    saveData();
    this.clearForm();
  }

  init() {
    this.Title = document.querySelector('.input-title').value;
    this.Deadline = document.getElementById("date-input").value;
    this.Priority = this.checkpriority();
    this.Description = document.getElementById("description-input").value;
    this.Status = "toDo";
    this.Contacts = contactList;
    //console.log(this.Title, this.Deadline, this.Priority, this.Contacts);
  }

  checkpriority() {
    if (document.querySelector(".priority-container .active")) {
      return document.querySelector(".priority-container .active span").textContent;
    }
    return false;
  }
  clearForm() {
    this.prioBtns[0].className = "priority dflex-center";
    this.prioBtns[1].className = "priority dflex-center";
    this.prioBtns[2].className = "priority dflex-center";
    document.querySelector('#TaskForm').reset();
    this.deactivtedContactDropdown();
    openList(3);
  }

  // Set Bg-color for Prioritybtn
  aktivateUrgent(id) {
    this.prioBtns[id].classList.toggle("urgent");
    this.prioBtns[id].classList.toggle("active");
    this.prioBtns[1].className = "priority dflex-center";
    this.prioBtns[2].className = "priority dflex-center";
  }

  aktivateMedium(id) {
    this.prioBtns[id].classList.toggle("active");
    this.prioBtns[id].classList.toggle("medium");
    this.prioBtns[0].className = "priority dflex-center";
    this.prioBtns[2].className = "priority dflex-center";
  }

  aktivateLow(id) {
    this.prioBtns[id].classList.toggle("active");
    this.prioBtns[id].classList.toggle("low");
    this.prioBtns[0].className = "priority dflex-center";
    this.prioBtns[1].className = "priority dflex-center";
  }

  deactivtedContactDropdown() {
    document.querySelectorAll(".contacts div input").forEach((element) => {
      element.checked = false;

    });
    contactList = [];
  }

}