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
    if (selectText == "Area_of_circle") {
      let Diameter_or_radius_List = ["直径","半径"]
      let percentage_List = ["全体","2分の1","4分の1","8分の1"];

      var percentage = percentage_List[Math.floor(Math.random() * percentage_List.length)];
      var size = getRandomInt(2,25);
      var Diameter_or_radius = Diameter_or_radius_List[Math.floor(Math.random() * Diameter_or_radius_List.length)];

      window.element = {
        "Diameter_or_radius": Diameter_or_radius,
        "size": size,
        "percentage": percentage,
      };

      document.getElementById("problem_statement").textContent = `${Diameter_or_radius}${size}cmの${percentage}の面積`;
      document.getElementById("complementary").textContent = "(円周率は3.14とする)";
      document.getElementById("Answers_to_the_question").textContent = "";
    }
  }
  else {
    document.getElementById("problem_statement").textContent = "<tr>";
    document.getElementById("complementary").textContent = "<tr>";
  };
}

function answer() {
  var selectText = document.getElementById("Issue_type").value;
  if (selectText == "Area_of_circle") {
    if (element["Diameter_or_radius"] == "直径") {
      var radius = element["size"] / 2
    }
    else if (element["Diameter_or_radius"] == "半径") {
      var radius = element["size"]
    }

    if (element["percentage"] == "全体") {
      var percentage = 1
    }
    else if (element["percentage"] == "2分の1") {
      var percentage = 1 / 2
    }
    else if (element["percentage"] == "4分の1") {
      var percentage = 1 / 4
    }
    else if (element["percentage"] == "8分の1") {
      var percentage = 1 / 8
    }
  var Answer = (radius ** 2 * 3.14) * percentage
  document.getElementById("Answers_to_the_question").textContent = `${Answer}㎠`;
}
}

function hide() {
  document.getElementById("Answers_to_the_question").textContent = "";
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
