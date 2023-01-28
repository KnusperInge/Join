class DragandDrop {
	Tasks;
	draggedList;
	currentDragElement;
	title;
	category;
	template;
	TaskDetails;
	imgLow = "img/low_icon.png";
	imgMedium = "img/medium_icon.png";
	imgUrgent = "img/urgent_icon.png";
	selfLoadBoard;

	constructor(title, category) {
		this.selfLoadBoard = this;
		this.title = title;
		this.category = category;
		this.Tasks = Tasks;
		this.loadTasks();
		this.changeStatusInitEventListener();
		this.initTaskFilter();
	}

	loadTasks() {
		this.clearTasks();
		this.Tasks.forEach((element) => {
			this.template = document.getElementById("task_card").content.cloneNode(true);
			this.fillTemp(element);
		});
	}

	clearTasks() {
		document.querySelector("#toDo").innerHTML = "";
		document.querySelector("#inProgress").innerHTML = "";
		document.querySelector("#Await").innerHTML = "";
		document.querySelector("#Done").innerHTML = "";
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
		this.fillTaskTemplate(element);
		this.fillTaskTemplate_subTasks(element);
		this.initDragAndDrop(element);
		this.draggedList.appendChild(this.template);
	}

	fillTaskTemplate(element) {
		this.template.querySelector(".bord-tasks-container-task").setAttribute("id", `${element.Title}`);
		this.template.querySelector(".bord-task-cat").innerText = element.Category;
		this.setCategoryColor(element.Category);
		this.setInitials(element);
		this.template.querySelector(".bord-tasks-container-task h4").innerText = element.Title;
		this.template.querySelector(".bord-task-desc span").innerText = element.Description;
		this.template.querySelector(".bord-task-editor img").src = this.checkPriority(element);
		this.template.querySelector(".bord-tasks-container-task").addEventListener("click", (event) => {
			event.stopPropagation();
			this.TaskDetails = new Taskdetailview(element.Title, this.selfLoadBoard);
		});
	}
	setCategoryColor(element) {
		Categories.forEach((elm) => {
			if (elm.name.includes(element)) {
				this.template.querySelector(".bord-task-cat").style = `background:${elm.Color}`;
			}
		});
	}
	setInitials(element) {
		if (element.Editors.length <= 3) {
			element.Editors.forEach((elm) => {
				this.template.querySelector(
					".editor-list"
				).innerHTML += `<span class="dflex-center" style="background:${elm.Color}">${elm.Initials}</span> `;
			});
		} else {
			for (let i = 0; i < 3; i++) {
				this.template.querySelector(
					".editor-list"
				).innerHTML += `<span class="dflex-center" style="background:${element.Editors[i].Color}">${element.Editors[i].Initials}</span> `;
			}
			this.template.querySelector(".editor-list").innerHTML += `<span class="dflex-center" style="background:">+${
				element.Editors.length - 3
			}</span> `;
		}
	}

	// ANCHOR add drag and drop event listener
	initDragAndDrop(element) {
		this.template.querySelector(".bord-tasks-container-task").draggable = "true";
		this.template
			.querySelector(".bord-tasks-container-task")
			.setAttribute("ondrag", `startDragging("${element.Title}")`);
	}

	// ANCHOR init subtasks progressbar
	fillTaskTemplate_subTasks(element) {
		let SubtasksLength = element.Subtasks.length;
		if (SubtasksLength > 0) {
			this.initSubtaskTemp(element, SubtasksLength);
		} else {
			this.template.getElementById("progressBar-subtasks").style.display = "none";
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
		this.setSubtaskTemp(progressbarPercentage, SubtasksLength, subTasksDone);
	}

	setSubtaskTemp(progressbarPercentage, SubtasksLength, subTasksDone) {
		this.template.getElementById("progressBar-done").style.width = progressbarPercentage + "%";
		this.template.getElementById("subTasks-inProgress").innerHTML = SubtasksLength;
		this.template.getElementById("subTasks-done").innerHTML = subTasksDone;
	}

	loadDetailContent(event) {
		console.log(event);
		this.Tasks.forEach((element) => {
			console.log(element);
			if (element.Title.includes(event.target.id)) {
				this.renderDetailHead(element);
				this.renderDetailBody(element);
			}
		});
	}

	// ANCHOR change task status on tab version
	timer;
	touchedElement;
	//init d&d after holding for 0.5sec
	minTouchduration = 500;

	WindowTemplate;
	WindowOpen = false;
	Buttons = [];

	changeStatusInitEventListener() {
		document.addEventListener("touchstart", (event) => {
			event.composedPath().forEach((htmlElem) => {
				if (htmlElem.className == "bord-tasks-container-task shadow-black") {
					this.touchedElement = [htmlElem];
					this.timer = setTimeout(() => {
						currentDragElement.openChangeStatusWindow();
					}, this.minTouchduration);
				}
			});
		});

		document.addEventListener("touchend", () => {
			if (this.timer < 5) this.unsetOverlay();
			clearTimeout(this.timer);
		});
	}

	openChangeStatusWindow() {
		if (window.innerWidth < 650) {
			this.setTemplate();
		}
	}

	setOverlay() {
		document.querySelector(".board-overlay").classList.add("active");
	}

	unsetOverlay() {
		document.querySelector(".board-overlay").classList.remove("active");
	}

	setTemplate() {
		this.setOverlay();
		this.WindowTemplate = document.getElementById("changeTaskStatus_template").content.cloneNode(true);
		this.WindowTemplate.getElementById("closeStatusWindow").addEventListener("click", () => {
			this.remove_changeStatusWindow();
		});
		this.Buttons = this.WindowTemplate.querySelectorAll("button");
		this.Buttons.forEach((button) => {
			button.addEventListener("click", (e) => {
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
		this.unsetOverlay();
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
		document.querySelector("main").appendChild(this.WindowTemplate);
	}

	remove_changeStatusWindow() {
		this.unsetOverlay();
		this.WindowOpen = false;
		document.getElementById("changeTaskStatus").remove();
	}

	//ANCHOR Task filter
	searchValue;
	FilteredTasks = [];
	initTaskFilter() {
		document.addEventListener("input", (event) => {
			this.searchValue = event.target.value.toLowerCase();
			if (this.searchValue.length == 0) {
				this.loadTasks();
			} else {
				this.FilteredTasks = [];
				this.fillFilteresTasks();
			}
		});
	}

	fillFilteresTasks() {
		Tasks.forEach((task) => {
			if (this.checkSearchedTaskTitle(task)) {
				this.FilteredTasks.push(task);
			}
		});
		this.loadFilteredTasks();
	}

	checkSearchedTaskTitle(task) {
		let taskTitelLength = this.searchValue.length;
		return task.Title.slice(0, taskTitelLength).toLowerCase() == this.searchValue;
	}

	loadFilteredTasks() {
		this.clearTasks();
		this.FilteredTasks.forEach((element) => {
			this.template = document.getElementById("task_card").content.cloneNode(true);
			this.fillTemp(element);
		});
	}
}
