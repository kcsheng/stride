const dayElement = $("#currentDay");
const timeElement = $("#currentTime");
const containerElement = document.querySelector(".container");
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

// Populate 9 hour time slots, place timepoint in dataset as a hook
function populateForm() {
  let result = ``;
  for (let i = 9; i <= 17; i++) {
    let newRow = `
        <div class="form-row">
          <div class="col-2 hour" id="time" data-hour="${i}">${i}</div>
          <div class="col-8" id="textarea"><textarea class="form-control text-white border-0" id="tasks"></textarea></div>
          <div class="col-2" id="btn"><button class="saveBtn" id="save-btn"><i class="fas fa-save fa-2x" id="save-icon"></i></button></div>
        </div>`;
    result += newRow;
  }
  containerElement.innerHTML = result;
  // Ajust the hours to 12 hour format
  allHourElements = document.querySelectorAll("#time");
  for (let j = 0; j < allHourElements.length; j++) {
    let nthHour = allHourElements[j];
    if (nthHour.innerText < 12) {
      nthHour.innerText += "AM";
    } else if (nthHour.innerText == 12) {
      nthHour.innerText += "PM";
    } else {
      nthHour.innerText = nthHour.innerText - "12" + "PM";
    }
  }
}

function paintTimeBlocks() {
  setInterval(colouriseEachTimeBlock, 1000);
}

function colouriseEachTimeBlock() {
  allHourElements.forEach((element) => {
    let hour = parseInt(element.dataset.hour);
    currentHourIn24 = parseInt(moment().format("HH"));
    let nextElement = element.nextElementSibling;
    if (hour < currentHourIn24) {
      nextElement.classList.add("past");
    } else if (hour == currentHourIn24) {
      nextElement.classList.add("present");
    } else {
      nextElement.classList.add("future");
    }
  });
}

// Program initiation
function init() {
  showLiveTime();
  populateForm();
  paintTimeBlocks();
  showTasks();
}

init();

// Task storage and event handling
$(containerElement).on("click", "button", storeTasks);
function storeTasks(e) {
  e.preventDefault();
  let target = $(e.target);
  // Traverse to find the corresponding time element
  let targetTimeElement = target.closest(".form-row").children("#time");
  let timeAtSave = targetTimeElement.attr("data-hour");
  // Traverse to find the textarea that may contain tasks
  let targetTextArea = targetTimeElement.next().find("textarea#tasks");
  let targetTextAreaValue = targetTextArea.val();
  // Write tasks to local storage
  if (targetTextAreaValue) {
    localStorage.setItem(timeAtSave, targetTextAreaValue);
    $("#save").dialog();
  }
}

function showTasks() {
  for (let i = 0; i < localStorage.length; i++) {
    let timePoint = localStorage.key(i);
    let textValue = localStorage.getItem(timePoint);
    allHourElements.forEach((element) => {
      // Reverse dom traversal
      if (element.dataset.hour === timePoint) {
        element.nextElementSibling.firstChild.innerText = textValue;
      }
    });
  }
}
// Clear data
const clearBtn = $("#clear-btn");
clearBtn.on("click", () => {
  localStorage.clear();
  init();
});
