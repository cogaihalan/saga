import { GET_ALL_PROJECTS } from "../../types/JiraConstants";

const initialState = {
  listProjects: [],
};
const JiraManageAllProjects = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS:
      state.listProjects = action.data;
      return { ...state };
    
    default:
      return state;
  }
};

export default JiraManageAllProjects;
