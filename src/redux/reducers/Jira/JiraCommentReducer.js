import { GET_COMMENT } from "../../types/JiraConstants";

const initialState = {
  allComment: [],
};

const JiraCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT:
      return { ...state, allComment: action.data };

    default:
      return state;
  }
};
export default JiraCommentReducer;
