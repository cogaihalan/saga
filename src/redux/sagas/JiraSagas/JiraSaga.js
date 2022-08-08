import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import {
  // STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../utils/constants/settingSystem";
import { USER_SIGN_IN_API } from "../../types/JiraConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConstants";
// Quản lý action saga
function* signIn(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);
  try {
    let { data } = yield call(JiraService.signIn(action.userLogin));
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    yield put({
      type: "CHANGE_USER",
      userLogin: data.content,
    });
    let history = yield select((stateList) => stateList.HistoryReducer.history);
    history.push("/home");
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
