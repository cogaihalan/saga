import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import { JiraService } from "../../../services/JiraServices/JiraServices";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { CREATE_PROJECT_API } from "../../types/JiraConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConstants";

// Quản lý action saga
function* createProjectAPI(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { status } = yield call(
      JiraService.createProjectAuthorized,
      action.models
    );
    if (status === STATUS_CODE.SUCCESS) {
      let history = yield select(
        (stateList) => stateList.HistoryReducer.history
      );
      history.push("/jira/projects");
    }
  } catch (err) {
    throw new Error(err.message);
  }

  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiCreateProjectAPI() {
  yield takeLatest(CREATE_PROJECT_API, createProjectAPI);
}
