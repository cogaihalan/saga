import { Axios } from "axios";
import { JIRA_DOMAIN } from "../../utils/constants/settingSystem";

class JiraServices {
  signIn = (userLogin) => {
    return Axios({
      url: `${JIRA_DOMAIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  };
}

export const JiraService = new JiraServices();
