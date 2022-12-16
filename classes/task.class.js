class Task {
  Title;
  Contacts = [];
  Deadline;
  Category;
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
    //console.log(this.Title, this.Deadline, this.Priority, this.Contacts);
  }

  checkpriority() {
    if (document.querySelector(".priority-container .active")) {
      return document.querySelector(".priority-container .active span").textContent;
    }
    return false;
  }
  clearForm() {
    document.getElementById("urgent-btn").className = "priority";
    document.getElementById("medium-btn").className = "priority";
    document.getElementById("low-btn").className = "priority";
   document.querySelector('.selectedContacts').innerHTML="";
    document.querySelector('.input-title').value= "";
    document.getElementById("date-input").value = "";
    document.getElementById("description-input").value = "";
    this.deactivtedContactDropdown();
    openList(3);
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
    document.querySelectorAll(".contacts div input").forEach((element) => {
      element.checked = false;
      
    });
    contactList = [];
  }

}