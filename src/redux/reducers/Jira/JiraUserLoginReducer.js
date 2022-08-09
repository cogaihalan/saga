import { USER_LOGIN } from "../../../utils/constants/settingSystem";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
};

const JiraUserLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      state.userLogin = action.userLogin;
      return { ...state };
    default:
      return { ...state };
  }
};
export default JiraUserLoginReducer;
