import { GET_COMMENT } from "../../types/JiraConstants";

const initialState = {};

const JiraCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT:
      return { ...state };

    default:
      return state;
  }
};
export default JiraCommentReducer;
