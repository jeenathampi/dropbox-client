import { SET_CURRENT_USER, SET_CURRENT_SESSION, GET_ERRORS } from "./types";
import Pool from "../UserPool";

export const login = (user, authDetails) => async (dispatch) => {
  user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      dispatch({ type: SET_CURRENT_USER, payload: data });
      dispatch({ type: GET_ERRORS, payload: {} });
    },
    onFailure: (err) => {
      dispatch({ type: GET_ERRORS, payload: err });
    },
    newPasswordRequired: (data) => {
      console.log("newPasswordRequired:", data);
    },
  });
};

export const logout = () => (dipatch) => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
  }
  dipatch({ type: SET_CURRENT_SESSION });
  dispatch({ type: GET_ERRORS, payload: {} });
};
