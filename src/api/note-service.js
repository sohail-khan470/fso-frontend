import axios from "axios";

const baseUrl = "http://localhost:4100/notes";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log("error getting notes");
    console.log(error);
  }
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.log("error creating note");
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.log("error updating note");
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log("error deleting note");
  }
};

const findOne = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log("error finding note");
  }
};

const noteService = {
  getAll,
  create,
  update,
  remove,
  findOne,
  setToken,
};

export default noteService;
