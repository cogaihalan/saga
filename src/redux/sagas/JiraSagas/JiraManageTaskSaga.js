import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
  CHANGE_ASSIGNESS,
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
  REMOVE_ASSIGNESS,
  UPDATE_DESCRIPTION_TASK,
  UPDATE_TASK_DETAIL,
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

function* handleChangeAndPostTaskDetail(action) {
  switch (action.actionType) {
    case UPDATE_TASK_DETAIL:
      yield put({
        type: UPDATE_TASK_DETAIL,
        updateTask: action.updateTask,
      });
      break;
    case UPDATE_DESCRIPTION_TASK:
      yield put({
        type: UPDATE_TASK_DETAIL,
        updateTask: action.updateTask,
      });
      break;
    case CHANGE_ASSIGNESS:
      yield put({
        type: CHANGE_ASSIGNESS,
        newAssignee: action.userSelected,
      });
      break;
    case REMOVE_ASSIGNESS:
      yield put({
        type: REMOVE_ASSIGNESS,
        userID: action.userID,
      });
      break;
    default:
      throw new Error("Invalid action type !");
  }
  const { taskDetail } = yield select((state) => state.JiraTaskReducer);
  const listUserAsign = taskDetail.assigness.map((assignee) => assignee.id);
  const taskUpdateDetail = {
    ...taskDetail,
    listUserAsign,
  };
  try {
    const { status } = yield call(
      JiraService.updateTaskDetail,
      taskUpdateDetail
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectID: taskUpdateDetail.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_API,
        taskID: taskUpdateDetail.taskId,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiHandleChangeAndPostTaskDetail() {
  yield takeLatest(UPDATE_TASK_DETAIL_API, handleChangeAndPostTaskDetail);
}
