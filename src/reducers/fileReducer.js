import { GET_FILES, DELETE_FILE, GET_FILE } from "../actions/types";

const initialstate = {
  files: [],
  file: {},
};
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload.Items,
      };
    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file.fileId !== action.payload),
      };
    case GET_FILE:
      return {
        ...state,
        file: action.payload,
      };
    default:
      return state;
  }
}
