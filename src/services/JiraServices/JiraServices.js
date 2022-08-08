import { Axios } from "axios";
import { JIRA_DOMAIN, TOKEN } from "../../utils/constants/settingSystem";

class JiraServices {
  signIn = (userLogin) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  };
  getAllProjectCategory = () => {
    return Axios({
      url: `${JIRA_DOMAIN}/ProjectCategory`,
      method: "GET",
    });
  };
  createProject = (models) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Project/createProject`,
      method: "POST",
      data: models,
    });
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
    });
  };
}

export const JiraService = new JiraServices();
