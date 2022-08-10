import { USER_LOGIN } from "../../../utils/constants/settingSystem";
import { GET_USER } from "../../types/JiraConstants";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
  listUsers: [],
};

const JiraUserLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      return { ...state, userLogin: action.userLogin };
    case GET_USER:
      return { ...state, listUsers: action.listUsers };
    default:
      return { ...state };
  }
};
export default JiraUserLoginReducer;
