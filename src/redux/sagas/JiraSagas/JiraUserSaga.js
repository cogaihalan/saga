import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../utils/constants/settingSystem";
import {
  GET_USER_API,
  USER_SIGN_IN_API,
  GET_USER,
  ASSIGN_USER_TO_PROJECT_API,
  GET_ALL_PROJECTS_API,
  REMOVE_USER_FROM_PROJECT_API,
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
    history.push("/jira");
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
      yield put({
        type: GET_ALL_PROJECTS_API,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
export function* theoDoiRemoveUserFromProject() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT_API, removeUserFromProject);
}
