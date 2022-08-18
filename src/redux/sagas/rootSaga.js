import { all } from "redux-saga/effects";
// import * as ToDoListSaga from "./ToDoListSaga";
import * as JiraUserSaga from "./JiraSagas/JiraUserSaga";
import * as JiraProjectCategorySaga from "./JiraSagas/JiraProjectCategorySaga";
import * as JiraCreateProjectSaga from "./JiraSagas/JiraCreateProjectSaga";
import * as JiraManageAllProjects from "./JiraSagas/JiraMangeProjectsSaga";
import * as JiraMangeTaskSaga from "./JiraSagas/JiraManageTaskSaga";
import * as JiraManageCommentSaga from "./JiraSagas/JiraManageCommentSaga";
export function* rootSaga() {
  yield all([
    JiraUserSaga.theoDoiSignIn(),
    JiraUserSaga.theoDoiSignUp(),
    JiraUserSaga.theoDoiGetUsers(),
    JiraUserSaga.theoDoiGetUsersByProjectId(),
    JiraUserSaga.theoDoiEditUser(),
    JiraUserSaga.theoDoiDeleteUser(),
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
    JiraMangeTaskSaga.theoDoiUpdateTaskStatus(),
    JiraMangeTaskSaga.theoDoiCreateTask(),
    JiraMangeTaskSaga.theoDoiGetTaskDetail(),
    JiraMangeTaskSaga.theoDoiDeleteTask(),
    JiraMangeTaskSaga.theoDoiHandleChangeAndPostTaskDetail(),
    JiraManageCommentSaga.theoDoiGetComment(),
    JiraManageCommentSaga.theoDoiDeleteComment(),
    JiraManageCommentSaga.theoDoiUpdateComment(),
    JiraManageCommentSaga.theoDoiInsertComment(),
  ]);
}
