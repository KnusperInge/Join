function startDragging(title) {
	currentDragElement = title;
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(category) {
	todos[currentDragElement].Status = category;
}

// ONLY FOR TESTING
document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#toDo").innerHTML = "";
	for (let i = 0; i < Tasks.length; i++) {
		let currentTask = Tasks[i];
		console.log(currentTask);
		document.querySelector("#toDo").innerHTML += `
            <div class="bord-tasks-container-task shadow-black" draggable="true" ondrag="startDragging(${currentTask.Title})">

              <div class="bord-task-cat dflex-center">${currentTask.Category}</div>

              <h4>${currentTask.Title}</h4>

              <div class="bord-task-desc">
                <span>${currentTask.Description}</span>
              </div>

              <div class="sub-progress">
                <div class="sub-chart"></div>

                <span>1/2 Done</span>

              </div>

              <div class="bord-task-editor">
                <span data-letters="SM" class="">SM</span>
                <img src="img/low_icon.png" />
              </div>
            </div>
        `;
	}
});
