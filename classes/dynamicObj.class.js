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
    this.prioBtns[id].classList.toggle("urgent", "active");
    this.prioBtns[1].className = "priority dflex-center";
    this.prioBtns[2].className = "priority dflex-center";
  }

  aktivateMedium(id) {
    this.prioBtns[id].classList.toggle("medium", "active");
    this.prioBtns[0].className = "priority dflex-center";
    this.prioBtns[2].className = "priority dflex-center";
  }

  aktivateLow(id) {
    this.prioBtns[id].classList.toggle("low", "active");
    this.prioBtns[0].className = "priority dflex-center";
    this.prioBtns[1].className = "priority dflex-center";
  }
}