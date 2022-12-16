class Loading extends Task {
  allTasksArr;

  constructor() {
    super();
    this.allTasksArr = Tasks;
    console.log('Hallo Arry', this.allTasksArr);
    this.init();
    this.checkUrgent();
  }

  checkUrgent() {
    this.allTasksArr.forEach(arr => {
      if (arr.Priority == "Urgent") {
        console.log("Ich bin das wichtige JSON", arr);
      }
    })
  }


  init() {
    document.getElementById('AllTask').innerText = this.allTasksArr.length;
  }



}