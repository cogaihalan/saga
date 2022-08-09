import Axios from "axios";
import { JIRA_DOMAIN, TOKEN } from "../../utils/constants/settingSystem";
class JiraServices {
  signIn = (userLogin) => {
    return Axios.post(`${JIRA_DOMAIN}/Users/signin`, {
      email: userLogin.username,
      passWord: userLogin.password,
    });
  };
  getAllProjectCategory = () => {
    return Axios.get(`${JIRA_DOMAIN}/ProjectCategory`);
  };
  // createProject = (models) => {
  //   return Axios({
  //     url: `${JIRA_DOMAIN}/Project/createProject`,
  //     method: "POST",
  //     data: models,
  //   });
  // };
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
  deleteProject = (projectID) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/deleteProject?projectId=${projectID}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}

export const JiraService = new JiraServices();
