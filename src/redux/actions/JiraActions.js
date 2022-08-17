import { USER_SIGN_IN_API, USER_SIGN_UP_API } from "../types/JiraConstants";

export const SIGN_IN_ACTION = (username, password) => {
  return {
    type: USER_SIGN_IN_API,
    userLogin: {
      username,
      password,
    },
  };
};

export const SIGN_UP_ACTION = (newUser) => {
  return {
    type: USER_SIGN_UP_API,
    newUser,
  };
};
