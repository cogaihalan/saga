import { GET_TASK_PRIORITY, GET_TASK_TYPE } from "../../types/JiraConstants";

const initialState = {
  listTaskType: [],
  listTaskPriority: [],
};

const JiraTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_PRIORITY:
      return { ...state, listTaskPriority: action.data };
    case GET_TASK_TYPE:
      return { ...state, listTaskType: action.data };

    default:
      return state;
  }
};
export default JiraTaskReducer;
