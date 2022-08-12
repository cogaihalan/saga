import {
  GET_TASK_PRIORITY,
  GET_TASK_TYPE,
  GET_TASK_STATUS,
} from "../../types/JiraConstants";

const initialState = {
  listTaskType: [],
  listTaskPriority: [],
  listTaskStatus: [],
};

const JiraTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_PRIORITY:
      return { ...state, listTaskPriority: action.data };
    case GET_TASK_TYPE:
      return { ...state, listTaskType: action.data };
    case GET_TASK_STATUS:
      return { ...state, listTaskStatus: action.data };
    default:
      return state;
  }
};
export default JiraTaskReducer;
