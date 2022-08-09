import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/TodoListReducer";
import reduxThunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas/rootSaga";
import LoadingReducer from "./reducers/LoadingReducer";
import ModalReducer from "./reducers/ModalReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import JiraUserLoginReducer from "./reducers/Jira/JiraUserLoginReducer";
import JiraProjectCategoryReducer from "./reducers/Jira/JiraProjectCategoryReducer";
import JiraManageAllProjects from "./reducers/Jira/JiraManageAllProjects";

const middlewareSaga = createSagaMiddleware();
const rootReducer = combineReducers({
  ToDoListReducer,
  LoadingReducer,
  ModalReducer,
  HistoryReducer,
  JiraUserLoginReducer,
  JiraProjectCategoryReducer,
  JiraManageAllProjects,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);
middlewareSaga.run(rootSaga);

export default store;
