import "./App.css";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/Global/LoadingComponent/LoadingComponent";
import Modal from "./HOC/Modal/Modal";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginJiraWithFormik from "./pages/JiraClone/LoginJira/LoginJira";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JiraTemplate } from "./templates/HomeTemplate/JiraTemplate";
import MainJira from "./components/Jira/Main";
import CreateProjectWithFormik from "./pages/JiraClone/CreateProject/CreateProject";
import ProjectManagement from "./pages/JiraClone/ProjectManagement/ProjectManagement";
import JiraModal from "./HOC/JIra/JiraModal";
import SignUpJiraWithFormik from "./pages/JiraClone/SignUpJira/SignUpJira";
import UserManagement from "./pages/JiraClone/UserManagement/UserManagement";
function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history,
    });
  }, []);
  return (
    <>
      <Modal></Modal>
      <JiraModal></JiraModal>
      <LoadingComponent></LoadingComponent>
      <Switch>
        {/* <HomeTemplate exact path="/DnD" Component={DnDLibrary}></HomeTemplate> */}
        {/* <HomeTemplate
          exact
          path="/todolist_thunk"
          Component={TodoListRedux}
        ></HomeTemplate>
        <HomeTemplate
          exact
          path="/todolist_saga"
          Component={TodoListSaga}
        ></HomeTemplate>
        <HomeTemplate
          exact
          path="/todolist"
          Component={TodoList}
        ></HomeTemplate>
        <HomeTemplate exact path="/hoc" Component={DemoModal}></HomeTemplate>
        <HomeTemplate exact path="/home" Component={Home}></HomeTemplate>
        <HomeTemplate exact path="/about" Component={About}></HomeTemplate> */}
        {/* <HomeTemplate
          exact
          path="/detail/:id"
          Component={Detail}
        ></HomeTemplate>
        <HomeTemplate exact path="/profile" Component={Profile}></HomeTemplate>
        <HomeTemplate exact path="*" Component={PageNotFound}></HomeTemplate> */}
        <UserLoginTemplate
          exact
          path="/login"
          Component={LoginJiraWithFormik}
        ></UserLoginTemplate>
        <UserLoginTemplate
          exact
          path="/signup"
          Component={SignUpJiraWithFormik}
        ></UserLoginTemplate>
        <JiraTemplate
          exact
          path="/"
          Component={ProjectManagement}
        ></JiraTemplate>
        <JiraTemplate exact path="/jira" Component={MainJira}></JiraTemplate>
        <JiraTemplate
          exact
          path="/jira/create"
          Component={CreateProjectWithFormik}
        ></JiraTemplate>
        <JiraTemplate
          exact
          path="/jira/projects"
          Component={ProjectManagement}
        ></JiraTemplate>
        <JiraTemplate
          exact
          path="/jira/projects/:id"
          Component={MainJira}
        ></JiraTemplate>
        <JiraTemplate
          exact
          path="/jira/users"
          Component={UserManagement}
        ></JiraTemplate>
      </Switch>
    </>
  );
}

export default App;
