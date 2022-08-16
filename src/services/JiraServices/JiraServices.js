import Axios from "axios";
import { JIRA_DOMAIN, TOKEN } from "../../utils/constants/settingSystem";
class JiraServices {
  //USER
  signIn = (userLogin) => {
    return Axios.post(`${JIRA_DOMAIN}/Users/signin`, {
      email: userLogin.username,
      passWord: userLogin.password,
    });
  };
  getUser = (userKeyword) => {
    return Axios({
      method: "GET",
      url: `${JIRA_DOMAIN}/Users/getUser?keyword=${userKeyword}`,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getUsersByProjectId = (projectID) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Users/getUserByProjectId?idProject=${projectID}`,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  assignUserToProject = (userProject) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/assignUserProject`,
      method: "POST",
      data: userProject,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  removeUserFromProject = (userProject) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/removeUserFromProject`,
      method: "POST",
      data: userProject,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  //PROJECTS
  getAllProjectCategory = () => {
    return Axios.get(`${JIRA_DOMAIN}/ProjectCategory`);
  };
  createProjectAuthorized = (models) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/createProjectAuthorize`,
      method: "POST",
      data: models,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getAllProjects = () => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getProjectByID = (projectID) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/getProjectDetail?id=${projectID}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  deleteProject = (projectID) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/deleteProject?projectId=${projectID}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateProject = (projectUpdate) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  // TASK
  createTask = (task) => {
    return Axios({
      method: "POST",
      url: `${JIRA_DOMAIN}/Project/createTask`,
      data: task,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getTaskType = () => {
    return Axios.get(`${JIRA_DOMAIN}/TaskType/getAll`);
  };
  getTaskPriority = () => {
    return Axios.get(`${JIRA_DOMAIN}/Priority/getAll`);
  };
  getTaskStatus = () => {
    return Axios.get(`${JIRA_DOMAIN}/Status/getAll`);
  };
  updateTaskStatus = (taskStatus) => {
    return Axios({
      method: "PUT",
      data: taskStatus,
      url: `${JIRA_DOMAIN}/Project/updateStatus`,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getTaskDetail = (taskID) => {
    return Axios({
      method: "GET",
      url: `${JIRA_DOMAIN}/Project/getTaskDetail?taskId=${taskID}`,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateTaskDetail = (updateTask) => {
    return Axios({
      method: "POST",
      url: `${JIRA_DOMAIN}/Project/updateTask`,
      data: updateTask,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  //COMMENT
  getComment = (taskID) => {
    return Axios.get(`${JIRA_DOMAIN}/Comment/getAll?taskId=${taskID}`);
  };
  insertComment = (comment) => {
    // comment {
    //   "taskId": 0,
    //   "contentComment": "string"
    // }
    return Axios({
      method: "POST",
      url: `${JIRA_DOMAIN}/Comment/insertComment`,
      data: comment,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateComment = ({ id, contentComment }) => {
    return Axios({
      method: "PUT",
      url: `${JIRA_DOMAIN}/Comment/updateComment?id=${id}&contentComment=${contentComment}`,
    });
  };
  deleteComment = (idComment) => {
    return Axios({
      method: "DELETE",
      url: `${JIRA_DOMAIN}/Comment/deleteComment?idComment=${idComment}`,
    });
  };
}

export const JiraService = new JiraServices();
