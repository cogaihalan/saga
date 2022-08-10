import { EDIT_PROJECT } from "../../types/JiraConstants";

const initialState = {
  projectUpdate: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "2",
  },
};
const JiraProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      return { ...state, projectUpdate: action.models };

    default:
      return state;
  }
};

export default JiraProjectReducer;
