import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../utils/constants/settingSystem";
import { Notification } from "../../../utils/notification/Notification";
import {
  GET_USER_API,
  USER_SIGN_IN_API,
  GET_USER,
  ASSIGN_USER_TO_PROJECT_API,
  GET_ALL_PROJECTS_API,
  REMOVE_USER_FROM_PROJECT_API,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_API,
  USER_SIGN_UP_API,
  EDIT_USER_API,
  DELETE_USER_API,
  CLOSE_DRAWER,
} from "../../types/JiraConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConstants";
// Quản lý action saga
function* signIn(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);
  try {
    let { data } = yield call(JiraService.signIn, action.userLogin);
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    yield put({
      type: "CHANGE_USER",
      userLogin: data.content,
    });
    let history = yield select((stateList) => stateList.HistoryReducer.history);
    history.push("/jira/projects");
  } catch (err) {
    throw new Error(err.message);
  }

  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGN_IN_API, signIn);
}
function* signUp(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);
  try {
    let { status } = yield call(JiraService.signUp, action.newUser);
    if (status === STATUS_CODE.SUCCESS) {
      let history = yield select(
        (stateList) => stateList.HistoryReducer.history
      );
      history.push("/login");
      Notification("success", "Sign up new account successfully ! ");
    }
  } catch (err) {
    Notification("error", "Sign up new account failed ! ");
  }

  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiSignUp() {
  yield takeLatest(USER_SIGN_UP_API, signUp);
}
function* getUsers(action) {
  try {
    let { data, status } = yield call(JiraService.getUser, action.userKeyword);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER,
        listUsers: data.content,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
export function* theoDoiGetUsers() {
  yield takeLatest(GET_USER_API, getUsers);
}
function* getUsersByProjectId(action) {
  try {
    let { data, status } = yield call(
      JiraService.getUsersByProjectId,
      action.idProject
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        listUsersByID: data.content,
      });
    }
  } catch (err) {
    if (err.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        listUsersByID: [],
      });
    }
  }
}
export function* theoDoiGetUsersByProjectId() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_API, getUsersByProjectId);
}
function* editUser(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);
  try {
    let { status } = yield call(JiraService.editUser, action.editUser);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_API,
        userKeyword: "",
      });
      // let history = yield select(
      //   (stateList) => stateList.HistoryReducer.history
      // );
      // history.push("/login");
      Notification("success", "Edit user successfully ! ");
    }
  } catch (err) {
    Notification("error", "Sign up new account failed ! ");
  }
  yield put({
    type: HIDE_LOADING,
  });
  yield put({
    type: CLOSE_DRAWER,
  });
}
export function* theoDoiEditUser() {
  yield takeLatest(EDIT_USER_API, editUser);
}
function* deleteUser(action) {
  try {
    let { status } = yield call(JiraService.deleteUser, action.userId);
    if (status === STATUS_CODE.SUCCESS) {
      Notification("success", "Delete user successfully !");
      yield put({
        type: GET_USER_API,
        userKeyword: "",
      });
    }
  } catch (err) {
    Notification(
      "error",
      "Delete user failed !",
      `${err.response.data.content}`
    );
  }
}
export function* theoDoiDeleteUser() {
  yield takeLatest(DELETE_USER_API, deleteUser);
}
function* assignUserToProject(action) {
  try {
    let { status } = yield call(
      JiraService.assignUserToProject,
      action.userProject
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECTS_API,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
export function* theoDoiAssignUserToProject() {
  yield takeLatest(ASSIGN_USER_TO_PROJECT_API, assignUserToProject);
}

function* removeUserFromProject(action) {
  try {
    let { status } = yield call(
      JiraService.removeUserFromProject,
      action.userProject
    );
    if (status === STATUS_CODE.SUCCESS) {
      Notification("success", "Remove assignee successfully ! ");
      yield put({
        type: GET_ALL_PROJECTS_API,
      });
    }
  } catch (err) {
    Notification(
      "error",
      "Remove assignee successfully ! ",
      `${err.response.data.message}`
    );
  }
}
export function* theoDoiRemoveUserFromProject() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT_API, removeUserFromProject);
}
