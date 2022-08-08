//call : thực hiện hàm gọi API và trả về promise & blocking
import { call, takeLatest, put, delay } from "redux-saga/effects";
import { GET_TASK_LIST } from "../types/TodoListTypes";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingConstants";
import {
  ADD_TASK_API,
  GET_TASK_API,
  DELETE_TASK_API,
  CHANGE_STATUS_TASK_API,
} from "../types/TodoListTypes";
function* getTaskAPI() {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(1000);
    let { data, status } = yield call(toDoListService.getTaskAPI);
    // Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_LIST,
        data: data,
      });
    } else {
      console.log({ data: data, status: status });
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiActionGetTaskAPI() {
  yield takeLatest(GET_TASK_API, getTaskAPI);
}
function* addTaskAPI(action) {
  let { taskName } = action;
  yield call(() => {
    return toDoListService.addTaskAPI(taskName);
  });
  yield put({
    type: ADD_TASK_API,
  });
}
export function* theoDoiActionAddTaskAPI() {
  yield takeLatest(ADD_TASK_API, addTaskAPI);
}

function* deleteTaskAPI(action) {
  let { taskName } = action;
  try {
    yield call(() => {
      toDoListService.deleteTaskAPI(taskName);
    });
    yield put({
      type: GET_TASK_API,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiActionDeleteTaskAPI() {
  yield takeLatest(DELETE_TASK_API, deleteTaskAPI);
}

function* changeStatusTaskAPI(action) {
  let { taskName, isCompleted } = action;
  try {
    yield call(() => {
      toDoListService.deleteTaskAPI(taskName, isCompleted);
    });
    yield put({
      type: GET_TASK_API,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiActionChangeStatus() {
  yield takeLatest(CHANGE_STATUS_TASK_API, changeStatusTaskAPI);
}
