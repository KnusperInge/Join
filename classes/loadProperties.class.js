class Loading extends Task {
  allTasksArr;
  urgentTasksArr = [];
  toDoTaskArr = [];
  inProgressArr = [];
  awaitArr = [];
  doneTaskArr = [];
  dates = [];
  MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  YEAR = 0;
  MONTH = "";
  DAY = 0;
  FinalDate = "";
  constructor() {
    super();
    this.allTasksArr = Tasks;
    console.log('Hallo Arry', this.allTasksArr);
    console.log('Datumsarry:', this.dates);

    this.checkUrgent();
    this.checkStatus();
    this.init();

  }
  checkStatus() {
    this.allTasksArr.forEach((arr) => {
      if (arr.Status == "toDo") {
        this.toDoTaskArr.push(arr);

      } if (arr.Status == "inProgress") {
        this.inProgressArr.push(arr);

      } if (arr.Status == "Await") {
        this.awaitArr.push(arr);
        document.getElementById('toDoTasks').innerText = this.toDoTaskArr.length;
      } if (this.Status == "Done") {
        this.doneTaskArr.push(arr);
        document.getElementById('toDoTasks').innerText = this.toDoTaskArr.length;
      }
    })
  }

  checkUrgent() {
    //Check Main Arr for urgent
    this.allTasksArr.forEach(arr => {
      if (arr.Priority == "Urgent" && arr.Status == "toDo" || arr.Status == "inProgress") {
        this.urgentTasksArr.push(arr);
      }
    });
    this.urgentTasksArr.forEach(date => {
      this.dates.push(Date.parse(date.Deadline));
    });
    //Nummeric sort of the Dates
    this.dates.sort((a, b) => {
      return a - b;
    });
  }
  createDate() {
    this.YEAR = new Date(this.dates[0]).getFullYear();
    this.MONTH = this.MONTHS[new Date(this.dates[0]).getMonth()];
    this.DAY = new Date(this.dates[0]).getDate();
    return this.FinalDate = `${this.MONTH} ${this.DAY}, ${this.YEAR}`;
  }
  init() {
    document.getElementById('urgentTasks').innerText = this.urgentTasksArr.length;
    document.getElementById('upcomingDeadline').innerText = this.createDate();
    document.getElementById('AllTask').innerText = this.allTasksArr.length;
    document.getElementById('toDoTasks').innerText = this.toDoTaskArr.length;
    document.getElementById('inProgress').innerText = this.inProgressArr.length;
    document.getElementById('awaitForFeedback').innerText = this.awaitArr.length;
    document.getElementById('done').innerText = this.doneTaskArr.length;
  }



}