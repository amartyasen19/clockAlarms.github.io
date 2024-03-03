const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const alarmsList = document.getElementById("alarmsList");


 
setInterval(() => {
  let date = new Date(),
    hr = date.getHours();
  min = date.getMinutes();
  sec = date.getSeconds();
  ampm = "AM";
  if (hr >= 12) {
    hr = hr - 12;
    ampm = "PM";
  }
  hr = hr == 0 ? (hr = 12) : hr;
  hr = hr < 10 ? "0" + hr : hr;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.innerText = `${hr}:${min}:${sec} ${ampm}`;

  // Check if any alarm matches the current time
  const alarmItems = document.querySelectorAll(".alarmItem");
  alarmItems.forEach((alarmItem) => {
    const alarmTime = alarmItem.querySelector("span").innerText;
    if (alarmTime === `${hr}:${min}:${sec} ${ampm}`) {
      alert(`Alarm Set At: ${alarmTime}`);
      // Optionally, you can remove the matched alarm from the list
      // alarmItem.remove();
    }
  });
}, 1000);

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

function setAlarm() {
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("Seconds") ||
    time.includes("AM/PM")
  ) {
    return alert("Please! Select valid time....");
  }

  // Check if an alarm with the same time already exists
  const existingAlarms = document.querySelectorAll(".alarmItem");
  for (const alarmItem of existingAlarms) {
    const existingAlarmTime = alarmItem.querySelector("span").innerText;
    if (existingAlarmTime === time) {
      alert(`Alarm for ${time} is already set!`);
      return;
    }
  }

  const listItem = document.createElement("li");
  listItem.className = "alarmItem";
  listItem.innerHTML = `
      <span>${time}</span>
      <button class="deleteButton" onclick="deleteAlarm(this)">Delete</button>
    `;

  alarmsList.appendChild(listItem);
}

function deleteAlarm(button) {
  const listItem = button.parentNode;
  listItem.parentNode.removeChild(listItem);
}

setAlarmBtn.addEventListener("click", setAlarm);
