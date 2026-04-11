const startDateE = document.getElementById("sDate");
const startTimeE = document.getElementById("sTime");
const finishDateE = document.getElementById("fDate");
const finishTimeE = document.getElementById("fTime");

const howLongE = document.getElementById("howLong");
const percentE = document.getElementById("percent");
const elapsedTimeE = document.getElementById("elapsedTime");
const remainingTimeE = document.getElementById("remainingTime");

const params = new URLSearchParams(window.location.search);
const inputs = [startDateE, startTimeE, finishDateE, finishTimeE];
const names = ["sd", "st", "fd", "ft"];

let isRunning = false;

applyParam();

function formatTime(ms) {
  const MsUnits = [31536000000, 2678400000, 86400000, 3600000, 60000, 1000];
  // 31536000000 = 1000 * 60 * 60 * 24 * 365(1年をミリ秒に変換した値)
  //  2678400000 = 1000 * 60 * 60 * 24 * 31 (1カ月をミリ秒に変換した値)
  //   86400000  = 1000 * 60 * 60 * 24      (1日をミリ秒に変換した値)
  //   3600000   = 1000 * 60 * 60           (1時間をミリ秒に変換した値)
  //    60000    = 1000 * 60                (1分をミリ秒に変換した値)
  //    1000     = 1000                     (1秒をミリ秒に変換した値)
  const units = ["年", "カ月", "日", "時間", "分", "秒"];
  let Ms = ms;
  let MsText = "";
  let started = false;
  for (let i = 0; i < units.length; i++) {
    let value;
    if (i === 0) {
      value = Math.trunc(Ms / MsUnits[i]);
    } else {
      value = (Ms / MsUnits[i]).toFixed(0);
    }

    if (1 <= value || started) {
      started = true;
      MsText += `${value}${units[i]}`;
      Ms %= MsUnits[i];
    }
  }

  return MsText || "0秒";
}

function applyParam() {
  let param = false;

  for (let i = 0; i < inputs.length; i++) {
    if (params.get(names[i]) != null) {
      inputs[i].value = params.get(names[i]);
      param = true;
    }
  }

  if (param) startLoop();
}

function changeURL() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "") {
      params.set(names[i], inputs[i].value);
    } else {
      params.delete(names[i]);
    }
  }

  const newURL = `${window.location.pathname}?${params.toString()}`;
  history.replaceState(null, "", newURL);
}

function calculate() {
  const startDate = startDateE.value;
  const startTime = startTimeE.value || "00:00:00";
  const finishDate = finishDateE.value;
  const finishTime = finishTimeE.value || "00:00:00";

  if (startDate && finishDate) {
    const sDatetime = new Date(`${startDate}T${startTime}`);
    const fDatetime = new Date(`${finishDate}T${finishTime}`);
    const Now = new Date();

    if (isNaN(sDatetime) || isNaN(fDatetime)) {
      howLongE.textContent = "";
      percentE.textContent = "";
      elapsedTimeE.textContent = "";
      remainingTimeE.textContent = "";
      return;
    }

    const howLong = fDatetime - sDatetime;
    if (howLong <= 0) {
      howLongE.textContent = "";
      percentE.textContent = "";
      elapsedTimeE.textContent = "";
      remainingTimeE.textContent = "";
      return;
    }
    let percent = ((Now - sDatetime) * 100.0) / howLong;
    percent = Math.min(100, Math.max(percent, 0));
    if (percent == 0 || percent == 100) {
      percent = percent.toFixed(0);
    } else {
      percent = percent.toFixed(4);
    }
    let elapsedTime;
    let remainingTime;
    if (Now < sDatetime) {
      elapsedTime = 0;
      remainingTime = howLong;
    } else if (Now < fDatetime) {
      elapsedTime = Now - sDatetime;
      remainingTime = fDatetime - Now;
    } else {
      elapsedTime = howLong;
      remainingTime = 0;
    }

    if (percentE.textContent !== `${percent}%`) {
      percentE.textContent = `${percent}%`;
    }
    const HowLongText = formatTime(howLong);
    if (howLongE.textContent !== HowLongText) {
      howLongE.textContent = HowLongText;
    }
    const elapsedTimeText = formatTime(elapsedTime);
    if (elapsedTimeE.textContent !== elapsedTimeText) {
      elapsedTimeE.textContent = elapsedTimeText;
    }
    const remainingTimeText = formatTime(remainingTime);
    if (remainingTimeE.textContent !== remainingTimeText) {
      remainingTimeE.textContent = remainingTimeText;
    }
  } else {
    percentE.textContent = "";
    elapsedTimeE.textContent = "";
    remainingTimeE.textContent = "";
  }
}

function loop() {
  calculate();
  requestAnimationFrame(loop);
}

function startLoop() {
  if (isRunning) return;
  isRunning = true;
  loop();
  return;
}

for (let i = 0; i < inputs.length; i++)
  inputs[i].addEventListener("input", () => {
    startLoop();
    changeURL();
  });
