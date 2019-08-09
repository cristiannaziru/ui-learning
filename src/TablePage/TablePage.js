/*
  Getting Table entries
*/
var avatars = document.getElementsByClassName("avatar");
var firstNames = document.getElementsByClassName("firstName");
var lastNames = document.getElementsByClassName("lastName");
var emails = document.getElementsByClassName("email");

function getCurrentPage(page = 1) {
  return page;
}

function requestData(page, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://reqres.in/api/users?page=${page}`, false);
  xhr.send();

  for (; xhr.readyState !== 4; )
    if (xhr.status === 200) {
      console.log("SUCCESS", xhr.responseText);
    } else {
      console.log("request_error");
    }

  return JSON.parse(xhr.response);
}

function changePage(page) {
  updateTable(page);
  let numbers = document.getElementsByClassName("numbers");

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].className = "numbers";
  }

  numbers[page - 1].className = "numbers active";
}

function updateTable(page) {
  let response = requestData(page, callback => {
    return callback;
  });
  console.log("response", response);
  for (let i = 0; i < 3; i++) {
    avatars[i].src = response.data[i].avatar;
    firstNames[i].innerHTML = `<p>${response.data[i].first_name}</p>`;
    lastNames[i].innerHTML = `<p>${response.data[i].last_name}</p>`;
    emails[i].innerHTML = `<p>${response.data[i].email}</p>`;
  }
}

updateTable(getCurrentPage());
