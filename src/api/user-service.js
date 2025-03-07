import axios from "axios";

const baseUrl = "http://localhost:4100/login";

const login = async (data) => {
  try {
    const response = await axios.post(baseUrl, {
      data,
    });
    return response.data;
  } catch (error) {
    console.log("error getting notes");
    console.log(error);
  }
};

const userService = {
  login,
};
export default userService;
