import { call, takeLatest, put, delay } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_API,
  DELETE_PROJECT_API,
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
    }
  } catch (err) {
    throw new Error(err);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiDeleteProject() {
  yield takeLatest(DELETE_PROJECT_API, deleteProject);
}
