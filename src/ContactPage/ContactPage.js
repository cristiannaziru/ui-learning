const submitBtn = document.getElementById("submitBtn");
const firstName = document.getElementsByName("first-name");
const lastName = document.getElementsByName("last-name");
const age = document.getElementsByName("age");
const ageLabel = document.getElementById("ageLabel");
const firstLabel = document.getElementById("firstLabel");
const lastLabel = document.getElementById("lastLabel");

submitBtn.addEventListener("click", verifyFields);

function verifyFields() {
  console.log("The first name is: " + firstName[0]["value"]);
  console.log("The last name is: " + lastName[0]["value"]);
  console.log("The age is: " + age[0]["value"]);

  if (age[0]["value"] < 18) {
    ageLabel.style.display = "inherit";
  }
  if (firstName[0]["value"] === "" || /\d/.test(firstName[0]["value"])) {
    firstLabel.style.display = "inherit";
  }
  if (lastName[0]["value"] === "" || /\d/.test(lastName[0]["value"])) {
    lastLabel.style.display = "inherit";
  }
}
