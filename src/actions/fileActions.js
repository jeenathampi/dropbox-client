import axios from "axios";
import { GET_FILES, DELETE_FILE, GET_ERRORS, GET_FILE } from "./types";

export const getFiles = (userId) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_ALL_FILES + `/user/${userId}/files`
  );

  dispatch({ type: GET_FILES, payload: res.data });
  dispatch({ type: GET_ERRORS, payload: {} });
};

export const deleteFile = (id, params) => async (dispatch) => {
  await axios.delete(process.env.REACT_APP_EC2 + `/user/${id}/file`, {
    params: params,
  });
  dispatch({ type: DELETE_FILE, payload: id });
  dispatch({ type: GET_ERRORS, payload: {} });
};

export const uploadFile = (userId, formData, history) => async (dispatch) => {
  try {
    await axios.post(
      process.env.REACT_APP_EC2 + `/user/${userId}/file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    history.push("/dashboard");
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response });
  }
};

export const getFile = (userid, fileid, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_FILE + `/user/${userid}/file/${fileid}`
    );

    dispatch({ type: GET_FILE, payload: res.data });
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const updateFile = (userid, formData) => async (dispatch) => {
  await axios.put(
    process.env.REACT_APP_EC2 + `/user/${userid}/file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  dispatch({ type: GET_ERRORS, payload: {} });
};

export const getAdminFiles = () => async (dispatch) => {
  const res = await axios.get(process.env.REACT_APP_ADMIN_FILES);

  dispatch({ type: GET_FILES, payload: res.data });
  dispatch({ type: GET_ERRORS, payload: {} });
};
