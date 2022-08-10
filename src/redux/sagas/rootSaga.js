import { all } from "redux-saga/effects";
// import * as ToDoListSaga from "./ToDoListSaga";
import * as JiraUserSaga from "./JiraSagas/JiraUserSaga";
import * as JiraProjectCategorySaga from "./JiraSagas/JiraProjectCategorySaga";
import * as JiraCreateProjectSaga from "./JiraSagas/JiraCreateProjectSaga";
import * as JiraManageAllProjects from "./JiraSagas/JiraMangeProjectsSaga";
export function* rootSaga() {
  yield all([
    JiraUserSaga.theoDoiSignIn(),
    JiraUserSaga.theoDoiGetUsers(),
    JiraUserSaga.theoDoiAssignUserToProject(),
    JiraProjectCategorySaga.theoDoiGetAllProjectCategory(),
    JiraCreateProjectSaga.theoDoiCreateProjectAPI(),
    JiraManageAllProjects.theoDoiGetAllProjects(),
    JiraManageAllProjects.theoDoiDeleteProject(),
    JiraManageAllProjects.theoDoiUpdateProject(),
  ]);
}
