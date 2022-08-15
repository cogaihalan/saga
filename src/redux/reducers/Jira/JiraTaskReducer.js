import {
  GET_TASK_PRIORITY,
  GET_TASK_TYPE,
  GET_TASK_STATUS,
  GET_TASK_DETAIL,
  UPDATE_TASK_DETAIL,
  CHANGE_ASSIGNESS,
  REMOVE_ASSIGNESS,
} from "../../types/JiraConstants";

const initialState = {
  taskDetail: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [],
    lstComment: [],
    taskId: 5277,
    taskName: "di choi",
    alias: "di-choi",
    description: "<p>nhanh</p>",
    statusId: "1",
    originalEstimate: 0,
    timeTrackingSpent: 9,
    timeTrackingRemaining: 6,
    typeId: 2,
    priorityId: 2,
    projectId: 6900,
  },
  listTaskType: [],
  listTaskPriority: [],
  listTaskStatus: [],
};

const JiraTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL:
      return { ...state, taskDetail: action.data };
    case UPDATE_TASK_DETAIL:
      return { ...state, taskDetail: action.updateTask };
    case CHANGE_ASSIGNESS:
      const updateTaskDetail = { ...state.taskDetail };
      updateTaskDetail.assigness = [
        ...updateTaskDetail.assigness,
        action.newAssignee,
      ];
      return { ...state, taskDetail: updateTaskDetail };
    case REMOVE_ASSIGNESS:
      state.taskDetail.assigness = [...state.taskDetail.assigness].filter(
        (assignee) => assignee.id !== action.userID
      );
      return { ...state };
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
