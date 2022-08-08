import { all } from "redux-saga/effects";
// import * as ToDoListSaga from "./ToDoListSaga";
import * as JiraLoginSaga from "./JiraSagas/JiraLoginSaga";
import * as JiraProjectCategorySaga from "./JiraSagas/JiraProjectCategorySaga";
import * as JiraCreateProjectSaga from "./JiraSagas/JiraCreateProjectSaga";
export function* rootSaga() {
  yield all([
    // ToDoListSaga.theoDoiActionGetTaskAPI(),
    // ToDoListSaga.theoDoiActionAddTaskAPI(),
    // ToDoListSaga.theoDoiActionDeleteTaskAPI(),
    // ToDoListSaga.theoDoiActionChangeStatus(),
    JiraLoginSaga.theoDoiSignIn(),
    JiraProjectCategorySaga.theoDoiGetAllProjectCategory(),
    JiraCreateProjectSaga.theoDoiCreateProjectAPI(),
  ]);
}
