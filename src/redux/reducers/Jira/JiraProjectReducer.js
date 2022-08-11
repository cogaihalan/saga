import { EDIT_PROJECT, GET_PROJECT_DETAIL } from "../../types/JiraConstants";

const initialState = {
  projectUpdate: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "2",
  },
  projectDetail: {},
};
const JiraProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      return { ...state, projectUpdate: action.models };
    case GET_PROJECT_DETAIL:
      return { ...state, projectDetail: action.projectDetail };
    default:
      return state;
  }
};

export default JiraProjectReducer;
