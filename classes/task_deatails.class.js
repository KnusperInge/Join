class Taskdetailview extends DynamixObjects {
  boardElem;
  prioBtns;

  constructor(elemTitle, dAd) {
    super();
    this.boardElem = dAd;
    this.showTaskDetail(elemTitle)
  }

  showTaskDetail(elemTitle) {
    let Task = Tasks.find((task) => task.Title === elemTitle);
    this.openDetail();
    this.renderDetailHead(Task);
    this.renderDetailBody(Task);
    this.addDetailCloseBtn();
    this.addSubtasksBtn(Task);
    this.setEditBtn(Task);
  }

  openDetail() {
    document.querySelector('.board-task-detail').classList.remove('d-none');
  }

  renderDetailHead(element) {
    this.renderDetailCategory(element);
    document.querySelector(".board-task-detail-body input").value = "";
    document.querySelector(".board-task-detail-body input").value = element.Title;
  }

  renderDetailBody(element) {
    document.querySelector(".board-task-detail-body textarea").value = "";
    document.querySelector(".board-task-detail-body textarea").value = element.Description;
    document.querySelector(".board-task-detail-date input").value = "";
    document.querySelector(".board-task-detail-date input").value = element.Deadline;
    this.renderPriority(element);
    this.renderSubtasks(element);

    this.renderDetailEditorList(element);
  }

  renderDetailCategory(element) {
    document.querySelector(".board-task-detail-head span").innerText = "";
    Categories.forEach((category) => {
      if (category.name.includes(element.Category)) {
        document.querySelector(".board-task-detail-head span").innerText = element.Category;
        document.querySelector(".board-task-detail-head span").style = `background:${category.Color}`;
      }
    });
  }

  renderPriority(element) {
    document.querySelector(".board-detail-prio span").innerHTML = "";
    document.querySelector(".board-detail-prio span").innerHTML = `${element.Priority} <img src="${this.boardElem.checkPriority(
      element
    )}">`;
    this.setPriorityBgColor(element);
  }

  setPriorityBgColor(element) {
    if (element.Priority == "Low") {
      document.querySelector(".board-detail-prio span").classList.add("low-light");
    }
    if (element.Priority == "Medium") {
      document.querySelector(".board-detail-prio span").classList.add("medium-light");
    }
    if (element.Priority == "Urgent") {
      document.querySelector(".board-detail-prio span").classList.add("urgent-light");
    }
  }

  renderSubtasks(Task) {
    let target = document.querySelector('.subtask-list');
    target.innerHTML = "";
    Task.Subtasks.forEach((subTask) => {
      let temp = document.querySelector('.detail-subtask-temp').content.cloneNode(true);
      temp.querySelector('div').setAttribute("id", `${subTask.Subtask}`);
      temp.querySelector('span').innerText = subTask.Subtask;
      temp.querySelector('input').checked = subTask.Checked;
      target.appendChild(temp);
    });
  }

  addSubtasksBtn(Task) {
    let subtasks = document.querySelectorAll('.subtask-list div');
    subtasks.forEach((elm) => {
      elm.addEventListener('click', (event) => {
        event.stopPropagation();
        this.checkSubtask(elm.id, Task);
      });
    })
  }
  checkSubtask(id, Task) {
    Task.Subtasks.forEach((elm) => {
      if (elm.Subtask.includes(id) && !elm.Checked) {
        elm.Checked = true;
        document.getElementById(`${id}`).lastElementChild.checked = elm.Checked;


      } else if (elm.Subtask.includes(id) && elm.Checked) {
        elm.Checked = false;
        document.getElementById(`${id}`).lastElementChild.checked = elm.Checked;

      }
    })
  }

  renderDetailEditorList(element) {
    document.querySelector(".board-task-detail-person-list");
    document.querySelector(".board-task-detail-person-list").innerHTML = "";
    element.Editors.forEach((editor) => {
      let temp = document.querySelector(".detail-editor-temp").content.cloneNode(true);
      let tempElements = temp.querySelectorAll("span");
      tempElements[0].innerText = editor.Initials;
      tempElements[0].style = `background:${editor.Color}`;
      tempElements[1].innerText = editor.Name;
      document.querySelector(".board-task-detail-person-list").appendChild(temp);
    });
  }

  addDetailCloseBtn() {
    document.querySelector(".board-task-detail-head img").addEventListener("click", () => {
      document.querySelector(".board-task-detail").classList.add("d-none");
      saveData();

      this.boardElem.loadTasks();
    });
  }

  setEditBtn(Task) {
    document.querySelector('.bord-task-edit-button').addEventListener('click', (event) => {
      event.stopPropagation();
      this.editTask(Task);
    });
  }

  editTask(Task) {
    this.toogleEdit();
    this.setactivPriortyBtn(Task);
    this.setPriorityBtn();
    document.querySelector(".board-task-detail-body input").readOnly = false;
    document.querySelector(".board-task-detail-body textarea").readOnly = false;
    document.querySelector(".board-task-detail-date input").setAttribute('type', 'date');
    document.querySelector(".board-task-detail-date input").readOnly = false;
    console.log('aktiv');
  }

  toogleEdit() {
    document.querySelector(".board-detail-prio span").classList.add('d-none');
    document.querySelector(".priority-container").classList.remove('d-none');
    document.querySelector(".subtask-container").classList.remove('d-none');
    document.querySelector(".searchContact-Container").classList.remove('d-none');
  }
  setactivPriortyBtn(Task) {
    if (Task.Priority == "Low") {
      document.getElementById('2').classList.add("low", "active");
    }
    if (Task.Priority == "Medium") {
      document.getElementById('1').classList.add("medium", "active");
    }
    if (Task.Priority == "Urgent") {
      document.getElementById('0').classList.add("urgent", "active");
    }
  }

}