class DynamixObjects {

  //ANCHOR - Priority buttons
  setPriorityBtn() {
    this.prioBtns = document.querySelectorAll('.priority-container .priority');
    this.prioBtns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
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

  aktivateUrgent(id) {
    this.prioBtns[id].classList.toggle("urgent");
    this.prioBtns[id].classList.toggle("active");
    this.prioBtns[1].className = "priority dflex-center";
    this.prioBtns[2].className = "priority dflex-center";
  }

  aktivateMedium(id) {
    this.prioBtns[id].classList.toggle("medium");
    this.prioBtns[id].classList.toggle("active");
    this.prioBtns[0].className = "priority dflex-center";
    this.prioBtns[2].className = "priority dflex-center";
  }

  aktivateLow(id) {
    this.prioBtns[id].classList.toggle("low");
    this.prioBtns[id].classList.toggle("active");
    this.prioBtns[0].className = "priority dflex-center";
    this.prioBtns[1].className = "priority dflex-center";
  }


  //ANCHOR Add new Contacts 
  person;

  searchContactClearBtn() {
    document.querySelector('#closeSearchContact').addEventListener('click', () => {
      document.querySelector('#searchContacts').value = "";
      document.querySelector('.outputContact').innerHTML = "";
    }, { once: true });
  }
  setkeyupSearchContact(Task) {
    document.querySelector('.searchContact-Container input').addEventListener('keyup', (event) => {
      let input = event.target;
      console.log(Task);
      this.searchContact(input, Task);
    });
  }
  searchContact(input, Task) {
    for (let i = 0; i < contactList.length; i++) {
      let checkPerson = contactList[i].Surname.includes(input.value);
      if (checkPerson && !input.value == "") {
        this.person = contactList[i];
        this.fillContactOutput(Task, input);
      };
    }
  }
  fillContactOutput(Task, input) {
    let output = document.querySelector('.outputContact');
    output.innerHTML = "";
    output.innerHTML = `<span>${this.person.Name} ${this.person.Surname}</span>`;
    this.setPreviewContactBtn(Task, input);
  }

  setPreviewContactBtn(Task, input) {
    document.querySelector('.outputContact span').addEventListener('click', (event) => {
      event.stopPropagation();
      input.value = this.person.Mail;
      document.querySelector('.outputContact').innerHTML = "";
      this.saveInviteContact(Task);
    }, { once: true });
  }

  saveInviteContact(Task) {
    document.getElementById('addContactBtn').addEventListener('click', (event) => {
      event.stopPropagation();
      console.log(Task);
      if (Task == undefined) {
        //Task.html
        this.editors.push(this.editorObj());
        document.querySelector('.searchContact-Container input').value = "";
        this.openSearchContact();
      } else {
        //EditorModus Board.html
        Task.Editors.push(this.editorObj());
        this.renderDetailEditorList(Task);
        this.searchContactClearBtn();
      }
    }, { once: true });
  }

  editorObj() {
    return {
      Name: this.person.Name + " " + this.person.Surname,
      Color: this.person.BgColor,
      Initials: this.person.Initials
    }
  }

}