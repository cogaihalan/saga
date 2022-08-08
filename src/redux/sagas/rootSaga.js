import { all } from "redux-saga/effects";
// import * as ToDoListSaga from "./ToDoListSaga";
import * as JiraSaga from "./JiraSagas/JiraSaga";
export function* rootSaga() {
  yield all([
    // ToDoListSaga.theoDoiActionGetTaskAPI(),
    // ToDoListSaga.theoDoiActionAddTaskAPI(),
    // ToDoListSaga.theoDoiActionDeleteTaskAPI(),
    // ToDoListSaga.theoDoiActionChangeStatus(),
    JiraSaga.theoDoiSignIn(),
  ]);
}
