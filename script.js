
let startTime = null;
let stopTime = null;
let travelStart = null;
let travelStop = null;
let timerInterval = null;
let travelInterval = null;

function formatTime(date) {
  return date.toLocaleString();
}

function updateOutput() {
  let output = "";
  if (startTime) output += `Start Time: ${formatTime(startTime)}\n`;
  if (stopTime) output += `Stop Time: ${formatTime(stopTime)}\n`;
  if (travelStart) output += `Travel Start: ${formatTime(travelStart)}\n`;
  if (travelStop) output += `Travel Stop: ${formatTime(travelStop)}\n`;

  let totalHours = 0;
  let travelHours = 0;
  if (startTime && stopTime) {
    totalHours = (stopTime - startTime) / 3600000;
    output += `Total Hours: ${totalHours.toFixed(2)}\n`;
  }
  if (travelStart && travelStop) {
    travelHours = (travelStop - travelStart) / 3600000;
    output += `Travel Hours: ${travelHours.toFixed(2)}\n`;
  }
  let regular = Math.min(totalHours, 8);
  let overtime = Math.max(totalHours - 8, 0);
  output += `Regular Hours: ${regular.toFixed(2)}\n`;
  output += `Overtime Hours: ${overtime.toFixed(2)}\n`;

  document.getElementById("output").innerText = output;
}

function startWork() {
  startTime = new Date();
  updateOutput();
}

function stopWork() {
  stopTime = new Date();
  updateOutput();
}

function startTravel() {
  travelStart = new Date();
  updateOutput();
}

function stopTravel() {
  travelStop = new Date();
  updateOutput();
}

function resetTime() {
  startTime = null;
  stopTime = null;
  travelStart = null;
  travelStop = null;
  updateOutput();
}

function copyToClipboard() {
  navigator.clipboard.writeText(document.getElementById("output").innerText);
}

function saveToFile() {
  const blob = new Blob([document.getElementById("output").innerText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "timesheet.txt";
  link.click();
}
