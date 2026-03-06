const beforeLen = document.getElementById("beforeLen"); // 入力された距離
const minutesInput = document.getElementById("minutes"); // 入力された分数
const secondsInput = document.getElementById("seconds"); // 入力された秒数
const afterLen = document.getElementById("afterLen"); // 変換後の距離
const output = document.getElementById("output"); // 結果の出力
const mh = document.getElementById("hm"); // 時速の出力(m/h)
const mm = document.getElementById("mm"); // 分速の出力(m/m)
const ms = document.getElementById("sm"); // 秒速の出力(m/s)

function calculate() {
  const bL = parseFloat(beforeLen.value) || 0;
  const m = parseFloat(minutesInput.value) || 0;
  let s = parseFloat(secondsInput.value) || 0;
  const aL = parseFloat(afterLen.value) || 0;

  if (60 <= s) {
    secondsInput.value = 59;
    s = 59;
  }

  const time = m * 60 + s;

  if (0 < bL && 0 < time) {
    mh.textContent = `時速: ${((bL / time) * 3.6).toFixed(2)}km/h`;
    mm.textContent = `分速: ${((bL / time) * 60).toFixed(2)}m/m`;
    ms.textContent = `秒速: ${(bL / time).toFixed(2)}m/s`;

    if (aL > 0) {
      const newTime = (time * aL) / bL;
      const newMinute = Math.floor(newTime / 60);
      const newSecond = (newTime % 60).toFixed(0);
      output.textContent = `変換後のタイム: ${newMinute}分${newSecond}秒`;
    }
  } else {
    output.textContent = `変換後のタイム: `;
    mh.textContent = `時速: `;
    mm.textContent = `分速: `;
    ms.textContent = `秒速: `;
  }
}

beforeLen.addEventListener("input", calculate);
minutesInput.addEventListener("input", calculate);
secondsInput.addEventListener("input", calculate);
afterLen.addEventListener("input", calculate);
