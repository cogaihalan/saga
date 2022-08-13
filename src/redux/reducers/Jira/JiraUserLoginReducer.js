import { USER_LOGIN } from "../../../utils/constants/settingSystem";
import {
  CHANGE_USER,
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
};

const JiraUserLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, userLogin: action.userLogin };
    case GET_USER:
      return { ...state, listUsers: action.listUsers };
    case GET_USER_BY_PROJECT_ID:
      return { ...state, listUsersByID: action.listUsersByID };
    default:
      return { ...state };
  }
};
export default JiraUserLoginReducer;
