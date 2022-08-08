import { GET_TASK_LIST } from "../types/TodoListTypes";
const initialState = {
  taskList: [],
};

const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_LIST:
      return { ...state, taskList: action.data };
    default:
      return state;
  }
};

export default ToDoListReducer;
