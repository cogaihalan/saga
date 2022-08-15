import { call, takeLatest, put, delay } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
  CLOSE_DRAWER,
  CREATE_TASK_API,
  GET_PROJECT_DETAIL_API,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_API,
  GET_TASK_PRIORITY,
  GET_TASK_PRIORITY_API,
  GET_TASK_STATUS,
  GET_TASK_STATUS_API,
  GET_TASK_TYPE,
  GET_TASK_TYPE_API,
  // UPDATE_TASK_DETAIL,
  UPDATE_TASK_DETAIL_API,
} from "../../types/JiraConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConstants";
import { Notification } from "../../../utils/notification/Notification";
// Quản lý action saga
function* getTaskType(action) {
  try {
    const { data, status } = yield call(JiraService.getTaskType);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_TYPE,
        data: data.content,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetTaskType() {
  yield takeLatest(GET_TASK_TYPE_API, getTaskType);
}

function* getTaskPriority(action) {
  try {
    const { data, status } = yield call(JiraService.getTaskPriority);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_PRIORITY,
        data: data.content,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetTaskPriority() {
  yield takeLatest(GET_TASK_PRIORITY_API, getTaskPriority);
}

function* createTask(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);
  try {
    const { data, status } = yield call(JiraService.createTask, action.task);
    console.log(data.content, status);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: CLOSE_DRAWER,
      });
      Notification("success", "Create Task Successfully !");
    }
  } catch (err) {
    Notification("error", "Create Task failed !");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiCreateTask() {
  yield takeLatest(CREATE_TASK_API, createTask);
}

function* getTaskStatus(action) {
  try {
    const { data, status } = yield call(JiraService.getTaskStatus);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_STATUS,
        data: data.content,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetTaskStatus() {
  yield takeLatest(GET_TASK_STATUS_API, getTaskStatus);
}

function* getTaskDetail(action) {
  try {
    const { data, status } = yield call(
      JiraService.getTaskDetail,
      action.taskID
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        data: data.content,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetTaskDetail() {
  yield takeLatest(GET_TASK_DETAIL_API, getTaskDetail);
}

function* updateTaskDetail(action) {
  try {
    const { data, status } = yield call(
      JiraService.updateTaskDetail,
      action.updateTask
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        data: data.content,
      });
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectID: action.projectID,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiUpdateTaskDetail() {
  yield takeLatest(UPDATE_TASK_DETAIL_API, updateTaskDetail);
}
