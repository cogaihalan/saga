import { GET_ALL_PROJECT_CATEGORY } from "../types/JiraConstants";

const initialState = {
  listCategoryProject: [
    {
      id: 1,
      projectCategoryName: "Dự án web",
    },
    {
      id: 2,
      projectCategoryName: "Dự án phần mềm",
    },
    {
      id: 3,
      projectCategoryName: "Dự án di động",
    },
  ],
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
