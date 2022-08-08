import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import { BrowserRouter, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TodoListRedux from "./pages/TodoList/TodoListRedux";
import TodoListSaga from "./pages/TodoListSaga/TodoListSaga";
import LoadingComponent from "./components/Global/LoadingComponent/LoadingComponent";
import DemoModal from "./pages/HOC-Modal/DemoModal";
import Modal from "./HOC/Modal/Modal";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginJiraWithFormik from "./pages/JiraClone/LoginJira/LoginJira";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JiraTemplate } from "./templates/HomeTemplate/JiraTemplate";
import MainJira from "./components/Jira/Main";
import CreateProjectWithFormik from "./pages/JiraClone/CreateProject/CreateProject";
import ProjectManagement from "./pages/JiraClone/ProjectManagement/ProjectManagement";
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
      <LoadingComponent></LoadingComponent>
      <Switch>
        <HomeTemplate
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
        <HomeTemplate exact path="/about" Component={About}></HomeTemplate>
        <UserLoginTemplate
          exact
          path="/login"
          Component={LoginJiraWithFormik}
        ></UserLoginTemplate>
        <HomeTemplate
          exact
          path="/detail/:id"
          Component={Detail}
        ></HomeTemplate>
        <HomeTemplate exact path="/profile" Component={Profile}></HomeTemplate>
        {/* <HomeTemplate exact path="*" Component={PageNotFound}></HomeTemplate> */}
        <HomeTemplate exact path="/" Component={Home}></HomeTemplate>
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
      </Switch>
    </>
  );
}

export default App;
