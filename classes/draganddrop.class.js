class DragandDrop {
	Tasks;
	draggedList;
	currentDragElement;
	title;
	category;
	template;
	imgLow = "img/low_icon.png";
	imgMedium = "img/medium_icon.png";
	imgUrgent = "img/urgent_icon.png";

	constructor(title, category) {
		this.title = title;
		this.category = category;
		this.Tasks = Tasks;
		this.loadTasks();
		this.setDetailBtn();
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
		this.template
			.querySelector(".bord-tasks-container-task")
			.setAttribute("ondrag", `startDragging("${element.Title}")`);
		this.template
			.querySelector(".bord-tasks-container-task").setAttribute("id", `${element.Title}`);
		this.template.querySelector(".bord-task-cat").innerText = element.Category;
		this.template.querySelector(".bord-tasks-container-task h4").innerText = element.Title;
		this.template.querySelector(".bord-task-desc span").innertext = element.Description;
		this.template.querySelector(".bord-task-editor img").src = this.checkPriority(element);
		this.draggedList.appendChild(this.template);
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
		console.log(event.target.id);

	}

	addDetailCloseBtn() {
		document.querySelector('.board-task-detail-head img').addEventListener('click', () => {
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
		document.querySelector('.board-task-detail-head span').innerText = "";
		document.querySelector('.board-task-detail-head span').innerText = element.Category;
		document.querySelector('.board-task-detail-body h1').innerText = "";
		document.querySelector('.board-task-detail-body h1').innerText = element.Title;
	}
	renderDetailBody(element) {
		document.querySelector('.board-task-detail-body span').innerText = "";
		document.querySelector('.board-task-detail-body span').innerText = element.Description;
		document.querySelector('.board-task-detail-date span').innerText = "";
		document.querySelector('.board-task-detail-date span').innerText = element.Deadline;
		document.querySelector('.board-detail-prio span').innerText = "";
		document.querySelector('.board-detail-prio span').innerText = `${element.Priority} <img src="img/urgent_icon.png" />`;
	}

	renderDetailEditosList(element) {
		document.querySelector('.board-task-detail-person-list').innerHTML = "";
	}
}
