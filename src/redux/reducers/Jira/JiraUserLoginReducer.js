import { USER_LOGIN } from "../../../utils/constants/settingSystem";
import {
  CHANGE_USER,
  EDIT_USER,
  GET_USER,
  GET_USER_BY_PROJECT_ID,
} from "../../types/JiraConstants";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
  listUsers: [],
  listUsersByID: [],
  editUser: {},
};

const JiraUserLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, userLogin: action.userLogin };
    case GET_USER:
      return { ...state, listUsers: action.listUsers };
    case GET_USER_BY_PROJECT_ID:
      return { ...state, listUsersByID: action.listUsersByID };
    case EDIT_USER:
      return { ...state, editUser: action.editUser };
    default:
      return { ...state };
  }
};
export default JiraUserLoginReducer;
