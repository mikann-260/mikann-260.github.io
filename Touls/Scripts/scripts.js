function hideOption() {
  var select = document.getElementById("Issue_type");
  var optionToHide = select.querySelector('option[value="Select_type_of_issue"]');
  if (optionToHide) {
      optionToHide.style.display = 'none';
  }
}

function Question_Generation() {
  var selectText = document.getElementById("Issue_type").value;
  if (selectText !== "Select_type_of_issue") {
    let percentage_List = ["全体","2分の1","4分の1","8分の1"];
    let Diameter_or_radius_List = ["直径","半径"]
    var percentage = percentage_List[Math.floor(Math.random() * percentage_List.length)];
    var Diameter_or_radius = Diameter_or_radius_List[Math.floor(Math.random() * Diameter_or_radius_List.length)];
    document.getElementById("problem_statement").textContent = `${Diameter_or_radius}${getRandomInt(2,25)}cmの${percentage}の面積`;
  }
  else {
    document.getElementById("problem_statement").textContent = "";
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("generateButton").addEventListener("click", function() {
  Question_Generation();
});
