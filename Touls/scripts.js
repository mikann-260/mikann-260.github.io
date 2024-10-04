function hideOption() {
  var select = document.getElementById("Issue_type");
  var optionToHide = select.querySelector('option[value="Select_type_of_issue"]');
  if (optionToHide) {
      optionToHide.style.display = 'none';
  }
}
