class Task {
  Title;
  Contacts = [];
  Deadline;
  Description;
  Priority;
  Subtaks = [];
  Status;

  constructor() {
    this.test();
  }
  test() {
    console.log("Ich bin ein Task");
  }

  init() {
    this.Title = document.querySelector('.input-title').value;
    this.Deadline = document.getElementById("date-input").value;
    this.Priority = this.checkpriority();
    this.Description = document.getElementById("description-input").value;
    this.Status = "toDo";
    this.Contacts = contactList;
    console.log(this.Title, this.Deadline, this.Priority, this.Contacts);
  }

  checkpriority() {
    if (document.querySelector(".priority .active")) {
      return document.querySelector(".priority .active").textContent;
    }
    return false;
  }
  clearForm() {
    document.getElementById("urgent-btn").className = "priority";
    document.getElementById("medium-btn").className = "priority";
    document.getElementById("low-btn").className = "priority";
   document.getElementById('selectedConacts').innerHTML="";
    document.querySelector('.input-title').value= "";
    document.getElementById("date-input").value = "";
    document.getElementById("description-input").value = "";
    this.deactivtedContactDropdown();
    openList();
  }
  aktivateUrgent() {
    document.getElementById("urgent-btn").classList.toggle("urgent");
    document.getElementById("urgent-btn").classList.toggle("active");
    document.getElementById("medium-btn").className = "priority";
    document.getElementById("low-btn").className = "priority";
  }
  aktivateMedium() {
    document.getElementById("medium-btn").classList.toggle("active");
    document.getElementById("medium-btn").classList.toggle("medium");
    document.getElementById("urgent-btn").className = "priority";
    document.getElementById("low-btn").className = "priority";
  }
  aktivateLow() {
    document.getElementById("low-btn").classList.toggle("active");
    document.getElementById("low-btn").classList.toggle("low");
    document.getElementById("urgent-btn").className = "priority";
    document.getElementById("medium-btn").className = "priority";
  }
  deactivtedContactDropdown() {
    document.querySelectorAll(".list div").forEach((element) => {
      element.lastElementChild.checked = false;
      contactList = [];
    });
  }
}
