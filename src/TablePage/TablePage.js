/*
  Backend calls handlers
*/

let BASE_URL = "https://reqres.in/api";
let ALEX_BASE_URL = "http://172.22.13.38:1323";
let BEARER_TOKEN = "";

let getUsers = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
let getUser = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
let createUser = async (email, first_name, last_name, avatar) => {
  const newUser = {
    email,
    first_name,
    last_name,
    avatar
  };
  try {
    const response = await axios.post(`${BASE_URL}/users`, newUser);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
let overwriteUser = async (id, email, first_name, last_name, avatar) => {
  const updatedUser = {
    email,
    first_name,
    last_name,
    avatar
  };
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, updatedUser);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

let updateUserEmail = async (id, email) => {
  let updatedEmail = {
    email
  };
  try {
    const result = await axios.patch(`${BASE_URL}/users/${id}`, updatedEmail);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

let deleteUser = async id => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response.status;
  } catch (err) {
    console.log(err);
  }
};

/*
  Alex Backend call handlers
*/

const alexCreateUser = async (email, password) => {
  try {
    const body = {
      email,
      password
    };
    const response = await axios.post(`${ALEX_BASE_URL}/users`, body);
    return JSON.stringify(response.config.data);
  } catch (er) {
    console.error(er);
  }
};

let alexLoginUser = async (email, password) => {
  const body = {
    email: email,
    password: password
  };
  try {
    const response = await axios.post(`${ALEX_BASE_URL}/users/login`, body);
    BEARER_TOKEN = response.data.token;
    return JSON.stringify(response.data.token);
  } catch (er) {
    console.error(er);
  }
};

let alexGetRestricted = async token => {
  try {
    const response = await axios.get(`${ALEX_BASE_URL}/restricted`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.message;
  } catch (er) {
    console.error(er);
  }
};

let alexGetRestrictedPromise = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ALEX_BASE_URL}/restricted`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        resolve(response);
      })
      .catch(response => {
        reject(`The getRestricted call came out with an error: ${response}`);
      });
  });
};

let alexGetUsersPromise = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ALEX_BASE_URL}/users`)
      .then(response => {
        resolve(response);
      })
      .catch(response => {
        reject(`The getUsers call came out with an error: ${response}`);
      });
  });
};

/*
  Getting Table entries
*/
let avatars = document.getElementsByClassName("avatar");
let firstNames = document.getElementsByClassName("firstName");
let lastNames = document.getElementsByClassName("lastName");
let emails = document.getElementsByClassName("email");
let responseBody = document.getElementById("responseBody");
let alexCreateUserBody = document.getElementById("createUserResponse");
let alexLoginUserBody = document.getElementById("loginResponse");
let alexGetRestrictedBody = document.getElementById("getRestrictedResponse");
let createUserBtn = document.getElementById("createUserBtn");
let loginBtn = document.getElementById("loginBtn");
let getRestrictedBtn = document.getElementById("getRestrictedBtn");
let promiseAllResponse = document.getElementById("promiseAllResponse");
let editIcon = `
  <img
    class="editIcon"
    style="height: 10px; width: 10px"
    src="/ui-learning/assets/editIcon.png"
  />
`;

/*
  HTML Scripts
*/

function getCurrentPage(page = 1) {
  return page;
}

async function requestData(page) {
  const response = await getUsers(page);
  return response;
}

async function changePage(page) {
  await updateTable(page);
  let numbers = document.getElementsByClassName("numbers");

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].className = "numbers";
  }

  numbers[page - 1].className = "numbers active";
}

async function updateTable(page) {
  let i = 0;
  let j = 3;
  let addIndex = 0;
  let pageNr = 0;

  if (page === 1 || page === 2) {
    pageNr = page;
  } else if (page === 3) {
    addIndex = 3;
    pageNr = 1;
  } else {
    addIndex = 3;
    pageNr = 2;
  }
  try {
    let response = await requestData(pageNr);
    for (i; i < j; i++) {
      avatars[i].src = response.data[i + addIndex].avatar;
      firstNames[
        i
      ].innerHTML = `<p>${response.data[i + addIndex].first_name} ${editIcon} </p>              
      `;
      lastNames[
        i
      ].innerHTML = `<p>${response.data[i + addIndex].last_name} ${editIcon} </p>`;
      emails[
        i
      ].innerHTML = `<p>${response.data[i + addIndex].email} ${editIcon} </p>`;
    }
  } catch (e) {
    console.log(e);
  }
}

/*
  Hardcoded verb methods
*/

let handlePost = async () => {
  const result = await createUser(
    "cristian.naziru@test.com",
    "Cristian",
    "Naziru",
    "https://imagine.com/jpg"
  );
  responseBody.textContent = JSON.stringify(result);
};

let handlePut = async () => {
  const result = await overwriteUser(
    1,
    "updatedemail@email.com",
    "Gigi",
    "Becali",
    "https://ciobanu.ro/fcsb.jpg"
  );
  responseBody.textContent = JSON.stringify(result);
};

let handlePatch = async () => {
  const result = await updateUserEmail(1, "banel.nicolita@fcsb.peveata");
  responseBody.textContent = JSON.stringify(result);
};

let handleDelete = async () => {
  const result = await deleteUser(5);
  responseBody.textContent = JSON.stringify(result);
};

let handleAlexCreateUser = async () => {
  let createUserEmail = document.getElementById("createUserEmail").value;
  let createUserPassword = document.getElementById("createUserPassword").value;
  console.log(`${createUserEmail} and ${createUserPassword}`);
  const result = await alexCreateUser(createUserEmail, createUserPassword);
  alexCreateUserBody.textContent = result;
};

let handleAlexLogin = async () => {
  let loginEmail = document.getElementById("loginEmail").value;
  let loginPassword = document.getElementById("loginPassword").value;
  const result = await alexLoginUser(loginEmail, loginPassword);
  console.log("Result: ", result);
  alexLoginUserBody.textContent = result;
};

let handleAlexGetRestricted = async () => {
  const result = await alexGetRestricted(BEARER_TOKEN);
  console.log(result);
  alexGetRestrictedBody.textContent = result;
};

let handlePromiseAll = () => {
  Promise.all([
    alexGetUsersPromise(),
    alexGetRestrictedPromise(BEARER_TOKEN)
  ]).then(values => {
    console.log(values);
    promiseAllResponse.textContent = `The first response is: \n ${JSON.stringify(
      values[0].data
    )} \n\n
    The second response is: \n ${JSON.stringify(values[1].data)}`;
  });
};
updateTable(getCurrentPage());
function updateSmallTable(page) {}

/*
 Event Listeners
 */

// createUserBtn.addEventListener("click", handleAlexCreateUser());
