import {
  GET_TASK_PRIORITY,
  GET_TASK_TYPE,
  GET_TASK_STATUS,
  GET_TASK_DETAIL,
} from "../../types/JiraConstants";

const initialState = {
  taskDetail: {
    listUserAsign: [],
    taskId: "1",
    taskName: "di choi ",
    description: "mo ta ve task",
    statusId: "1",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: 0,
    typeId: 0,
    priorityId: 0,
  },
  listTaskType: [],
  listTaskPriority: [],
  listTaskStatus: [],
};

const JiraTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL:
      return { ...state, taskDetail: action.data };
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
