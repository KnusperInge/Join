class Loading extends Task {
  allTasksArr;
  urgentTasksarr = [];
  dates = [];
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
        this.urgentTasksarr.push(arr);
      }
    })
    document.getElementById('urgentTasks').innerText = this.urgentTasksarr.length;
    this.urgentTasksarr.forEach(date => {
      this.dates.push(Date.parse(date.Deadline));
    })
    var highstestDate = Math.max(this.dates);

    console.log('Höchstes Datum:', this.dates);
  }


  init() {
    document.getElementById('AllTask').innerText = this.allTasksArr.length;
  }



}