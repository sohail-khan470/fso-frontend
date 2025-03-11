import axios from "axios";

const baseUrl = "http://localhost:4100/login";

const login = async (data) => {
  try {
    const response = await axios.post(baseUrl, {
      data,
    });
    return response.data;
  } catch (error) {
    console.log("error logging in");
    console.log(error);
  }
};

const userService = {
  login,
};
export default userService;
