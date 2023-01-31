class Subtask {
  Tasks;
  constructor(tasks) {
    this.Tasks = tasks;
    this.setSubtaskBtn();
    this.setSubtaskClearBtn();
    this.setSubTaskAddBtn();
  }
  setSubtaskBtn() {
    document.querySelector('.subtask-container img').addEventListener('click', (event) => {
      event.srcElement.classList.add('d-none');
      document.querySelector('.subtask-img-container').classList.remove('d-none');
    });
  }

  setSubtaskClearBtn() {
    document.querySelector('#subtaskClearBtn').addEventListener('click', () => {
      document.querySelector('.subtask-container input').value = "";
      document.querySelector('.subtask-img-container').classList.add('d-none');
      document.querySelector('.subtask-container img').classList.remove('d-none');
    });
  }

  setSubTaskAddBtn() {
    document.querySelector('#subtaskAddBtn').addEventListener('click', () => {
      if (!document.querySelector('#subtask-input').value == "") {
        this.Tasks.Subtaks.push({
          Checked: false,
          Subtask: document.querySelector('.subtask-container input').value
        });
        document.querySelector('.subtask-container input').value = "";
        this.loadSubtasks();
      } else {
        document.querySelector('#subtask-input').focus();
      }

    });
  }

  loadSubtasks() {
    if (!this.Tasks.Subtaks.length == 0) {
      this.renderSubtask();
    } else {
      console.log('No Subtasks available');
    }
  }

  renderSubtask() {
    let target = document.querySelector('.subtasks');
    target.innerHTML = "";
    this.Tasks.Subtaks.forEach((sub) => {
      let template = document.querySelector('#subtask-temp').content.cloneNode(true);
      template.querySelector('input').checked = sub.Checked;
      template.querySelector('span').innerText = sub.Subtask;
      target.appendChild(template);
    });
  }
}