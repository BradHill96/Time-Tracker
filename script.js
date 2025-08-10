
let startTime = null;
let stopTime = null;
let travelStart = null;
let travelStop = null;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

function formatTime(date) {
  return date.toLocaleString();
}

function startWork() {
  startTime = new Date();
  localStorage.setItem('startTime', startTime);
  updateDisplay();
}

function stopWork() {
  stopTime = new Date();
  localStorage.setItem('stopTime', stopTime);
  updateDisplay();
}

function startTravel() {
  travelStart = new Date();
  localStorage.setItem('travelStart', travelStart);
  updateDisplay();
}

function stopTravel() {
  travelStop = new Date();
  localStorage.setItem('travelStop', travelStop);
  updateDisplay();
}

function updateDisplay() {
  let output = document.getElementById('output');
  let start = localStorage.getItem('startTime');
  let stop = localStorage.getItem('stopTime');
  let travelS = localStorage.getItem('travelStart');
  let travelE = localStorage.getItem('travelStop');

  let summary = '';
  if (start) summary += `Start Time: ${new Date(start).toLocaleString()}<br>`;
  if (stop) summary += `Stop Time: ${new Date(stop).toLocaleString()}<br>`;
  if (start && stop) {
    let total = (new Date(stop) - new Date(start)) / 3600000;
    summary += `Total Hours: ${total.toFixed(2)}<br>`;
    summary += `Regular: ${Math.min(total, 8).toFixed(2)}<br>`;
    summary += `Overtime: ${Math.max(total - 8, 0).toFixed(2)}<br>`;
  }
  if (travelS) summary += `Travel Start: ${new Date(travelS).toLocaleString()}<br>`;
  if (travelE) summary += `Travel Stop: ${new Date(travelE).toLocaleString()}<br>`;
  if (travelS && travelE) {
    let travel = (new Date(travelE) - new Date(travelS)) / 3600000;
    summary += `Travel Hours: ${travel.toFixed(2)}<br>`;
  }

  output.innerHTML = summary;
}

function copyToClipboard() {
  let text = document.getElementById('output').innerText;
  navigator.clipboard.writeText(text);
}

function saveToFile() {
  let text = document.getElementById('output').innerText;
  let blob = new Blob([text], {type: 'text/plain'});
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'timesheet.txt';
  link.click();
}

window.onload = updateDisplay;
