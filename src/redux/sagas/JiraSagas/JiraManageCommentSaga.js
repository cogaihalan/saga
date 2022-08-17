import { call, takeLatest, put, delay } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
  DELETE_COMMENT_API,
  GET_COMMENT_API,
  GET_TASK_DETAIL_API,
  INSERT_COMMENT_API,
  UPDATE_COMMENT_API,
} from "../../types/JiraConstants";
function* getComment(action) {
  try {
    const { data, status } = yield call(JiraService.getComment, action.taskID);
    console.log(data, status);
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetComment() {
  yield takeLatest(GET_COMMENT_API, getComment);
}

function* insertComment(action) {
  const { newComment } = action;
  try {
    const { status } = yield call(JiraService.insertComment, newComment);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_API,
        taskID: newComment.taskId,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiInsertComment() {
  yield takeLatest(INSERT_COMMENT_API, insertComment);
}
function* deleteComment(action) {
  try {
    const { status } = yield call(JiraService.deleteComment, action.commentID);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_API,
        taskID: action.taskID,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiDeleteComment() {
  yield takeLatest(DELETE_COMMENT_API, deleteComment);
}

function* updateComment(action) {
  try {
    const { status } = yield call(
      JiraService.updateComment,
      action.updateComment
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_API,
        taskID: action.taskID,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_API, updateComment);
}
