import { call, takeLatest, put, delay } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { Notification } from "../../../utils/notification/Notification";
import {
  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_API,
  DELETE_PROJECT_API,
  UPDATE_PROJECT_API,
  CLOSE_DRAWER,
  GET_PROJECT_DETAIL_API,
  GET_PROJECT_DETAIL,
  GET_USER_BY_PROJECT_ID,
} from "../../types/JiraConstants";
import { HIDE_LOADING, DISPLAY_LOADING } from "../../types/LoadingConstants";
// Quản lý action saga
function* getAllProjects(action) {
  yield delay(300);
  try {
    const { data, status } = yield call(JiraService.getAllProjects);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECTS,
        data: data.content,
      });
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        listUsersByID: data.content[0].members,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetAllProjects() {
  yield takeLatest(GET_ALL_PROJECTS_API, getAllProjects);
}

function* deleteProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(150);
  try {
    const { status } = yield call(JiraService.deleteProject, action.projectId);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECTS_API,
      });
      Notification("success", "Delete project successfully !");
    }
  } catch (err) {
    Notification("error", "Delete project fail !");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiDeleteProject() {
  yield takeLatest(DELETE_PROJECT_API, deleteProject);
}

function* updateProject(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(350);
    const { status } = yield call(
      JiraService.updateProject,
      action.projectUpdate
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECTS_API,
      });
      Notification("success", "Updated project successfully !");
    }
  } catch (err) {
    Notification("error", "Updated project fail !");
  }
  yield put({
    type: HIDE_LOADING,
  });
  yield put({
    type: CLOSE_DRAWER,
  });
}
export function* theoDoiUpdateProject() {
  yield takeLatest(UPDATE_PROJECT_API, updateProject);
}

function* getProjectDetailByID(action) {
  try {
    const { data, status } = yield call(
      JiraService.getProjectByID,
      action.projectID
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        projectDetail: data.content,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetProjectDetailByID() {
  yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetailByID);
}
