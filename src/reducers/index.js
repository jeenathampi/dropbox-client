import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
  file: fileReducer,
  security: securityReducer,
  errors: errorReducer,
});
