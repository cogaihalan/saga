import { call, takeLatest, put, delay } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
  GET_TASK_PRIORITY,
  GET_TASK_PRIORITY_API,
  GET_TASK_TYPE,
  GET_TASK_TYPE_API,
} from "../../types/JiraConstants";

// Quản lý action saga
function* getTaskType(action) {
  yield delay(300);
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
  yield delay(300);
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
