import { call, takeLatest, put, delay } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { GET_COMMENT_API } from "../../types/JiraConstants";
function* getComment(action) {
  try {
    const { data, status } = yield call(JiraService.getComment, action.taskID);
  } catch (err) {
    throw new Error(err);
  }
}
export function* theoDoiGetComment() {
  yield takeLatest(GET_COMMENT_API, getComment);
}
