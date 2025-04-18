import axios from "axios";

const baseUrl = "http://localhost:4100/login";

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const login = async (data) => {
  try {
    const response = await axios.post(baseUrl, {
      data,
    },config);
    return response.data;
  } catch (error) {
    console.log("error logging in");
    console.log(error);
  }
};

const register = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, data, config);
    return response.data;
  } catch (error) {
    console.log("error registering user");
    console.log(error);
    throw error;
  }
};

const userService = {
  login,
  register
};
export default userService;
