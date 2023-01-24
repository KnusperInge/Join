class DragandDrop {
  Tasks;
  draggedList;
  currentDragElement;
  title;
  category;
  template;
  imgLow = 'img/low_icon.png';
  imgMedium = 'img/medium_icon.png';
  imgUrgent = 'img/urgent_icon.png';

  constructor(title, category) {
    this.title = title;
    this.category = category;
    this.Tasks = Tasks;
    this.loadTasks();
    this.setDetailBtn();
    this.changeStatusInitEventListener();
  }
  loadTasks() {
    this.clearTasks();
    this.Tasks.forEach((element) => {
      this.template = document
        .getElementById('task_card')
        .content.cloneNode(true);
      this.fillTemp(element);
    });
  }
  clearTasks() {
    document.querySelector('#toDo').innerHTML = '';
    document.querySelector('#inProgress').innerHTML = '';
    document.querySelector('#Await').innerHTML = '';
    document.querySelector('#Done').innerHTML = '';
  }
  checkPriority(element) {
    if (element.Priority == 'Low') {
      return this.imgLow;
    }
    if (element.Priority == 'Medium') {
      return this.imgMedium;
    }
    if (element.Priority == 'Urgent') {
      return this.imgUrgent;
    }
  }

  fillTemp(element) {
    this.draggedList = document.querySelector('#' + element.Status);
    this.fillTaskTemplate(element);
    this.fillTaskTemplate_subTasks(element);
    this.initDragAndDrop(element);
    this.draggedList.appendChild(this.template);
  }

  fillTaskTemplate(element) {
    this.template
      .querySelector('.bord-tasks-container-task')
      .setAttribute('id', `${element.Title}`);
    this.template.querySelector('.bord-task-cat').innerText = element.Category;
    this.template.querySelector('.bord-tasks-container-task h4').innerText =
      element.Title;
    this.template.querySelector('.bord-task-desc span').innerText =
      element.Description;
    this.template.querySelector('.bord-task-editor img').src =
      this.checkPriority(element);
  }

  // ANCHOR add drag and drop event listener
  initDragAndDrop(element) {
    this.template.querySelector('.bord-tasks-container-task').draggable =
      'true';
    this.template
      .querySelector('.bord-tasks-container-task')
      .setAttribute('ondrag', `startDragging("${element.Title}")`);
  }

  // ANCHOR init subtasks progressbar
  fillTaskTemplate_subTasks(element) {
    let SubtasksLength = element.Subtasks.length;
    if (SubtasksLength > 0) {
      this.initSubtaskTemp(element, SubtasksLength);
    } else {
      this.template.getElementById('progressBar-subtasks').style.display =
        'none';
    }
  }

  initSubtaskTemp(element, SubtasksLength) {
    let subTasksInProgress = 0;
    let subTasksDone = 0;
    let progressbarPercentage = 0;
    // check Subtask Status
    element.Subtasks.forEach((subTask) => {
      if (subTask.Checked == false) subTasksInProgress++;
      if (subTask.Checked == true) subTasksDone++;
    });
    // claculate progressbar width
    progressbarPercentage = (subTasksDone / SubtasksLength) * 100;
    this.setSubtaskTemp(
      progressbarPercentage,
      subTasksInProgress,
      subTasksDone
    );
    this.template.getElementById('progressBar-done').style.width =
      progressbarPercentage + '%';
    this.template.getElementById('subTasks-inProgress').innerHTML =
      subTasksInProgress;
    this.template.getElementById('subTasks-done').innerHTML = subTasksDone;
  }

  setSubtaskTemp(progressbarPercentage, subTasksInProgress, subTasksDone) {
    this.template.getElementById('progressBar-done').style.width =
      progressbarPercentage + '%';
    this.template.getElementById('subTasks-inProgress').innerHTML =
      subTasksInProgress;
    this.template.getElementById('subTasks-done').innerHTML = subTasksDone;
  }

  setDetailBtn() {
    let allShortTasks = document.querySelectorAll('.bord-tasks-container-task');
    allShortTasks.forEach((element) => {
      element.addEventListener('click', (event) => {
        this.openDetail(event);
        this.loadDetailContent(event);
      });
    });
    this.addDetailCloseBtn();
  }
  openDetail(event) {
    document.querySelector('.board-task-detail').classList.remove('d-none');
  }

  addDetailCloseBtn() {
    document
      .querySelector('.board-task-detail-head img')
      .addEventListener('click', () => {
        document.querySelector('.board-task-detail').classList.add('d-none');
      });
  }

  loadDetailContent(event) {
    this.Tasks.forEach((element) => {
      if (element.Title.includes(event.target.id)) {
        this.renderDetailHead(element);
        this.renderDetailBody(element);
        this.renderDetailEditosList(element);
      }
    });
  }

  renderDetailHead(element) {
    document.querySelector('.board-task-detail-head span').innerText = '';
    document.querySelector('.board-task-detail-head span').innerText =
      element.Category;
    document.querySelector('.board-task-detail-body h1').innerText = '';
    document.querySelector('.board-task-detail-body h1').innerText =
      element.Title;
  }
  renderDetailBody(element) {
    document.querySelector('.board-task-detail-body span').innerText = '';
    document.querySelector('.board-task-detail-body span').innerText =
      element.Description;
    document.querySelector('.board-task-detail-date span').innerText = '';
    document.querySelector('.board-task-detail-date span').innerText =
      element.Deadline;
    document.querySelector('.board-detail-prio span').innerText = '';
    document.querySelector(
      '.board-detail-prio span'
    ).innerText = `${element.Priority}`;
  }

  renderDetailEditosList(element) {
    element.Editors.forEach((currentPerson) => {
      document.querySelector('.board-task-detail-person-list').innerHTML =
        currentPerson;
    });
  }

  // ANCHOR change task status
  timer;
  touchedElement;
  //init d&d after holding for 0.5sec
  minTouchduration = 500;

  WindowTemplate;
  WindowOpen = false;
  Buttons = [];

  changeStatusInitEventListener() {
    document.addEventListener('touchstart', (event) => {
      event.composedPath().forEach((htmlElem) => {
        if (htmlElem.className == 'bord-tasks-container-task shadow-black') {
          this.touchedElement = [htmlElem];
          this.timer = setTimeout(() => {
            currentDragElement.openChangeStatusWindow();
          }, this.minTouchduration);
        }
      });
    });

    document.addEventListener('touchend', () => {
      clearTimeout(this.timer);
    });
  }

  openChangeStatusWindow() {
    if (window.innerWidth < 650) {
      this.setTemplate();
    }
  }

  setTemplate() {
    this.WindowTemplate = document
      .getElementById('changeTaskStatus_template')
      .content.cloneNode(true);
    this.WindowTemplate.getElementById('closeStatusWindow').addEventListener(
      'click',
      this.remove_changeStatusWindow
    );
    this.Buttons = this.WindowTemplate.querySelectorAll('button');
    this.Buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.changeTaskStatus(button);
      });
    });
    this.generate_changeStatusWindow();
  }

  changeTaskStatus(button) {
    let TasksIndex = this.findTaskIndex();
    console.log(Tasks[TasksIndex]);
    Tasks[TasksIndex].Status = button.innerHTML;
    saveData();
    // nur mit set Timeout ging es
    setTimeout(() => {
      loadData();
    }, 300);

    setTimeout(() => {
      this.remove_changeStatusWindow();
      this.loadTasks();
    }, 300);
  }

  findTaskIndex() {
    console.log();
    return Tasks.findIndex((task) => task.Title === this.touchedElement[0].id);
  }

  generate_changeStatusWindow() {
    this.WindowOpen = true;
    document.querySelector('main').appendChild(this.WindowTemplate);
  }

  remove_changeStatusWindow() {
    this.WindowOpen = false;
    document.getElementById('changeTaskStatus').remove();
  }
}
