const beforeLen = document.getElementById("beforeLen");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const afterLen = document.getElementById("afterLen");
const output = document.getElementById("output");
const hm = document.getElementById("hm");
const mm = document.getElementById("mm");
const sm = document.getElementById("sm");

function calculate() {
  const varBL = beforeLen.value;
  const varM = minutes.value;
  const varS = seconds.value;
  const varAL = afterLen.value;
  if (varS !== "") {
    let s = parseFloat(varS);
    if (60 <= s) {
      seconds.value = 59;
      s = 59;
    }
    if (varBL !== "" && varM !== "") {
      const bL = parseFloat(varBL);
      const m = parseFloat(varM);
      const time = m * 60 + s;
      hm.textContent = `時速: ${((bL / time) * 3.6).toFixed(2)}km/h`;
      mm.textContent = `分速: ${((bL / time) * 60).toFixed(2)}m/m`;
      sm.textContent = `秒速: ${(bL / time).toFixed(2)}m/s`;
      if (varAL !== "") {
        const aL = parseFloat(varAL);
        const newTime = time * (aL / bL);
        const newMinute = Math.floor(newTime / 60);
        const newSecond = (newTime % 60).toFixed(0);
        output.textContent = `変換後のタイム: ${aL}m: ${newMinute}分${newSecond}秒`;
      }
    }
  } else {
    output.textContent = `変換後のタイム: `;
    hm.textContent = `時速: `;
    mm.textContent = `分速: `;
    sm.textContent = `秒速: `;
  }
}

beforeLen.addEventListener("input", calculate);
minutes.addEventListener("input", calculate);
seconds.addEventListener("input", calculate);
afterLen.addEventListener("input", calculate);
