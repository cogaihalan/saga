import { all } from "redux-saga/effects";
// import * as ToDoListSaga from "./ToDoListSaga";
import * as JiraUserSaga from "./JiraSagas/JiraUserSaga";
import * as JiraProjectCategorySaga from "./JiraSagas/JiraProjectCategorySaga";
import * as JiraCreateProjectSaga from "./JiraSagas/JiraCreateProjectSaga";
import * as JiraManageAllProjects from "./JiraSagas/JiraMangeProjectsSaga";
import * as JiraMangeTaskSaga from "./JiraSagas/JiraManageTaskSaga";
export function* rootSaga() {
  yield all([
    JiraUserSaga.theoDoiSignIn(),
    JiraUserSaga.theoDoiGetUsers(),
    JiraUserSaga.theoDoiAssignUserToProject(),
    JiraUserSaga.theoDoiRemoveUserFromProject(),
    JiraProjectCategorySaga.theoDoiGetAllProjectCategory(),
    JiraCreateProjectSaga.theoDoiCreateProjectAPI(),
    JiraManageAllProjects.theoDoiGetAllProjects(),
    JiraManageAllProjects.theoDoiDeleteProject(),
    JiraManageAllProjects.theoDoiUpdateProject(),
    JiraManageAllProjects.theoDoiGetProjectDetailByID(),
    JiraMangeTaskSaga.theoDoiGetTaskType(),
    JiraMangeTaskSaga.theoDoiGetTaskPriority(),
    JiraMangeTaskSaga.theoDoiGetTaskStatus(),
    JiraMangeTaskSaga.theoDoiCreateTask(),
  ]);
}
