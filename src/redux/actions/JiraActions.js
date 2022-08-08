import { USER_SIGN_IN_API } from "../types/JiraConstants";

export const SIGN_IN_ACTION = (username, password) => {
  return {
    type: USER_SIGN_IN_API,
    userLogin: {
      username,
      password,
    },
  };
};
