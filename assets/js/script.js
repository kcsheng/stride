const dayElement = $("#currentDay");
const timeElement = $("#currentTime");
const containerElement = document.querySelector(".container")
let currentHour;

function getCurrentTime() {
  let currentDay = moment().format("dddd, MMMM Do");
  let currentTime = moment().format("h:mm:ss a");
  currentHour = moment().format("h")
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
          <div class="col-8" id="textarea"><textarea class="form-control border-0" id="tasks" name="tasks"></textarea></div>
          <div class="col-2" id="btn"><button class="saveBtn" id="save-btn"><i class="fas fa-save fa-2x"></i></button></div>
        </div>`
      result += newRow;
    } 
  containerElement.innerHTML = result;
  // Ajust the hours to 12 hours format
  const allHours = document.querySelectorAll("#time");
  for(let j = 0; j < allHours.length; j++) {
    let nthHour = allHours[j];
    if(nthHour.innerText < 12) {
      nthHour.innerText += "AM";
    } else if(nthHour.innerText == 12) {
      nthHour.innerText += "PM";
    } else {
      nthHour.innerText = nthHour.innerText - "12" + "PM"
    }
  }
}

// function coloriseTimeBlocks() {
//   setInterval(() => {

//   }, 1000);
  
// }

function init() {
  showLiveTime();
  populateForm();
  // coloriseTimeBlocks();
}

init();