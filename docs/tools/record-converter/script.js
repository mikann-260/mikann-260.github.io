const beforeLen = document.getElementById("beforeLen"); // 入力された距離
const minutesInput = document.getElementById("minutes"); // 入力された分数
const secondsInput = document.getElementById("seconds"); // 入力された秒数
const afterLen = document.getElementById("afterLen"); // 変換後の距離
const output = document.getElementById("output"); // 結果の出力
const mh = document.getElementById("hm"); // 時速の出力(m/h)
const mm = document.getElementById("mm"); // 分速の出力(m/m)
const ms = document.getElementById("sm"); // 秒速の出力(m/s)

const params = new URLSearchParams(window.location.search); // クエリパラメータを取得
const inputs = [beforeLen, minutesInput, secondsInput, afterLen];
const names = ["bl", "m", "s", "al"];

applyParam();

function applyParam() {
  let param = false;

  for (let i = 0; i < inputs.length; i++) {
    if (params.get(names[i]) != null) {
      inputs[i].value = params.get(names[i]);
      param = true;
    }
  }

  if (param) calculate();
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
  const bL = parseFloat(beforeLen.value) || 0;
  let m = parseFloat(minutesInput.value) || 0;
  let s = parseFloat(secondsInput.value) || 0;
  const aL = parseFloat(afterLen.value) || 0;

  if (m < 0) {
    minutesInput.value = 0;
    m = 0;
  }
  if (s < 0) {
    secondsInput.value = 0;
    s = 0;
  }
  if (60 <= s) {
    secondsInput.value = 59;
    s = 59;
  }

  const time = m * 60 + s;

  if (0 < bL && 0 < time) {
    mh.textContent = `${((bL / time) * 3.6).toFixed(2)}km/h`;
    mm.textContent = `${((bL / time) * 60).toFixed(2)}m/m`;
    ms.textContent = `${(bL / time).toFixed(2)}m/s`;

    if (aL > 0) {
      const newTime = (time * aL) / bL;
      const newMinute = Math.floor(newTime / 60);
      const newSecond = (newTime % 60).toFixed(1);
      output.textContent = `${newMinute}分${newSecond}秒`;
    } else {
      output.textContent = "";
    }
  } else {
    output.textContent = "";
    mh.textContent = "";
    mm.textContent = "";
    ms.textContent = "";
  }
}

for (let i = 0; i < inputs.length; i++)
  inputs[i].addEventListener("input", () => {
    calculate();
    changeURL();
  });
