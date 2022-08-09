import { GET_ALL_PROJECT_CATEGORY } from "../../types/JiraConstants";

const initialState = {
  listCategoryProject: [],
};

const JiraProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY:
      state.listCategoryProject = action.data;
      return { ...state };

    default:
      return { ...state };
  }
};

export default JiraProjectCategoryReducer;
