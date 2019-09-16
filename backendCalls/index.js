const axios = require("axios");
const axiosInstance = axios.create({
  baseURL: "https://reqres.in/api"
});

const getUsers = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/users?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getUser = async id => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
const createUser = async (email, first_name, last_name, avatar) => {
  const newUser = {
    email,
    first_name,
    last_name,
    avatar
  };
  try {
    const response = await axiosInstance.post(`/users`, newUser);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
const overwriteUser = async (id, email, first_name, last_name, avatar) => {
  const updatedUser = {
    email,
    first_name,
    last_name,
    avatar
  };

  try {
    const response = await axiosInstance.put(`/users/${id}`, updatedUser);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
const updateUserEmail = async (id, email) => {
  let updatedUser = {
    data: {
      email
    }
  };
  try {
    const result = await axiosInstance.patch(`/users/${id}`, updatedUser);
    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async id => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

_USERS = getUsers(2);
