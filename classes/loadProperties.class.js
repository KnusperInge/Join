class Loading extends Task {
  allTasksArr;
  urgentTasksArr = [];
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
    this.init();
    this.checkUrgent();
  }

  checkUrgent() {
    //Check Main Arr for urgent
    this.allTasksArr.forEach(arr => {
      if (arr.Priority == "Urgent") {
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
    document.getElementById('urgentTasks').innerText = this.urgentTasksArr.length;
    document.getElementById('upcomingDeadline').innerText = this.createDate();
  }


  init() {
    document.getElementById('AllTask').innerText = this.allTasksArr.length;

  }

  createDate() {
    this.YEAR = new Date(this.dates[0]).getFullYear();
    this.MONTH = this.MONTHS[new Date(this.dates[0]).getMonth()];
    this.DAY = new Date(this.dates[0]).getDate();
    return this.FinalDate = `${this.MONTH} ${this.DAY}, ${this.YEAR}`;
  }

}