class DragandDrop {
  Tasks;
  draggedList;
  currentDragElement;
  title;
  category;
  template = document.querySelector("#task_card").content.cloneNode(true);
  imgLow = "img/low_icon.png";
  imgMedium = "img/medium_icon.png";
  imgUrgent = "img/urgent_icon.png";

  constructor(title, category) {
    this.title = title;
    this.category = category;
    this.Tasks = Tasks;
    console.log(this.Tasks);
  }
  loadTasks() {
    this.clearTasks();
    this.Tasks.forEach((element) => {
      this.fillTemp(element);

    })
  }
  clearTasks() {
    document.querySelector("#toDo").innerHTML = "";
    document.querySelector("#inprogress").innerHTML = "";
    document.querySelector("#feedback").innerHTML = "";
    document.querySelector("#done").innerHTML = "";
  }

  checkPriority(element) {

    if (element.Priority == "Low") {
      return this.imgLow;
    }
    if (element.Priority == "Medium") {

      return this.imgMedium;
    }
    if (element.Priority == "Urgent") {
      return this.imgUrgent;
    }
  }

  fillTemp(element) {
    this.draggedList = document.querySelector("#" + element.Status);
    this.template.querySelector(".bord-tasks-container-task").setAttribute("ondrag", `startdragging("${element.Title}")`);
    this.template.querySelector(".bord-task-cat").innerText = element.Category;
    this.template.querySelector(".bord-tasks-container-task h4").innerText = element.Title;
    this.template.querySelector(".bord-task-desc span").innertext = element.Description;
    this.template.querySelector(".bord-task-editor img").src = this.checkPriority(element);
    this.draggedList.appendChild(this.template);
  }

}