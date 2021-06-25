const dayElement = $("#currentDay");
const timeElement = $("#currentTime");
const containerElement = document.querySelector(".container")
let currentHourIn24;
let allHourElements;

function getCurrentTime() {
  let currentDay = moment().format("dddd, MMMM Do");
  let currentTime = moment().format("h:mm:ss a");
  dayElement.text(currentDay);
  timeElement.text(currentTime);
}

function showLiveTime() {
  setInterval(getCurrentTime, 1000);
}

// Populate 9 hour time slots
function populateForm() {
  let result = ``;
  for(let i = 9; i <= 17; i++) {
    let newRow = ``;
      newRow = `
        <div class="form-row">
          <div class="col-2 hour" id="time" data-hour="${i}">${i}</div>
          <div class="col-8" id="textarea"><textarea class="form-control text-white border-0" id="tasks" name="tasks"></textarea></div>
          <div class="col-2" id="btn"><button class="saveBtn" id="save-btn"><i class="fas fa-save fa-2x"></i></button></div>
        </div>`
      result += newRow;
    } 
  containerElement.innerHTML = result;
  // Ajust the hours to 12 hour format
  allHourElements = document.querySelectorAll("#time");
  for(let j = 0; j < allHourElements.length; j++) {
    let nthHour = allHourElements[j];
    if(nthHour.innerText < 12) {
      nthHour.innerText += "AM";
    } else if(nthHour.innerText == 12) {
      nthHour.innerText += "PM";
    } else {
      nthHour.innerText = nthHour.innerText - "12" + "PM";
    }
  }
}

function coloriseTimeBlocks() {
  console.log(allHourElements)
  setInterval(() => {
    allHourElements.forEach((element) => {
      let hour = element.dataset.hour;
      currentHourIn24 = moment().format("hh");
      let nextElement = element.nextElementSibling
      if(hour > currentHourIn24) {
        nextElement.classList.add("future");
      } else if(hour == currentHour) {
        nextElement.classList.add("present");
      } else {
        nextElement.classList.add("past");
      }
    });

    
  },1000);
  
}

function init() {
  showLiveTime();
  populateForm();
  coloriseTimeBlocks();
}

init();